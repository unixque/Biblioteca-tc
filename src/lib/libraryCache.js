const CATALOG_KEY = 'biblioteca_catalog_v1'
const BOOK_KEY_PREFIX = 'biblioteca_book_v1_'
const DEFAULT_TTL_MS = 5 * 60 * 1000

let memoryCatalog = null
const memoryBooks = new Map()

function safeParse(json) {
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

function isFresh(fetchedAt, ttlMs = DEFAULT_TTL_MS) {
  if (!fetchedAt) return false
  return Date.now() - fetchedAt < ttlMs
}

export function getCatalogFromMemory() {
  if (memoryCatalog && isFresh(memoryCatalog.fetchedAt)) return memoryCatalog
  return null
}

export function getCatalog() {
  const mem = getCatalogFromMemory()
  if (mem) return mem

  try {
    const raw = sessionStorage.getItem(CATALOG_KEY)
    if (!raw) return null
    const parsed = safeParse(raw)
    if (!parsed || !isFresh(parsed.fetchedAt)) {
      sessionStorage.removeItem(CATALOG_KEY)
      return null
    }
    memoryCatalog = parsed
    return parsed
  } catch {
    return null
  }
}

export function setCatalog({ books, categories }) {
  const payload = {
    books: books || [],
    categories: categories || [],
    fetchedAt: Date.now(),
  }
  memoryCatalog = payload
  try {
    sessionStorage.setItem(CATALOG_KEY, JSON.stringify(payload))
  } catch {
    /* quota exceeded — memory cache still works */
  }
  return payload
}

export function invalidateCatalog() {
  memoryCatalog = null
  try {
    sessionStorage.removeItem(CATALOG_KEY)
  } catch {
    /* ignore */
  }
}

export function getBookFromMemory(id) {
  const key = String(id)
  const entry = memoryBooks.get(key)
  if (entry && isFresh(entry.fetchedAt)) return entry.book
  return null
}

export function getBook(id) {
  const mem = getBookFromMemory(id)
  if (mem) return mem

  try {
    const raw = sessionStorage.getItem(`${BOOK_KEY_PREFIX}${id}`)
    if (!raw) return null
    const parsed = safeParse(raw)
    if (!parsed || !isFresh(parsed.fetchedAt)) {
      sessionStorage.removeItem(`${BOOK_KEY_PREFIX}${id}`)
      return null
    }
    memoryBooks.set(String(id), parsed)
    return parsed.book
  } catch {
    return null
  }
}

export function setBook(id, book) {
  const key = String(id)
  const payload = { book, fetchedAt: Date.now() }
  memoryBooks.set(key, payload)
  try {
    sessionStorage.setItem(`${BOOK_KEY_PREFIX}${id}`, JSON.stringify(payload))
  } catch {
    /* ignore */
  }
}

export function invalidateBook(id) {
  memoryBooks.delete(String(id))
  try {
    sessionStorage.removeItem(`${BOOK_KEY_PREFIX}${id}`)
  } catch {
    /* ignore */
  }
}

export function isCatalogFresh() {
  const c = getCatalog()
  return Boolean(c && isFresh(c.fetchedAt))
}
