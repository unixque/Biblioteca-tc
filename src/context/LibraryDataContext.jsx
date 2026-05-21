import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'
import {
  getCatalog,
  setCatalog,
  invalidateCatalog as clearCatalogCache,
  getBook,
  setBook,
  invalidateBook as clearBookCache,
  isCatalogFresh,
} from '../lib/libraryCache'
import { prefetchBooksCovers } from '../lib/prefetchCovers'

const LibraryDataContext = createContext(null)

const getCoverUrl = (filename) => {
  if (!filename) return null
  return supabase.storage.from('capalivro').getPublicUrl(filename).data.publicUrl
}

const processBook = (b) => ({
  ...b,
  category_name: b.categories?.name,
  cover_url: getCoverUrl(b.cover_image),
})

export const LibraryDataProvider = ({ children }) => {
  const [books, setBooks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [hydrated, setHydrated] = useState(false)
  const fetchInProgress = useRef(false)
  const lastFetchTime = useRef(0)

  const applyCatalog = useCallback((catalogBooks, catalogCategories) => {
    setBooks(catalogBooks)
    setCategories(catalogCategories)
    setHydrated(true)
    prefetchBooksCovers(catalogBooks)
  }, [])

  useEffect(() => {
    const cached = getCatalog()
    if (cached?.books?.length) {
      applyCatalog(cached.books, cached.categories)
      setLoading(false)
    }
  }, [applyCatalog])

  const loadCatalog = useCallback(async ({ force = false, background = false } = {}) => {
    const now = Date.now()
    const cached = getCatalog()

    if (cached && !force) {
      applyCatalog(cached.books, cached.categories)
      if (!background) setLoading(false)
    } else if (!background && books.length === 0) {
      setLoading(true)
    }

    if (
      fetchInProgress.current ||
      (!force && cached && !background && now - lastFetchTime.current < 2000)
    ) {
      if (cached) setLoading(false)
      return cached
    }

    if (!force && background && isCatalogFresh()) {
      return cached
    }

    fetchInProgress.current = true
    lastFetchTime.current = now

    try {
      const [catRes, bookRes] = await Promise.all([
        supabase.from('categories').select('*').order('display_order', { ascending: true }),
        supabase.from('books').select('*, categories(name)').order('created_at', { ascending: false }),
      ])
      if (catRes.error) throw catRes.error
      if (bookRes.error) throw bookRes.error

      const processedBooks = (bookRes.data || []).map(processBook)
      const cats = catRes.data || []
      setCatalog({ books: processedBooks, categories: cats })
      applyCatalog(processedBooks, cats)
      return { books: processedBooks, categories: cats }
    } catch (err) {
      console.warn('[LibraryData] loadCatalog failed:', err)
      if (!cached && books.length === 0) {
        setBooks([])
        setCategories([])
      }
      return cached
    } finally {
      setLoading(false)
      fetchInProgress.current = false
    }
  }, [applyCatalog, books.length])

  const getBookById = useCallback((id) => {
    if (!id) return null
    const fromList = books.find((b) => String(b.id) === String(id))
    if (fromList) return fromList
    return getBook(id)
  }, [books])

  const fetchBookById = useCallback(async (id, { force = false } = {}) => {
    const cached = getBook(id)
    const fromList = books.find((b) => String(b.id) === String(id))
    const initial = fromList || cached

    if (initial && !force) {
      setBook(id, initial)
      return initial
    }

    const { data, error } = await supabase
      .from('books')
      .select('*, categories(name)')
      .eq('id', id)
      .single()

    if (error) throw error
    const processed = processBook(data)
    setBook(id, processed)
    return processed
  }, [books])

  const prefetchBook = useCallback(
    (id) => {
      if (!id || getBook(id)) return
      fetchBookById(id).catch(() => {})
    },
    [fetchBookById]
  )

  const invalidateCatalog = useCallback(() => {
    clearCatalogCache()
    lastFetchTime.current = 0
  }, [])

  const invalidateBook = useCallback((id) => {
    clearBookCache(id)
  }, [])

  const value = useMemo(
    () => ({
      books,
      categories,
      loading,
      hydrated,
      loadCatalog,
      getBookById,
      fetchBookById,
      prefetchBook,
      invalidateCatalog,
      invalidateBook,
      getFeaturedBooks: () => books.filter((b) => b.is_featured).slice(0, 6),
    }),
    [
      books,
      categories,
      loading,
      hydrated,
      loadCatalog,
      getBookById,
      fetchBookById,
      prefetchBook,
      invalidateCatalog,
      invalidateBook,
    ]
  )

  return (
    <LibraryDataContext.Provider value={value}>{children}</LibraryDataContext.Provider>
  )
}

export const useLibraryData = () => {
  const ctx = useContext(LibraryDataContext)
  if (!ctx) {
    throw new Error('useLibraryData must be used within LibraryDataProvider')
  }
  return ctx
}
