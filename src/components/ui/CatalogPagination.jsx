import { useMemo } from 'react'
import { cn } from '../../lib/cn'
import MaterialIcon from './MaterialIcon'
import { useLanguage } from '../../context/LanguageContext'

const MAX_VISIBLE = 7

/** Compact page list: 1 … 4 5 6 … 12 when totalPages > MAX_VISIBLE */
function buildPageItems(totalPages, currentPage) {
  if (totalPages <= MAX_VISIBLE) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const items = []
  const add = (n) => {
    if (typeof n === 'number' && n >= 1 && n <= totalPages && !items.includes(n)) {
      items.push(n)
    }
  }

  add(1)
  if (currentPage > 3) items.push('ellipsis-start')
  for (let p = currentPage - 1; p <= currentPage + 1; p++) add(p)
  if (currentPage < totalPages - 2) items.push('ellipsis-end')
  add(totalPages)

  return items
}

const CatalogPagination = ({ page, totalPages, onPageChange }) => {
  const { t } = useLanguage()

  const pageItems = useMemo(
    () => buildPageItems(totalPages, page),
    [totalPages, page]
  )

  if (totalPages <= 1) return null

  const goTo = (next) => {
    if (next < 1 || next > totalPages || next === page) return
    onPageChange(next)
  }

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
      aria-label={t('home.paginationLabel')}
    >
      <button
        type="button"
        onClick={() => goTo(page - 1)}
        disabled={page <= 1}
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-none border border-outline-variant',
          'text-on-surface transition-colors',
          'hover:bg-surface-container disabled:pointer-events-none disabled:opacity-40'
        )}
        aria-label={t('home.prevPage')}
      >
        <MaterialIcon name="chevron_left" size={20} />
      </button>

      {pageItems.map((item, i) =>
        typeof item === 'string' ? (
          <span
            key={`${item}-${i}`}
            className="flex h-10 min-w-10 items-center justify-center px-1 text-on-surface-variant"
            aria-hidden
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => goTo(item)}
            aria-label={t('home.page').replace('{page}', String(item))}
            aria-current={item === page ? 'page' : undefined}
            className={cn(
              'flex h-10 min-w-10 items-center justify-center rounded-none px-3 text-label-sm font-semibold transition-colors',
              item === page
                ? 'bg-primary text-on-primary border border-primary'
                : 'border border-outline-variant text-on-surface hover:bg-surface-container'
            )}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => goTo(page + 1)}
        disabled={page >= totalPages}
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-none border border-outline-variant',
          'text-on-surface transition-colors',
          'hover:bg-surface-container disabled:pointer-events-none disabled:opacity-40'
        )}
        aria-label={t('home.nextPage')}
      >
        <MaterialIcon name="chevron_right" size={20} />
      </button>
    </nav>
  )
}

export default CatalogPagination
