/** Build a compact catalog list for the AI assistant (all books, not only available). */
export function buildCatalogSnippet(books = []) {
  if (!books.length) return ''
  return books
    .map((b) => {
      const avail = (b.available_qty ?? 0) > 0 ? 'disponível' : 'indisponível'
      const cat = b.categories?.name || b.category_name || ''
      return `- "${b.title}" | ${b.author || 'autor desconhecido'} | id:${b.id} | ${avail}${cat ? ` | ${cat}` : ''}`
    })
    .join('\n')
}

export function findBookMentionedInText(text, books = []) {
  if (!text) return null
  const lower = text.toLowerCase()
  return (
    books.find((b) => {
      const title = b.title?.trim()
      return title && title.length >= 3 && lower.includes(title.toLowerCase())
    }) ?? null
  )
}
