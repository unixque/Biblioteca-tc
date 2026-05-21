const prefetched = new Set()

export function prefetchCoverUrls(urls, limit = 24) {
  if (!urls?.length) return
  urls
    .filter(Boolean)
    .slice(0, limit)
    .forEach((url) => {
      if (prefetched.has(url)) return
      prefetched.add(url)
      const img = new Image()
      img.decoding = 'async'
      img.src = url
    })
}

export function prefetchBooksCovers(books, limit = 24) {
  prefetchCoverUrls(
    books.map((b) => b.cover_url).filter(Boolean),
    limit
  )
}
