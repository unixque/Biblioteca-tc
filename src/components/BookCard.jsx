import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../lib/cn'
import ImageSkeleton from './ui/motion/ImageSkeleton'

function extractDominantColor(imgEl) {
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const size = 40
    canvas.width = size
    canvas.height = size
    ctx.drawImage(imgEl, 0, 0, size, size)
    const data = ctx.getImageData(0, 0, size, size).data
    let r = 0, g = 0, b = 0, count = 0
    for (let i = 0; i < data.length; i += 16) {
      const pr = data[i], pg = data[i + 1], pb = data[i + 2]
      const brightness = (pr + pg + pb) / 3
      if (brightness > 30 && brightness < 220) {
        r += pr; g += pg; b += pb; count++
      }
    }
    if (count === 0) return null
    return { r: Math.round(r / count), g: Math.round(g / count), b: Math.round(b / count) }
  } catch {
    return null
  }
}

const BookCard = ({ book, variant = 'catalog', onClick }) => {
  const isRecommended = variant === 'recommended'
  const imgRef = useRef(null)
  const [accentColor, setAccentColor] = useState(null)

  const handleImageLoad = useCallback(() => {
    if (!isRecommended || !imgRef.current) return
    const color = extractDominantColor(imgRef.current)
    if (color) setAccentColor(color)
  }, [isRecommended])

  const bgStyle = accentColor
    ? { backgroundColor: `rgba(${accentColor.r},${accentColor.g},${accentColor.b},0.85)` }
    : undefined

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => onClick?.(book.id)}
      className={cn(
        'cursor-pointer group select-none',
        isRecommended ? 'snap-start shrink-0 w-[160px] md:w-[180px]' : 'w-full flex flex-col'
      )}
    >
      <div
        className={cn(
          'relative aspect-[2/3] bg-surface-container overflow-hidden rounded border border-outline-variant book-card-shadow transition-all duration-300',
          isRecommended ? 'mb-2 group-hover:-translate-y-1 group-hover:shadow-lg' : 'mb-3 group-hover:opacity-100'
        )}
        style={isRecommended ? bgStyle : undefined}
      >
        <ImageSkeleton
          ref={isRecommended ? imgRef : undefined}
          src={book.cover_url}
          alt={book.title}
          crossOrigin={isRecommended ? 'anonymous' : undefined}
          onLoad={isRecommended ? handleImageLoad : undefined}
          containerClassName="w-full h-full"
          className={cn(
            'w-full h-full object-cover',
            !isRecommended && 'opacity-90 group-hover:opacity-100 transition-opacity'
          )}
          loading="lazy"
        />
        <div className="absolute inset-0 book-spine-effect pointer-events-none" />
      </div>
      <div className={cn(isRecommended ? 'px-1' : 'flex-grow flex flex-col')}>
        <h3
          className={cn(
            'font-serif leading-snug mb-1 line-clamp-1 transition-colors',
            isRecommended
              ? 'text-body-md text-primary line-clamp-2 group-hover:underline decoration-1 underline-offset-4'
              : 'text-[18px] text-on-surface group-hover:text-primary'
          )}
        >
          {book.title}
        </h3>
        <p className={cn('text-on-surface-variant line-clamp-1', isRecommended ? 'text-body-sm' : 'text-body-md text-[14px]')}>{book.author}</p>
      </div>
    </motion.article>
  )
}

export default BookCard
