import { useState, useEffect, useRef, useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { useRefreshOnFocus } from '../hooks/useRefreshOnFocus'
import { useLibraryData } from '../context/LibraryDataContext'
import { useWishlist } from '../hooks/useWishlist'
import { Book as BookIcon, Clock, CheckCircle, ArrowRight, Heart } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import BookCard from '../components/BookCard'
import { cn } from '../lib/cn'

const MyLoans = () => {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab') === 'wishlist' ? 'wishlist' : 'loans'

  const { user, loading: authLoading } = useAuth()
  const { books, loadCatalog } = useLibraryData()
  const { ids: wishlistIds } = useWishlist()

  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const fetchInProgress = useRef(false)
  const lastFetchTime = useRef(0)

  const wishlistBooks = useMemo(
    () => books.filter((b) => wishlistIds.includes(String(b.id))),
    [books, wishlistIds]
  )

  useEffect(() => {
    if (tab === 'wishlist') loadCatalog({ background: true })
  }, [tab, loadCatalog])

  const fetchMyLoans = async (retryCount = 0) => {
    if (!user) return
    const now = Date.now()

    if (fetchInProgress.current && now - lastFetchTime.current > 15000) {
      fetchInProgress.current = false
    }

    if (authLoading || fetchInProgress.current || (retryCount === 0 && now - lastFetchTime.current < 2000)) {
      setLoading(false)
      return
    }

    fetchInProgress.current = true
    lastFetchTime.current = now
    if (loans.length === 0) setLoading(true)

    try {
      const { data, error } = await supabase
        .from('loans')
        .select('*, books!fk_loans_book(*)')
        .eq('user_id', user.id)
        .order('id', { ascending: false })

      if (error) throw error
      setLoans(data || [])
    } catch (err) {
      console.warn('[MyLoans] Fetch failed:', err.message || err)
      if (retryCount < 1) {
        fetchInProgress.current = false
        await new Promise((r) => setTimeout(r, 1500))
        return fetchMyLoans(retryCount + 1)
      }
    } finally {
      setLoading(false)
      fetchInProgress.current = false
    }
  }

  useRefreshOnFocus(() => {
    if (tab === 'loans') fetchMyLoans()
  })

  useEffect(() => {
    if (!authLoading && user && tab === 'loans') fetchMyLoans()
    else if (!authLoading && !user) setLoading(false)
  }, [authLoading, user, tab])

  const setTab = (next) => {
    if (next === 'loans') {
      searchParams.delete('tab')
      setSearchParams(searchParams, { replace: true })
    } else {
      setSearchParams({ tab: 'wishlist' }, { replace: true })
    }
  }

  return (
    <div className="max-w-4xl mx-auto w-full min-w-0 page-stack">
      <PageHeader title={t('myLoans.title')} subtitle={t('myLoans.subtitle')} />

      <div className="flex flex-wrap gap-2 p-1 bg-surface-container-low rounded-xl border border-outline-variant w-full sm:w-fit">
        <button
          type="button"
          onClick={() => setTab('loans')}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-bold transition-colors',
            tab === 'loans' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
          )}
        >
          {t('myLoans.tabs.loans')}
        </button>
        <button
          type="button"
          onClick={() => setTab('wishlist')}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-1.5',
            tab === 'wishlist' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
          )}
        >
          <Heart size={14} className={tab === 'wishlist' ? 'fill-current' : ''} />
          {t('myLoans.tabs.wishlist')}
        </button>
      </div>

      {tab === 'wishlist' ? (
        wishlistBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {wishlistBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={() => navigate(`/livro/${book.id}`, { state: { book } })}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center space-y-4 bg-surface-container-low rounded-lg border border-dashed border-outline-variant card-padding">
            <Heart size={48} className="mx-auto text-on-surface-variant/30" />
            <p className="text-on-surface-variant">{t('wishlist.empty')}</p>
            <Link to="/catalogo">
              <Button variant="primary">{t('myLoans.exploreCatalog')}</Button>
            </Link>
          </div>
        )
      ) : loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg flex gap-6 animate-pulse"
            >
              <div className="w-16 h-24 bg-bg-main rounded shrink-0" />
              <div className="flex-grow space-y-2">
                <div className="h-5 bg-bg-main rounded w-1/2" />
                <div className="h-4 bg-bg-main rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : loans.length > 0 ? (
        <div className="space-y-4">
          {loans.map((loan) => (
            <div
              key={loan.id}
              className="bg-surface-container-lowest border border-outline-variant p-4 sm:p-6 md:p-8 rounded-lg flex flex-col md:flex-row items-center gap-4 sm:gap-6 group hover:border-primary/30 transition-colors shadow-card-bottom w-full min-w-0"
            >
              <div className="w-16 aspect-[2/3] bg-surface-container rounded overflow-hidden flex-shrink-0 border border-outline-variant">
                {loan.books?.cover_image && (
                  <img
                    src={supabase.storage.from('capalivro').getPublicUrl(loan.books.cover_image).data.publicUrl}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                )}
              </div>

              <div className="flex-grow min-w-0 text-center md:text-left space-y-1 w-full">
                <Link
                  to={`/livro/${loan.books?.id}`}
                  className="text-lg font-bold hover:text-primary transition-colors flex items-center justify-center md:justify-start gap-2 break-words"
                >
                  {loan.books?.title}
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <p className="text-sm text-text-muted">{loan.books?.author}</p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest',
                    loan.status === 'active'
                      ? 'bg-orange-500/10 text-orange-500'
                      : loan.status === 'pending'
                        ? 'bg-blue-500/10 text-blue-500'
                        : loan.status === 'rejected'
                          ? 'bg-red-500/10 text-red-500'
                          : 'bg-green-500/10 text-green-500'
                  )}
                >
                  {loan.status === 'active' ? (
                    <Clock size={14} />
                  ) : loan.status === 'pending' ? (
                    <Clock size={14} className="opacity-50" />
                  ) : (
                    <CheckCircle size={14} />
                  )}
                  {loan.status === 'active'
                    ? t('myLoans.status.active')
                    : loan.status === 'pending'
                      ? t('myLoans.status.pending')
                      : loan.status === 'rejected'
                        ? t('myLoans.status.rejected')
                        : t('myLoans.status.returned')}
                </span>
                <p className="text-[10px] text-text-muted uppercase font-bold tracking-tighter">
                  {t('myLoans.requestLabel')} #{loan.id}
                </p>
                {loan.status === 'active' && (
                  <div className="flex flex-col items-center gap-1 mt-1">
                    {loan.due_date && (
                      <p
                        className={cn(
                          'text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase',
                          new Date() > new Date(loan.due_date)
                            ? 'text-red-500 bg-red-500/10 border-red-500/20'
                            : 'text-orange-500/60 border-transparent bg-transparent'
                        )}
                      >
                        {new Date() > new Date(loan.due_date)
                          ? 'Em Atraso - Sujeito a Multa'
                          : `Vence: ${new Date(loan.due_date).toLocaleDateString()}`}
                      </p>
                    )}
                    <p className="text-[10px] text-primary font-black bg-primary/10 px-2 py-1 rounded-md border border-primary/20 mt-1 uppercase tracking-widest shadow-sm">
                      PIN DEV: {new Date(loan.created_at).getTime().toString().slice(-4)}
                    </p>
                  </div>
                )}
                {loan.status === 'returned' && loan.fine_amount > 0 && (
                  <p className="text-[10px] text-red-500 font-black bg-red-500/10 px-3 py-1.5 rounded-md border border-red-500/20 uppercase tracking-widest">
                    Multa a pagar: {loan.fine_amount}€
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center space-y-6 bg-surface-container-low rounded-lg border border-dashed border-outline-variant card-padding">
          <BookIcon size={48} className="mx-auto text-on-surface-variant opacity-30" />
          <div className="space-y-3">
            <h3 className="text-headline-sm text-on-surface">{t('myLoans.emptyTitle')}</h3>
            <p className="text-body-md text-on-surface-variant">{t('myLoans.emptyDesc')}</p>
            <Link to="/catalogo">
              <Button variant="primary">{t('myLoans.exploreCatalog')}</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyLoans
