import { useState, useEffect } from 'react'
import { cn } from '../lib/cn'

const INTERVAL_MS = 5000
const FADE_MS = 700

const normalizeSlide = (slide) => {
  if (!slide) return null
  if (typeof slide === 'string') return { webp: slide, jpeg: slide }
  const webp = slide.webp || slide.src
  const jpeg = slide.jpeg || slide.fallback || webp
  if (!webp) return null
  return { webp, jpeg }
}

const AboutSlideshow = ({ slides, className }) => {
  const [index, setIndex] = useState(0)
  const validSlides = (slides || []).map(normalizeSlide).filter(Boolean)

  useEffect(() => {
    validSlides.forEach(({ webp, jpeg }) => {
      const img = new Image()
      img.src = webp
      if (jpeg !== webp) {
        const fallback = new Image()
        fallback.src = jpeg
      }
    })
  }, [validSlides])

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || validSlides.length <= 1) return undefined
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % validSlides.length)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [validSlides.length])

  if (validSlides.length === 0) {
    return (
      <div
        className={cn(
          'relative aspect-[4/3] w-full min-h-[280px] rounded-lg border border-outline-variant bg-surface-container overflow-hidden',
          className
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        'relative aspect-[4/3] w-full min-h-[280px] md:min-h-[360px] rounded-lg border border-outline-variant bg-surface-container overflow-hidden shadow-ambient',
        className
      )}
      role="region"
      aria-roledescription="carousel"
      aria-label="Fotografias da biblioteca"
      aria-live="polite"
    >
      {validSlides.map(({ webp, jpeg }, i) => (
        <picture
          key={webp}
          className={cn(
            'absolute inset-0 block h-full w-full transition-opacity ease-in-out',
            i === index ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
          )}
          style={{ transitionDuration: `${FADE_MS}ms` }}
          aria-hidden={i !== index}
        >
          <source type="image/webp" srcSet={webp} />
          <img
            src={jpeg}
            alt={`Biblioteca Tomás Cabreira — foto ${i + 1}`}
            width={1600}
            height={1200}
            decoding="async"
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'low'}
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="h-full w-full object-cover object-center"
          />
        </picture>
      ))}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-t from-black/25 to-transparent"
        aria-hidden
      />
      {validSlides.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 z-[3] flex justify-center gap-2">
          {validSlides.map((_, i) => (
            <span
              key={i}
              className={cn(
                'h-1.5 w-1.5 rounded-full transition-colors shadow-sm',
                i === index ? 'bg-white' : 'bg-white/45'
              )}
              aria-hidden
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default AboutSlideshow
