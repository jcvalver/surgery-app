/**
 * remove-bg.mjs
 * Remueve el fondo blanco/claro de todos los PNGs del icono
 * Uso: node scripts/remove-bg.mjs
 */

import { Jimp } from 'jimp'
import { readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const ICONS_DIR = join(__dir, '../public/assets/images/icono')

// Threshold: cuán "blanco" debe ser un pixel para volverse transparente (0-255)
// 230 = elimina blanco puro y blancos casi puros; sube a 240 si recorta demasiado el logo
const WHITE_THRESHOLD = 230

const files = readdirSync(ICONS_DIR).filter(f => f.endsWith('.png'))

console.log(`Procesando ${files.length} archivos en ${ICONS_DIR}\n`)

for (const file of files) {
  const filePath = join(ICONS_DIR, file)
  const image = await Jimp.read(filePath)

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
    const r = this.bitmap.data[idx + 0]
    const g = this.bitmap.data[idx + 1]
    const b = this.bitmap.data[idx + 2]

    // Si el pixel es blanco/casi blanco en los 3 canales → transparente
    if (r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD) {
      this.bitmap.data[idx + 3] = 0 // alpha = 0
    }
  })

  await image.write(filePath)
  console.log(`✓ ${file}`)
}

console.log('\n✅ Listo. Revisa los iconos antes de hacer build.')
