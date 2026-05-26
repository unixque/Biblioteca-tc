import { useState, useEffect, useRef, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useRefreshOnFocus } from '../hooks/useRefreshOnFocus'
import { useLibraryData } from '../context/LibraryDataContext'
import { useLanguage } from '../context/LanguageContext'
import BookCard from '../components/BookCard'
import Chip from '../components/ui/Chip'
import SectionHeader from '../components/ui/SectionHeader'
import SectionDivider from '../components/ui/SectionDivider'
import MaterialIcon from '../components/ui/MaterialIcon'
import Button from '../components/ui/Button'
import CatalogPagination from '../components/ui/CatalogPagination'

const CATALOG_PAGE_SIZE = 20

const Home = () => {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const { t, translateCategory } = useLanguage()
  const { books, categories, loading, hydrated, loadCatalog } = useLibraryData()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const cat = searchParams.get('c') || '0'

  const [categoryFilter, setCategoryFilter] = useState(cat)
  const [catalogPage, setCatalogPage] = useState(1)
  const catalogRef = useRef(null)
  const recommendedRef = useRef(null)
  const prevQueryLength = useRef(query.length)

  const featuredBooks = useMemo(
    () => books.filter((b) => b.is_featured).slice(0, 6),
    [books]
  )

  const showSkeleton = loading && books.length === 0

  useEffect(() => {
    if (query.length > 0 && prevQueryLength.current === 0 && catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    prevQueryLength.current = query.length
  }, [query])

  useEffect(() => {
    setCategoryFilter(cat)
  }, [cat])

  useEffect(() => {
    if (!authLoading) {
      loadCatalog({ background: hydrated })
    }
  }, [authLoading, user])

  useRefreshOnFocus(() => loadCatalog({ background: true }))

  const openBook = (bookId) => {
    const book = books.find((b) => String(b.id) === String(bookId))
    navigate(`/livro/${bookId}`, book ? { state: { book } } : undefined)
  }

  const scrollRecommended = (dir) => {
    if (!recommendedRef.current) return
    recommendedRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' })
  }

  const filteredBooks = useMemo(
    () =>
      books.filter((b) => {
        const q = query.toLowerCase()
        const matchesSearch =
          !query ||
          b.title.toLowerCase().includes(q) ||
          b.author?.toLowerCase().includes(q) ||
          b.isbn?.toLowerCase().includes(q) ||
          b.publisher?.toLowerCase().includes(q) ||
          b.description?.toLowerCase().includes(q) ||
          translateCategory(b.categories?.name || '').toLowerCase().includes(q)
        const matchesCategory =
          categoryFilter === '0' || b.category_id.toString() === categoryFilter
        return matchesSearch && matchesCategory
      }),
    [books, query, categoryFilter]
  )

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredBooks.length / CATALOG_PAGE_SIZE)),
    [filteredBooks.length]
  )

  // Clamp synchronously so a stale page (e.g. 2) never slices past the new filter
  const effectivePage = Math.min(catalogPage, totalPages)

  const paginatedBooks = useMemo(() => {
    const start = (effectivePage - 1) * CATALOG_PAGE_SIZE
    return filteredBooks.slice(start, start + CATALOG_PAGE_SIZE)
  }, [filteredBooks, effectivePage])

  useEffect(() => {
    setCatalogPage(1)
  }, [query, categoryFilter])

  useEffect(() => {
    if (catalogPage > totalPages) {
      setCatalogPage(totalPages)
    }
  }, [catalogPage, totalPages])

  const handleCatalogPageChange = (page) => {
    setCatalogPage(page)
    catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="page-stack">
      {query.length === 0 && (
        <section className="section-inner">
          <SectionHeader
            title={t('home.recommended')}
            subtitle={t('home.catalogSub')}
            action={
              <div className="hidden md:flex gap-2">
                <button
                  type="button"
                  onClick={() => scrollRecommended(-1)}
                  className="w-8 h-8 rounded-full border border-outline flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
                  aria-label="Anterior"
                >
                  <MaterialIcon name="chevron_left" size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollRecommended(1)}
                  className="w-8 h-8 rounded-full border border-outline flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
                  aria-label="Seguinte"
                >
                  <MaterialIcon name="chevron_right" size={18} />
                </button>
              </div>
            }
          />
          <div
            ref={recommendedRef}
            className="flex gap-gutter overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0"
          >
            {showSkeleton
              ? [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="snap-start shrink-0 w-[160px] md:w-[180px] aspect-[2/3] bg-surface-container rounded-lg animate-pulse"
                  />
                ))
              : featuredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    variant="recommended"
                    onClick={openBook}
                  />
                ))}
          </div>
        </section>
      )}

      <SectionDivider />

      <section ref={catalogRef} className="section-inner scroll-mt-28">
        <SectionHeader title={t('home.catalog')} subtitle={t('home.catalogSub')} />

        <div className="flex flex-wrap gap-2">
          <Chip active={categoryFilter === '0'} onClick={() => setCategoryFilter('0')}>
            {t('navbar.all')}
          </Chip>
          {categories.map((c) => (
            <Chip
              key={c.id}
              active={categoryFilter === c.id.toString()}
              onClick={() => setCategoryFilter(c.id.toString())}
            >
              {translateCategory(c.name)}
            </Chip>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
          {showSkeleton
            ? [...Array(CATALOG_PAGE_SIZE)].map((_, i) => (
                <div key={i} className="aspect-[2/3] bg-surface-container rounded-lg animate-pulse" />
              ))
            : filteredBooks.length > 0
              ? paginatedBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    variant="catalog"
                    onClick={openBook}
                  />
                ))
              : books.length > 0
                ? (
                    <div className="col-span-full py-12 text-center space-y-3 bg-surface-container-low rounded-lg border border-dashed border-outline-variant card-padding">
                      <p className="text-body-md text-on-surface-variant">{t('home.noBooksFound')}</p>
                      <p className="text-body-md text-on-surface-variant/70 text-sm">{t('home.searchNoResults')}</p>
                    </div>
                  )
                : (
                    <div className="col-span-full py-12 text-center space-y-4 bg-surface-container-low rounded-lg border border-dashed border-outline-variant card-padding">
                      <p className="text-body-md text-on-surface-variant">{t('home.errorLoad')}</p>
                      <p className="text-body-md text-on-surface-variant/70 text-sm">{t('home.errorCheckNet')}</p>
                      <Button variant="secondary" size="sm" onClick={() => loadCatalog({ force: true })}>
                        {t('home.retryBtn')}
                      </Button>
                    </div>
                  )}
        </div>

        {!showSkeleton && filteredBooks.length > 0 && (
          <CatalogPagination
            page={effectivePage}
            totalPages={totalPages}
            onPageChange={handleCatalogPageChange}
          />
        )}
      </section>
    </div>
  )
}

export default Home
