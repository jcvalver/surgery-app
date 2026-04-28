import siteData from '../data/site.json'

/**
 * Prefix an asset path with Vite's base URL so it resolves correctly
 * in both dev mode (/surgery-app/) and production (/surgery-app/).
 */
export const img = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

/** Prefix an internal page path with Vite's base URL. */
export const url = (path: string): string =>
  path === '/' ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

/**
 * Renderiza el botón flotante de WhatsApp
 */
export function renderWhatsAppFloat(mensaje: string = '¡Hola, quisiera agendar una cita con ustedes!'): string {
  const url = `https://wa.me/${siteData.whatsapp}?text=${encodeURIComponent(mensaje)}`
  return `
    <a href="${url}" target="_blank" rel="noopener noreferrer"
       class="whatsapp-float" aria-label="Contactar por WhatsApp">
      <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  `
}

/**
 * Genera el bloque <head> estándar para todas las páginas
 */
export function renderHead({
  title,
  description,
  canonical,
  ogImage = '/assets/images/og-default.jpg',
}: {
  title: string
  description: string
  canonical: string
  ogImage?: string
}): string {
  const fullTitle = `${title} | Cirugía Plástica Valverde – Lima, Perú`
  return `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${description}" />
    <meta name="robots" content="index, follow" />

    <!-- Open Graph -->
    <meta property="og:title" content="${fullTitle}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="es_PE" />
    <meta property="og:url" content="https://cirugiaplasticavalverde.com${canonical}" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${fullTitle}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${ogImage}" />

    <!-- Canonical -->
    <link rel="canonical" href="https://cirugiaplasticavalverde.com${canonical}" />

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="${import.meta.env.BASE_URL}assets/images/favicon.svg" />

    <!-- Fonts: Inter + Playfair Display -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />

    <title>${fullTitle}</title>
  `
}

/**
 * Inicializa AOS (animaciones scroll) de forma global
 */
export async function initAOS(): Promise<void> {
  const AOS = (await import('aos')).default
  await import('aos/dist/aos.css')
  AOS.init({
    duration: 700,
    once: true,
    offset: 60,
    easing: 'ease-out-cubic',
  })
}

/**
 * Formatea número de teléfono para display
 */
export function formatPhone(phone: string): string {
  return phone.replace(/(\+\d{2})\s?(\d{3})\s?(\d{3})\s?(\d{3})/, '$1 $2 $3 $4')
}

/**
 * Genera estrellas SVG para ratings
 */
export function renderStars(rating: number, max: number = 5): string {
  return Array.from({ length: max }, (_, i) => `
    <svg class="w-4 h-4 ${i < rating ? 'text-brand-gold' : 'text-neutral-300'}" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>
  `).join('')
}
