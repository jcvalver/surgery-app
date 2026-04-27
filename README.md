# Cirugía Plástica Valverde — Sitio Web Estático

Sitio web institucional de **Cirugía Plástica Valverde** — Lima, Perú.  
Migración completa desde WordPress a una aplicación estática multi-página construida con **Vite + Tailwind CSS 4 + TypeScript**.

---

## Índice

1. [Descripción funcional](#descripción-funcional)
2. [Stack tecnológico](#stack-tecnológico)
3. [Estructura del proyecto](#estructura-del-proyecto)
4. [Diseño — Paleta Rose Noir](#diseño--paleta-rose-noir)
5. [Páginas y rutas](#páginas-y-rutas)
6. [Componentes TypeScript](#componentes-typescript)
7. [Datos y contenido](#datos-y-contenido)
8. [Integraciones externas](#integraciones-externas)
9. [Comandos de desarrollo](#comandos-de-desarrollo)
10. [Despliegue en GitHub Pages](#despliegue-en-github-pages)
11. [Assets y multimedia](#assets-y-multimedia)
12. [Decisiones de arquitectura](#decisiones-de-arquitectura)

---

## Descripción funcional

El sitio presenta la oferta médica de la **Dra. Karen Valverde**, especialista en cirugía plástica, reconstructiva y medicina estética en Lima. Cuenta con:

- Página principal con hero, estadísticas, servicios, testimonios y CTAs.
- Perfil detallado de la doctora (formación, certificaciones, experiencia).
- Catálogo de **12 procedimientos quirúrgicos** con página de detalle por cada uno.
- Catálogo de **4 tratamientos de medicina estética** con página de detalle.
- Catálogo de **2 tratamientos no invasivos** con página de detalle.
- Formulario de contacto funcional mediante **EmailJS** (sin backend propio).
- Botón flotante de **WhatsApp** presente en todas las páginas.
- Páginas legales: Política de Privacidad y Términos de Servicio.
- PWA básica: manifest, iconos en múltiples resoluciones, `theme_color` de marca.

---

## Stack tecnológico

| Tecnología | Versión | Rol |
|---|---|---|
| **Vite** | ^8.0.10 | Bundler, dev server, build multi-página |
| **Tailwind CSS** | ^4.2.4 | Estilos — via `@tailwindcss/vite` plugin |
| **TypeScript** | ~6.0.2 | Lógica de componentes y páginas |
| **Swiper** | ^12.1.3 | Carrusel de testimonios |
| **AOS** | ^2.3.4 | Animaciones scroll (Animate On Scroll) |
| **EmailJS** | ^4.4.1 | Envío de formulario de contacto |
| **Jimp** | ^1.6.1 | Script de procesamiento de imágenes (devDep) |
| **Google Fonts** | — | Inter + Playfair Display (cargadas via CDN) |

**Entorno**: Node.js 20+, npm.

---

## Estructura del proyecto

```
surgery-app/
├── index.html                        # Página principal
├── design-system.html                # Referencia visual de la paleta Rose Noir (v2.0)
├── vite.config.ts                    # Configuración Vite: base, plugins, 26 entradas
├── tsconfig.json                     # TypeScript: bundler moduleResolution, resolveJsonModule
├── package.json
│
├── pages/                            # Páginas secundarias (HTML shells)
│   ├── cirugia-plastica.html
│   ├── dra-karen.html
│   ├── medicina-estetica.html
│   ├── no-invasivos.html
│   ├── contacto.html
│   ├── privacidad.html
│   ├── terminos.html
│   └── procedimientos/               # 12 procedimientos quirúrgicos
│       ├── rinoplastia.html
│       ├── mamoplastia.html
│       ├── lipoescultura.html
│       ├── lipoabdominoplastia.html
│       ├── lipomarcacion-abdominal.html
│       ├── lipotransferencia-gluteos.html
│       ├── implante-gluteos.html
│       ├── blefaroplastia.html
│       ├── otoplastia.html
│       ├── bichectomia.html
│       ├── afinamiento-facial.html
│       └── ginecomastia.html
│   └── tratamientos/                 # 6 tratamientos estéticos / no invasivos
│       ├── plasma-rico-en-plaquetas.html
│       ├── acido-hialuronico.html
│       ├── vitamina-c.html
│       ├── toxina-botulinica.html
│       ├── depilacion-laser.html
│       └── exilis-ultra-360.html
│
├── src/
│   ├── main.ts                       # Lógica y HTML de la página principal
│   ├── style.css                     # Tokens de diseño (@theme), componentes, utilidades
│   ├── vite-env.d.ts
│   │
│   ├── components/
│   │   ├── navbar.ts                 # Navbar responsiva (desktop dropdown + hamburger)
│   │   └── footer.ts                 # Footer completo
│   │
│   ├── data/
│   │   ├── site.json                 # Config global: teléfono, sedes, redes, nav tree
│   │   ├── cirugias.json             # 12 procedimientos con imágenes y metadata
│   │   ├── medicina-estetica.json    # 4 tratamientos estéticos
│   │   ├── no-invasivos.json         # 2 tratamientos no invasivos
│   │   └── testimonios.json          # Testimonios de pacientes para el carrusel
│   │
│   ├── pages/
│   │   ├── cirugia-plastica.ts
│   │   ├── dra-karen.ts
│   │   ├── medicina-estetica.ts
│   │   ├── no-invasivos.ts
│   │   ├── contacto.ts               # Formulario + integración EmailJS
│   │   ├── privacidad.ts
│   │   ├── terminos.ts
│   │   ├── procedimientos/
│   │   │   └── detalle.ts            # Template genérico para los 12 procedimientos
│   │   └── tratamientos/
│   │       └── detalle.ts            # Template genérico para los 6 tratamientos
│   │
│   └── utils/
│       └── helpers.ts                # img(), url(), renderWhatsAppFloat(),
│                                     # initAOS(), formatPhone(), renderStars()
│
├── public/
│   ├── manifest.webmanifest          # PWA manifest
│   └── assets/images/               # Imágenes organizadas por categoría
│       ├── icono/                    # Logo en 7 resoluciones (PNG fondo transparente)
│       ├── home/
│       ├── cirugia_plastica/         # Subcarpeta por procedimiento
│       ├── medicina_estetica/        # Subcarpeta por tratamiento
│       ├── no_invasivos/
│       └── vida_mas/
│
├── scripts/
│   └── remove-bg.mjs                 # Script jimp: elimina fondo blanco de logos PNG
│
└── .github/
    └── workflows/
        └── deploy.yml                # CI/CD: build + deploy automático a GitHub Pages
```

---

## Diseño — Paleta Rose Noir

Paleta derivada directamente de los tres colores del logotipo de la clínica.  
Referencia visual completa en `design-system.html`.

### Tokens CSS (`src/style.css` → `@theme`)

| Token | Valor | Uso principal |
|---|---|---|
| `--color-brand-primary` | `#8C3F5A` | Botones, links activos, foco, hero overlay, navbar |
| `--color-brand-secondary` | `#C4728A` | Hover btn-primary, gradientes de acento |
| `--color-brand-accent` | `#FDF0F4` | Fondos suaves, badges, ring de foco en inputs |
| `--color-brand-gold` | `#D4A843` | btn-gold, gradiente de texto, estrellas, Valverde footer |
| `--color-brand-dark` | `#1E1A1C` | Carbón del logo — fondo footer, neutral-900 |
| `--color-neutral-50` | `#FAF8F9` | Fondo del documento (cálido) |
| `--color-neutral-100` | `#F4EEF1` | Chips de código, fondos secundarios |
| `--color-neutral-200` | `#E6D9DF` | Bordes de inputs, divisores |
| `--color-neutral-600` | `#6B5560` | Párrafos secundarios |
| `--color-neutral-700` | `#4A3540` | Links de nav, labels de formulario |
| `--color-neutral-800` | `#2D1E25` | Color base body, títulos H2/H3 |
| `--color-neutral-900` | `#1E1A1C` | Fondo footer = brand-dark |
| `--shadow-card` | `0 4px 24px 0 rgba(140,63,90,0.10)` | Sombra de cards |

### Tipografía

- **Playfair Display** (400 / 600 / 700) — Títulos H1–H3, serif de lujo.
- **Inter** (400 / 500 / 600 / 700) — Cuerpo, UI, navegación.

### Gradientes

```css
/* Texto destacado (ej. "Valverde" en footer) */
linear-gradient(135deg, #8C3F5A, #D4A843)

/* Hero overlay sobre imagen de fondo */
linear-gradient(135deg, rgba(140,63,90,0.88), rgba(140,63,90,0.55), rgba(0,0,0,0.25))
```

---

## Páginas y rutas

El sitio tiene **26 entradas** registradas en `vite.config.ts`. Todas las rutas son relativas a `base: '/surgery-app/'`.

| Ruta | Entrada Vite | TypeScript |
|---|---|---|
| `/` | `main` | `src/main.ts` |
| `/pages/dra-karen.html` | `dra-karen` | `src/pages/dra-karen.ts` |
| `/pages/cirugia-plastica.html` | `cirugia-plastica` | `src/pages/cirugia-plastica.ts` |
| `/pages/medicina-estetica.html` | `medicina-estetica` | `src/pages/medicina-estetica.ts` |
| `/pages/no-invasivos.html` | `no-invasivos` | `src/pages/no-invasivos.ts` |
| `/pages/contacto.html` | `contacto` | `src/pages/contacto.ts` |
| `/pages/privacidad.html` | `privacidad` | `src/pages/privacidad.ts` |
| `/pages/terminos.html` | `terminos` | `src/pages/terminos.ts` |
| `/pages/procedimientos/[nombre].html` | `proc-*` (×12) | `src/pages/procedimientos/detalle.ts` |
| `/pages/tratamientos/[nombre].html` | `trat-*` (×6) | `src/pages/tratamientos/detalle.ts` |

### Páginas de detalle genéricas

`detalle.ts` (procedimientos y tratamientos) determina el contenido a renderizar leyendo el atributo `data-slug` del `<body>` de cada HTML. Cada HTML shell define su propio slug:

```html
<body data-slug="rinoplastia">
```

El script consulta el JSON correspondiente, encuentra el objeto por slug y renderiza el contenido completo en el DOM.

---

## Componentes TypeScript

### `navbar.ts`

Navbar sticky responsiva. Comportamiento:

- **Desktop**: Logo + links con dropdowns animados (chevron rotate 180°). Al scrollear >10px aplica `bg-white/95 backdrop-blur`.
- **Mobile**: Hamburger `☰` / `✕`, menú de pantalla completa con acordeones por categoría.
- Todos los links usan el helper `url()` para respetar el `base` de Vite.
- Altura fija: `h-20` (navbar) + `<div class="h-20">` spacer en el body para evitar superposición.

### `footer.ts`

Footer de tres columnas sobre fondo `neutral-900` (`#1E1A1C`):
- Logo con `filter: drop-shadow` para visibilidad sobre fondo oscuro.
- Columnas: Empresa / Servicios / Contacto.
- Copyright dinámico con `new Date().getFullYear()`.

---

## Datos y contenido

### `src/data/site.json`

Configuración global del sitio. Contiene:
- Nombre, tagline, descripción.
- Teléfono, WhatsApp (formato `51XXXXXXXXX`), email.
- Array `sedes` con 2 sedes (Pueblo Libre e Independencia).
- `socialMedia`: Facebook, Instagram, YouTube.
- Árbol de navegación completo (`nav`), usado por `navbar.ts`.

### `src/data/cirugias.json`

Array de 12 objetos. Cada objeto incluye:

```json
{
  "slug": "rinoplastia",
  "nombre": "Rinoplastia",
  "descripcion": "...",
  "descripcionLarga": "...",
  "beneficios": ["..."],
  "imagenPrincipal": "/assets/images/cirugia_plastica/rinoplastia/...",
  "imagenes": ["..."],
  "duracion": "2-3 horas",
  "recuperacion": "10-14 días",
  "anestesia": "General"
}
```

### `src/data/medicina-estetica.json` / `no-invasivos.json`

Misma estructura que `cirugias.json`, para 4 y 2 tratamientos respectivamente.

### `src/data/testimonios.json`

Array de testimonios con `nombre`, `rating` (1–5), `texto` y `procedimiento`. Renderizados en el carrusel Swiper de la home.

---

## Integraciones externas

### EmailJS

Formulario de contacto en `/pages/contacto.html` sin backend propio.

| Parámetro | Valor |
|---|---|
| Service ID | `service_qwyunmj` |
| Template ID | `template_as1dwk3` |
| Public Key | `HtQKduj874gJKcnKp` |

Variables del template: `from_name`, `from_email`, `phone`, `service`, `message`.

### Swiper

Carrusel de testimonios en la home. Configuración:
- `loop: true`, `autoplay: { delay: 5000 }`.
- Breakpoints: 1 slide en móvil, 2 en tablet, 3 en desktop.
- Paginación y navegación con flechas — colores sobreescritos al `brand-primary` via CSS.

### AOS (Animate On Scroll)

Inicializado en `helpers.ts` → `initAOS()`. Configuración:
```ts
AOS.init({ duration: 800, easing: 'ease-out', once: true, offset: 80 })
```
Efectos usados: `fade-up`, `fade-right`, `fade-left`.

---

## Comandos de desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (hot reload)
npm run dev
# → http://localhost:5173/surgery-app/

# Compilar TypeScript + build de producción
npm run build
# → Salida en ./dist/

# Vista previa del build de producción
npm run preview
# → http://localhost:4173/surgery-app/

# Eliminar fondo blanco de logos PNG (devDependency jimp)
node scripts/remove-bg.mjs
```

> **Nota**: `npm run build` ejecuta `tsc` (type-check) y luego `vite build`. Cualquier error de tipos bloqueará el build.

---

## Despliegue en GitHub Pages

El despliegue es completamente automático vía **GitHub Actions**.

### Configuración en `vite.config.ts`

```ts
export default defineConfig({
  base: '/surgery-app/',   // ← debe coincidir exactamente con el nombre del repo
  ...
})
```

### Workflow `.github/workflows/deploy.yml`

Se ejecuta en cada push a `main` y manualmente via `workflow_dispatch`:

1. `actions/checkout@v4` — clona el repositorio.
2. `actions/setup-node@v4` — Node.js 20 con caché de npm.
3. `npm ci` — instalación limpia y reproducible.
4. `npm run build` — genera `./dist/`.
5. `actions/configure-pages@v4` + `actions/upload-pages-artifact@v3` — prepara el artefacto.
6. `actions/deploy-pages@v4` — publica en GitHub Pages.

### Pasos para el primer despliegue

```bash
# 1. Inicializar git
git init
git add .
git commit -m "feat: initial commit — Rose Noir palette"

# 2. Crear repo público en https://github.com/new
#    Nombre: surgery-app

# 3. Conectar y subir
git remote add origin https://github.com/TU_USUARIO/surgery-app.git
git branch -M main
git push -u origin main
```

Después del push, activar Pages en:  
**Settings → Pages → Source → GitHub Actions**

URL del sitio desplegado:
```
https://TU_USUARIO.github.io/surgery-app/
```

---

## Assets y multimedia

### Logo / Iconos (`public/assets/images/icono/`)

7 resoluciones del logo con **fondo transparente** (procesadas con `scripts/remove-bg.mjs`):

| Archivo | Uso |
|---|---|
| `logo-kv-1-32x32.png` | Favicon |
| `logo-kv-1-150x150.png` | Navbar y footer |
| `logo-kv-1-180x180.png` | Apple touch icon |
| `logo-kv-1-192x192.png` | PWA manifest |
| `logo-kv-1-270x270.png` | OG / social sharing |
| `logo-kv-1-300x300.png` | Alta resolución |
| `logo-kv-1-500x500.png` | Máxima calidad |

### Imágenes de procedimientos y tratamientos

Organizadas en subcarpetas bajo `public/assets/images/`:

```
cirugia_plastica/
  rinoplastia/        mamoplastia/      lipoescultura/
  lipoabdominoplastia/ lipomarcacion_abdominal/
  lipotransferencia_de_gluteos/ implate_de_gluteos/
  blefaroplastia/     otoplastia/       bichectomia/
  afinamiento_facial/ ginecomastia/

medicina_estetica/
  acido_hialuronico/  plasma_rico_en_plaquetas/
  toxina_botulinica/  vitamina_c/

no_invasivos/
  depilacion_laser/   exilis_ultra_360/

home/
vida_mas/
```

### Helpers de rutas (`src/utils/helpers.ts`)

```ts
// Prefija rutas de imagen con el base de Vite
img('/assets/images/icono/logo.png')
// → '/surgery-app/assets/images/icono/logo.png'

// Prefija rutas de página
url('/pages/contacto.html')
// → '/surgery-app/pages/contacto.html'
```

---

## Decisiones de arquitectura

| Decisión | Justificación |
|---|---|
| **Multi-página HTML estático** en lugar de SPA | Sin necesidad de router en cliente; mejor SEO semántico; build simple con Vite `rollupOptions.input` |
| **Template genérico `detalle.ts`** para 12+6 páginas | Evita duplicación de código; cada HTML solo define un `data-slug`; el TS consulta el JSON y renderiza |
| **JSON como "base de datos"** | Sin backend requerido; edición directa de contenido; resolveJsonModule en TypeScript |
| **EmailJS** para el formulario | Formulario funcional sin servidor; gratuito hasta 200 emails/mes |
| **Tailwind CSS 4 via `@tailwindcss/vite`** | Plugin nativo sin configuración PostCSS separada; tokens en `@theme` en lugar de `tailwind.config.js` |
| **`public/` para imágenes** | Las imágenes se copian tal cual a `dist/` sin hash de nombre; las rutas en los JSON permanecen estables |
| **Jimp como devDependency** | Script único de preprocesamiento de logo; no forma parte del bundle de producción |
| **`base: '/surgery-app/'`** | Requerido por GitHub Pages al alojar en subruta; todos los assets y rutas se prefijan automáticamente |

---

*Sitio desarrollado para Cirugía Plástica Valverde — VALVIA — Lima, Perú.*
