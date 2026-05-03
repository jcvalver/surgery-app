import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname, basename, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const imagesDir = join(__dirname, '../public/assets/images')

async function getImageFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...await getImageFiles(fullPath))
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      files.push(fullPath)
    }
  }
  return files
}

const files = await getImageFiles(imagesDir)
console.log(`Encontradas ${files.length} imágenes. Convirtiendo...`)

let ok = 0, skip = 0, err = 0

for (const file of files) {
  const ext = extname(file)
  const webpPath = file.slice(0, -ext.length) + '.webp'

  try {
    const srcStat = await stat(file)
    let shouldConvert = true
    try {
      const destStat = await stat(webpPath)
      // Saltar si webp ya existe y es más reciente
      if (destStat.mtimeMs >= srcStat.mtimeMs) {
        skip++
        shouldConvert = false
      }
    } catch { /* webp no existe, convertir */ }

    if (shouldConvert) {
      await sharp(file)
        .webp({ quality: 82 })
        .toFile(webpPath)
      const destStat = await stat(webpPath)
      const saving = (((srcStat.size - destStat.size) / srcStat.size) * 100).toFixed(0)
      console.log(`✓ ${basename(file)} → ${basename(webpPath)} (${saving}% menos)`)
      ok++
    }
  } catch (e) {
    console.error(`✗ Error en ${basename(file)}: ${e.message}`)
    err++
  }
}

console.log(`\nListo: ${ok} convertidas, ${skip} omitidas (ya existían), ${err} errores.`)
