export const LOGO_URL = '/assets/logo.png'
export const LOGOTIPO_URL = '/assets/logotipo.png'

const slide = (id) => ({
  webp: `/media/slides/${id}.webp`,
  jpeg: `/media/slides/${id}.jpg`,
})

/** Optimized slides (~1600px) for landing "Sobre" section */
export const ABOUT_SLIDES = [
  slide('IMG_3336'),
  slide('IMG_3337'),
  slide('IMG_3338'),
  slide('IMG_3339'),
]
