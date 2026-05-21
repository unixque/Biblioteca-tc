import sharp from 'sharp'
import { mkdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const srcDir = path.join(root, 'public', 'media')
const outDir = path.join(root, 'public', 'media', 'slides')

const SLIDES = ['IMG_3336.png', 'IMG_3337.png', 'IMG_3338.png', 'IMG_3339.png']
const MAX_WIDTH = 1600
const WEBP_QUALITY = 90

await mkdir(outDir, { recursive: true })

for (const file of SLIDES) {
  const input = path.join(srcDir, file)
  const base = file.replace(/\.png$/i, '')
  const outWebp = path.join(outDir, `${base}.webp`)
  const outJpeg = path.join(outDir, `${base}.jpg`)

  await sharp(input)
    .rotate()
    .resize(MAX_WIDTH, null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY, effort: 4 })
    .toFile(outWebp)

  await sharp(input)
    .rotate()
    .resize(MAX_WIDTH, null, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(outJpeg)

  console.log(`OK ${base}`)
}
