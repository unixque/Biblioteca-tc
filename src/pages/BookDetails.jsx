import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { useRefreshOnFocus } from '../hooks/useRefreshOnFocus'
import { Book, Heart } from 'lucide-react'
import { useWishlist } from '../hooks/useWishlist'
import { useLanguage } from '../context/LanguageContext'
import { useNotification } from '../context/NotificationContext'
import { useLibraryData } from '../context/LibraryDataContext'
import { setBook as cacheSetBook } from '../lib/libraryCache'
import { notifyUser } from '../lib/sendEmail'
import StarRating from '../components/StarRating'
import Button from '../components/ui/Button'
import MaterialIcon from '../components/ui/MaterialIcon'
import { cn } from '../lib/cn'

const BookDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAdmin, loading: authLoading } = useAuth()
  const { getBookById, fetchBookById, invalidateCatalog, invalidateBook } = useLibraryData()
  const { t, translateCategory, language } = useLanguage()
  const { showToast, confirm } = useNotification()
  const { isWishlisted, toggle: toggleWishlist } = useWishlist()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false)
  const [summaryError, setSummaryError] = useState(null)
  const [isRequesting, setIsRequesting] = useState(false)
  const [requestStatus, setRequestStatus] = useState(null)
  const [userHasLoan, setUserHasLoan] = useState(false)
  const [reviews, setReviews] = useState([])
  const [userReview, setUserReview] = useState(null)
  const [reviewForm, setReviewForm] = useState({ rating: 0, comment: '' })
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [translatedSummary, setTranslatedSummary] = useState('')
  const [isTranslatingSummary, setIsTranslatingSummary] = useState(false)
  const fetchInProgress = useRef(false)
  const lastFetchTime = useRef(0)
  const hasAiSummary = Boolean(book?.ai_summary?.trim())

  useEffect(() => {
    const translateSummary = async () => {
      if (!book?.ai_summary) {
        setTranslatedSummary('')
        return
      }

      if (language === 'pt') {
        setTranslatedSummary(book.ai_summary)
        return
      }

      setIsTranslatingSummary(true)
      try {
        const { translate } = await import('../lib/googleTranslate')
        const result = await translate(book.ai_summary, { to: language, from: 'pt' })
        setTranslatedSummary(result.text)
      } catch (err) {
        console.error('Failed to translate summary:', err)
        setTranslatedSummary(book.ai_summary)
      } finally {
        setIsTranslatingSummary(false)
      }
    }

    translateSummary()
  }, [book?.ai_summary, language])

  useEffect(() => {
    const fromState = location.state?.book
    const cached = fromState || getBookById(id)
    if (cached && String(cached.id) === String(id)) {
      setBook(cached)
      setLoading(false)
    }
    fetchBook(Boolean(cached))
  }, [id])

  useEffect(() => {
    const checkUserLoan = async () => {
      if (!user || authLoading) return
      const { data } = await supabase
        .from('loans')
        .select('id')
        .eq('book_id', id)
        .eq('user_id', user.id)
        .in('status', ['pending', 'active'])
        .limit(1)

      setUserHasLoan(data && data.length > 0)
    }
    checkUserLoan()
  }, [user, id, authLoading])

  useEffect(() => {
    if (user && reviews.length > 0) {
      const myReview = reviews.find(r => r.user_id === user.id)
      if (myReview) {
        setUserReview(myReview)
        setReviewForm({ rating: myReview.rating, comment: myReview.comment || '' })
      }
    }
  }, [user, reviews])

  useRefreshOnFocus(() => fetchBook(true))

  const fetchReviews = async () => {
    const { data: reviewsData } = await supabase
      .from('reviews')
      .select('*, profiles(name)')
      .eq('book_id', id)
      .order('created_at', { ascending: false })
    setReviews(reviewsData || [])
  }

  const fetchBook = async (hasCachedBook = false, retryCount = 0) => {
    const now = Date.now()

    if (fetchInProgress.current && now - lastFetchTime.current > 15000) {
      fetchInProgress.current = false
    }

    if (
      fetchInProgress.current ||
      (retryCount === 0 && now - lastFetchTime.current < 2000 && !hasCachedBook)
    ) {
      if (hasCachedBook) await fetchReviews()
      return
    }

    if (!hasCachedBook) setLoading(true)

    fetchInProgress.current = true
    lastFetchTime.current = now

    try {
      const [data] = await Promise.all([
        fetchBookById(id, { force: !hasCachedBook }),
        fetchReviews(),
      ])
      if (data) {
        setBook(data)
        cacheSetBook(id, data)
      }
    } catch (error) {
      console.warn('[BookDetails] Fetch failed:', error.message || error)
      if (retryCount < 1) {
        fetchInProgress.current = false
        await new Promise((r) => setTimeout(r, 1500))
        return fetchBook(hasCachedBook, retryCount + 1)
      }
    } finally {
      setLoading(false)
      fetchInProgress.current = false
    }
  }

  const handleLoan = async () => {
    if (!user) { navigate('/entrar'); return }
    if (book.available_qty <= 0 || userHasLoan) return
    setIsRequesting(true)
    setRequestStatus(null)

    try {
      const { data, error: rpcError } = await supabase.rpc('request_book', {
        p_book_id: id,
        p_user_id: user.id
      })

      if (rpcError) throw rpcError

      if (!data.success) {
        showToast(data.message || t('bookDetails.requestError'), 'error')
        setRequestStatus('error')
        return
      }

      // Update local state smoothly
      setUserHasLoan(true)
      setBook(prev => ({ ...prev, available_qty: prev.available_qty - 1 }))

      // Notify the user about their reservation (email + in-app notification)
      await notifyUser({
        userId: user.id,
        userEmail: user.email,
        type: 'info',
        subject: t('bookDetails.emailSubject'),
        message: t('bookDetails.emailMessage').replace('{title}', book.title),
        template: 'book_request_pending',
        templateData: {
          bookTitle: book.title,
        }
      })

      setRequestStatus('success')
    } catch (error) {
      console.error('Error requesting loan:', error)
      showToast(t('bookDetails.processError'), 'danger')
      setRequestStatus('error')
    } finally {
      setIsRequesting(false)
    }
  }

  const handleToggleFeatured = async () => {
    const newVal = !book.is_featured
    const { error } = await supabase.from('books').update({ is_featured: newVal }).eq('id', id)
    if (error) {
      showToast(t('bookDetails.featuredError'), 'danger')
    } else {
      const updated = { ...book, is_featured: newVal }
      setBook(updated)
      cacheSetBook(id, updated)
      cacheSetBook(id, updated)
      invalidateBook(id)
      invalidateCatalog()
      showToast(newVal ? t('bookDetails.featuredAdded') : t('bookDetails.featuredRemoved'), 'success')
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    if (!user || reviewForm.rating === 0) return
    setIsSubmittingReview(true)

    try {
      if (userReview) {
        // Update existing review
        const { error } = await supabase
          .from('reviews')
          .update({ rating: reviewForm.rating, comment: reviewForm.comment })
          .eq('id', userReview.id)
        if (error) throw error
      } else {
        // Insert new review
        const { error } = await supabase
          .from('reviews')
          .insert([{
            book_id: id,
            user_id: user.id,
            rating: reviewForm.rating,
            comment: reviewForm.comment
          }])
        if (error) throw error
      }

      // Refresh the page data
      await fetchBook(true)
      setShowReviewForm(false)
      showToast(t('bookDetails.reviewSuccess'), 'success')
    } catch (err) {
      console.error(err)
      showToast(t('bookDetails.reviewError'), 'danger')
    } finally {
      setIsSubmittingReview(false)
    }
  }

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true)
    setSummaryError(null)

    if (!user) {
      setSummaryError(t('bookDetails.generateSummaryLogin'))
      setIsGeneratingSummary(false)
      return
    }

    try {
      const { data, error } = await supabase.functions.invoke('book-summary', {
        body: {
          bookId: id,
          title: book.title,
          author: book.author,
        },
      })

      if (error) throw error
      if (data?.error) throw new Error(data.error)

      const summary = data?.summary?.trim()
      if (summary) {
        setBook((prev) => ({ ...prev, ai_summary: summary }))
        invalidateBook(id)
      }
    } catch (error) {
      console.error('OpenAI error:', error)
      setSummaryError(error.message || 'Erro ao gerar resumo. Verifique a sua chave de API.')
    } finally {
      setIsGeneratingSummary(false)
    }
  }

  if (loading && !book) return (
    <div className="animate-pulse page-stack w-full min-w-0">
      <div className="h-4 w-48 bg-surface-container rounded-none mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="md:col-span-4 aspect-[3/4] bg-surface-container rounded-lg" />
        <div className="md:col-span-8 space-y-4">
          <div className="h-10 w-3/4 bg-surface-container rounded-none" />
          <div className="h-24 bg-surface-container rounded-lg" />
        </div>
      </div>
    </div>
  )

  if (!book) return (
    <div className="py-12 text-center space-y-5 card-padding">
      <div className="w-16 h-16 bg-secondary-container flex items-center justify-center mx-auto text-primary opacity-30">
        <Book size={32} />
      </div>
      <h2 className="text-headline-sm text-on-surface">{t('bookDetails.bookNotFound')}</h2>
      <Link to="/catalogo" className="text-primary hover:underline inline-flex items-center gap-1.5 text-label-sm">
        <MaterialIcon name="chevron_left" size={16} /> {t('bookDetails.backToStart')}
      </Link>
    </div>
  )

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0

  const isAvailable = book.available_qty > 0
  const initials = (name) => {
    const parts = (name || 'U').trim().split(/\s+/)
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return (name || 'U').substring(0, 2).toUpperCase()
  }

  return (
    <div className="w-full min-w-0 page-stack">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-secondary flex-wrap mb-8">
        <Link to="/landing" className="text-label-sm hover:text-primary transition-colors">
          {t('navbar.home').toUpperCase()}
        </Link>
        <MaterialIcon name="chevron_right" size={14} />
        <Link to="/catalogo" className="text-label-sm hover:text-primary transition-colors">
          {t('bookDetails.catalog').toUpperCase()}
        </Link>
        <MaterialIcon name="chevron_right" size={14} />
        <span className="text-label-sm text-on-surface truncate max-w-[200px] sm:max-w-none">
          {book.title.toUpperCase()}
        </span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-section-gap">
        {/* Cover column */}
        <div className="md:col-span-4 self-start min-w-0">
          <div className="relative w-full max-w-sm mx-auto md:max-w-none md:mx-0 group overflow-hidden md:overflow-visible">
            <div className="aspect-[3/4] rounded-lg overflow-hidden book-shadow border border-outline-variant bg-surface-container relative z-10">
              <img
                src={book.cover_url}
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary opacity-[0.02] mix-blend-multiply pointer-events-none" />
            </div>
            <div className="hidden md:block absolute -bottom-4 -left-4 right-4 top-4 bg-surface-container-high rounded-lg z-0 border border-outline-variant" />
            {isAdmin && (
            <div className="absolute top-4 right-4 flex gap-2 z-20">
              <Link
                to={`/console/livros?q=${encodeURIComponent(book.title)}`}
                className="bg-surface/90 backdrop-blur p-2 rounded-full shadow-md text-on-surface-variant hover:text-primary transition-colors border border-outline-variant"
                title="Editar"
              >
                <MaterialIcon name="edit" size={20} />
              </Link>
              <button
                type="button"
                onClick={handleToggleFeatured}
                className={cn(
                  'bg-surface/90 backdrop-blur p-2 rounded-full shadow-md border border-outline-variant transition-colors',
                  book.is_featured ? 'text-secondary' : 'text-on-surface-variant hover:text-secondary'
                )}
                title={book.is_featured ? 'Remover destaque' : 'Destacar'}
              >
                <MaterialIcon name="star" size={20} filled={book.is_featured} />
              </button>
            </div>
            )}
          </div>
        </div>

        {/* Content column */}
        <div className="md:col-span-8 flex flex-col justify-center md:pl-8 mt-8 md:mt-0 min-w-0">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {book.category_name && (
              <span className="inline-flex items-center px-3 py-1 rounded-none bg-secondary-container text-on-secondary-container text-label-sm border border-secondary">
                {translateCategory(book.category_name).toUpperCase()}
              </span>
            )}
            <div className="flex items-center gap-1 text-secondary ml-auto">
              <MaterialIcon name="star" size={18} filled />
              <span className="text-label-sm">
                {averageRating > 0 ? averageRating.toFixed(1) : '—'} ({reviews.length} {reviews.length === 1 ? t('bookDetails.review') : t('bookDetails.reviews')})
              </span>
            </div>
          </div>

          <h1 className="text-display-lg-mobile md:text-display-lg text-on-surface mb-2">{book.title}</h1>
          <p className="text-headline-sm text-on-surface-variant italic mb-6">{book.author}</p>

          {/* Glass availability panel */}
          <div className="glass-panel p-4 sm:p-6 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 w-full min-w-0">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  'w-3 h-3 rounded-full shrink-0',
                  isAvailable ? 'bg-tertiary animate-pulse' : 'bg-error'
                )}
              />
              <div>
                <p className="text-label-sm text-secondary tracking-widest mb-1">{t('bookDetails.availability').toUpperCase()}</p>
                <p className="text-body-lg text-on-surface font-medium">
                  {isAvailable
                    ? t('bookDetails.availableForRequest')
                    : t('bookDetails.outOfStock')}
                </p>
                <p className="text-[12px] text-on-surface-variant">
                  {t('bookDetails.availableOf')
                    .replace('{available}', book.available_qty)
                    .replace('{total}', book.quantity)}
                </p>
              </div>
            </div>
            {requestStatus === 'success' || userHasLoan ? (
              <div className="flex flex-col items-center gap-1 text-center sm:text-left">
                <div className="flex items-center gap-2 text-primary font-semibold text-label-sm">
                  <MaterialIcon name="check_circle" size={18} filled />
                  {userHasLoan && requestStatus !== 'success' ? t('bookDetails.alreadyRequested') : t('bookDetails.requestedSuccess')}
                </div>
                <span className="text-[10px] text-on-surface-variant">{t('bookDetails.waitingApproval')}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {user && (
                  <button
                    type="button"
                    onClick={async () => {
                      const r = await toggleWishlist(id)
                      if (r.needsLogin) navigate('/entrar')
                      else showToast(r.ok ? (r.added ? t('wishlist.added') : t('wishlist.removed')) : t('wishlist.error'), r.ok ? 'success' : 'danger')
                    }}
                    className={cn(
                      'p-3 rounded-xl border border-outline-variant transition-colors',
                      isWishlisted(id) ? 'text-primary bg-primary/10' : 'text-on-surface-variant hover:bg-surface-container'
                    )}
                    aria-label={t('wishlist.toggle')}
                  >
                    <Heart size={22} fill={isWishlisted(id) ? 'currentColor' : 'none'} />
                  </button>
                )}
                <Button
                  variant="primary"
                  size="lg"
                  uppercase
                  icon="book"
                  onClick={handleLoan}
                  disabled={isRequesting || !isAvailable}
                  className="flex-1 sm:flex-none shrink-0 !text-white [&_.material-symbols-outlined]:!text-white"
                >
                  {isRequesting ? '...' : t('bookDetails.requestBook')}
                </Button>
              </div>
            )}
          </div>

          {/* Metadata row — year + publisher side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/50 shadow-sm flex justify-between items-center">
              <div>
                <p className="text-label-sm text-secondary tracking-widest mb-1">{t('bookDetails.yearEdition').toUpperCase()}</p>
                <p className="text-headline-sm text-on-surface">{book.year_edition || '—'}</p>
              </div>
              <MaterialIcon name="calendar_today" size={32} className="text-secondary" />
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/50 shadow-sm flex justify-between items-center">
              <div>
                <p className="text-label-sm text-secondary tracking-widest mb-1">{t('bookDetails.publisher').toUpperCase()}</p>
                <p className="text-headline-sm text-on-surface line-clamp-2">{book.publisher || '—'}</p>
              </div>
              <MaterialIcon name="menu_book" size={32} className="text-secondary" />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/50 space-y-3 mb-12">
            <h3 className="text-headline-sm text-primary flex items-center gap-2">
              <MaterialIcon name="auto_awesome" size={22} />
              {book.ai_summary ? t('bookDetails.aiSummary') : t('bookDetails.aboutBook')}
            </h3>
            <p className="text-on-surface-variant leading-relaxed transition-opacity duration-300">
              {book.ai_summary ? (
                <>
                  {translatedSummary || book.ai_summary}
                  {isTranslatingSummary && (
                    <span className="block text-[12px] text-primary/70 mt-1.5 animate-pulse flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin inline-block" />
                      {language === 'pt' ? 'A traduzir...' : 'Translating...'}
                    </span>
                  )}
                </>
              ) : (
                book.description ||
                (user ? t('bookDetails.noDescription') : t('bookDetails.noDescriptionGuest'))
              )}
            </p>
            {summaryError && (
              <p className="text-error text-body-sm bg-error-container border border-error/20 px-4 py-3 rounded-none">
                {summaryError}
              </p>
            )}
            {!hasAiSummary && !authLoading && (
              user ? (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  icon="auto_awesome"
                  onClick={handleGenerateSummary}
                  disabled={isGeneratingSummary}
                  className="w-full sm:w-auto"
                >
                  {isGeneratingSummary ? t('bookDetails.generatingAiSummary') : t('bookDetails.generateAiSummary')}
                </Button>
              ) : (
                <Link to="/entrar">
                  <Button type="button" variant="secondary" size="sm" icon="login">
                    {t('bookDetails.generateSummaryLogin')}
                  </Button>
                </Link>
              )
            )}
          </div>

          {/* Metadata row */}
          {(book.isbn || book.publisher) && (
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/50 mb-12 space-y-2">
              <p className="text-label-sm text-secondary tracking-widest">{t('bookDetails.bookMetadata').toUpperCase()}</p>
              {book.isbn && (
                <div className="flex justify-between text-body-md">
                  <span className="text-on-surface-variant">{t('bookDetails.isbn')}</span>
                  <span className="text-on-surface font-medium">{book.isbn}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      <section className="border-t border-outline-variant pt-12">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 className="text-headline-md text-primary">{t('bookDetails.reviewsTitle')}</h2>
          {user && !showReviewForm && (
            <button
              type="button"
              onClick={() => setShowReviewForm(true)}
              className="text-primary text-label-sm flex items-center gap-2 hover:underline tracking-widest"
            >
              {userReview ? t('bookDetails.editReview') : t('bookDetails.writeReview').toUpperCase()}
              <MaterialIcon name="edit_note" size={18} />
            </button>
          )}
        </div>

        {showReviewForm && (
          <form onSubmit={handleSubmitReview} className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/50 space-y-5 mb-8">
            <div className="space-y-1">
              <label className="text-label-sm text-on-surface block">
                {t('bookDetails.ratingLabel')} <span className="text-error">*</span>
              </label>
              <StarRating
                rating={reviewForm.rating}
                interactive
                onChange={(rating) => setReviewForm((prev) => ({ ...prev, rating }))}
                size={24}
              />
            </div>
            <div className="space-y-1">
              <label className="text-label-sm text-on-surface block">{t('bookDetails.commentLabel')}</label>
              <textarea
                value={reviewForm.comment}
                onChange={(e) => setReviewForm((prev) => ({ ...prev, comment: e.target.value }))}
                placeholder="..."
                className="w-full bg-surface border border-outline-variant rounded-none p-4 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary min-h-[100px] resize-y input-inset"
              />
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit" variant="primary" disabled={isSubmittingReview || reviewForm.rating === 0}>
                {isSubmittingReview ? '...' : t('bookDetails.submitReview')}
              </Button>
              <Button type="button" variant="ghost" onClick={() => setShowReviewForm(false)}>
                {t('bookDetails.cancelReview')}
              </Button>
            </div>
          </form>
        )}

        <div className="space-y-6">
          {reviews.length === 0 ? (
            <p className="text-body-md text-on-surface-variant italic">{t('bookDetails.noReviews')}</p>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/30"
              >
                <div className="flex items-center gap-4 mb-4 flex-wrap">
                  <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-label-sm shrink-0">
                    {initials(review.profiles?.name)}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-body-md font-semibold text-on-surface">
                      {review.profiles?.name || t('bookDetails.anonymousUser')}
                      {user?.id === review.user_id && (
                        <span className="ml-2 text-[10px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-none uppercase tracking-wider">
                          {t('bookDetails.youReviewed')}
                        </span>
                      )}
                    </p>
                    <p className="text-[12px] text-on-surface-variant">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-auto">
                    <StarRating rating={review.rating} size={14} />
                    {(isAdmin || user?.id === review.user_id) && (
                      <button
                        type="button"
                        onClick={async () => {
                          const confirmed = await confirm({
                            title: t('bookDetails.deleteReviewTitle'),
                            message: t('bookDetails.deleteReviewConfirm'),
                            type: 'danger',
                          })
                          if (confirmed) {
                            const { error } = await supabase.from('reviews').delete().eq('id', review.id)
                            if (!error) {
                              showToast(t('bookDetails.deleteReviewSuccess'), 'success')
                              if (user?.id === review.user_id) {
                                setUserReview(null)
                                setShowReviewForm(false)
                                setReviewForm({ rating: 0, comment: '' })
                              }
                              setReviews((prev) => prev.filter((r) => r.id !== review.id))
                            } else {
                              showToast(t('bookDetails.deleteReviewError'), 'danger')
                            }
                          }
                        }}
                        className="text-error hover:bg-error-container p-2 rounded-none transition-colors"
                        title="Apagar avaliação"
                      >
                        <MaterialIcon name="delete" size={18} />
                      </button>
                    )}
                  </div>
                </div>
                {review.comment && (
                  <p className="text-body-md text-on-surface-variant leading-relaxed">{review.comment}</p>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default BookDetails
