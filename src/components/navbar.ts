import siteData from '../data/site.json'
import { url, img } from '../utils/helpers'

export function renderNavbar(activePage: string = ''): string {
  const hasDropdown = (item: typeof siteData.nav[0]) => 'children' in item && item.children && item.children.length > 0

  const navItems = siteData.nav.map((item) => {
    const isActive = item.href === activePage || activePage.includes(item.href.replace('/pages/', '').replace('.html', ''))

    if (hasDropdown(item)) {
      const children = ((item as any).children as { orden?: number; label: string; href: string }[])
        .slice().sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999))
      return `
        <li class="relative group">
          <button class="nav-link flex items-center gap-1 ${isActive ? 'nav-link-active' : ''}"
                  aria-haspopup="true" aria-expanded="false">
            ${item.label}
            <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <ul class="absolute left-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-neutral-100
                     opacity-0 invisible group-hover:opacity-100 group-hover:visible
                     transition-all duration-200 z-50 py-2" role="menu">
            ${children.map(child => `
              <li role="menuitem">
                <a href="${url(child.href)}" class="block px-4 py-2.5 text-sm text-neutral-700 hover:text-brand-primary hover:bg-brand-accent transition-colors duration-150">
                  ${child.label}
                </a>
              </li>
            `).join('')}
          </ul>
        </li>
      `
    }

    return `
      <li>
        <a href="${url(item.href)}" class="nav-link ${isActive ? 'nav-link-active' : ''}">
          ${item.label}
        </a>
      </li>
    `
  }).join('')

  const mobileItems = siteData.nav.map((item) => {
    if (hasDropdown(item)) {
      const children = ((item as any).children as { orden?: number; label: string; href: string }[])
        .slice().sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999))
      return `
        <div class="border-b border-neutral-100 pb-2 mb-2">
          <p class="text-xs font-semibold tracking-wide uppercase text-neutral-400 px-4 py-2">${item.label}</p>
          ${children.map(child => `
            <a href="${url(child.href)}" class="block px-5 py-2 text-sm text-neutral-700 hover:text-brand-primary hover:bg-brand-accent rounded-lg transition-colors truncate">
              ${child.label}
            </a>
          `).join('')}
        </div>
      `
    }
    return `
      <a href="${url(item.href)}" class="block px-4 py-3 text-neutral-700 hover:text-brand-primary hover:bg-brand-accent rounded-xl font-medium transition-colors">
        ${item.label}
      </a>
    `
  }).join('')

  return `
    <header id="navbar" class="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      <div class="section-container">
        <nav class="flex items-center justify-between h-20 md:h-20" aria-label="Navegación principal">
          <!-- Logo -->
          <a href="${url('/')}" class="flex items-center flex-shrink-0" aria-label="Cirugía Plástica Valverde - Inicio">
            <img src="${img('/assets/images/icono/logo-kv-1-150x150.webp')}" alt="Cirugía Plástica Valverde" class="h-18 w-auto object-contain" width="150" height="150" />
          </a>

          <!-- Desktop menu -->
          <ul class="hidden lg:flex items-center gap-6 list-none" role="list">
            ${navItems}
          </ul>

          <!-- CTA + mobile toggle -->
          <div class="flex items-center gap-3">
            <a href="${url('/pages/contacto.html')}" class="hidden md:inline-flex btn-primary text-sm py-2 px-4">
              Agendar cita
            </a>
            <button id="mobile-menu-btn"
                    class="lg:hidden p-2 rounded-lg text-neutral-700 hover:bg-brand-accent transition-colors"
                    aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-menu">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path id="menu-icon-open" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                <path id="menu-icon-close" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </nav>
      </div>

      <!-- Mobile menu (fuera del section-container para garantizar ancho 100vw) -->
      <div id="mobile-menu" class="lg:hidden bg-white shadow-xl border-t border-neutral-100" aria-label="Menú móvil" style="max-width:100vw;overflow-x:hidden;box-sizing:border-box;">
        <div class="px-4 py-4" style="max-width:100%;overflow-x:hidden;">
          ${mobileItems}
          <div class="mt-3 px-2">
            <a href="${url('/pages/contacto.html')}" class="flex items-center justify-center bg-brand-primary text-white text-sm font-semibold py-2.5 px-6 rounded-full hover:bg-brand-secondary transition-all duration-300">
              Agendar cita
            </a>
          </div>
        </div>
      </div>
    </header>

    <!-- Spacer -->
    <div class="h-20 md:h-20"></div>
  `
}

export function initNavbar(): void {
  const navbar = document.getElementById('navbar')
  const btn = document.getElementById('mobile-menu-btn')
  const menu = document.getElementById('mobile-menu')
  const iconOpen = document.getElementById('menu-icon-open')
  const iconClose = document.getElementById('menu-icon-close')

  // Scroll effect
  const onScroll = () => {
    if (!navbar) return
    if (window.scrollY > 20) {
      navbar.classList.add('navbar-scrolled')
      navbar.classList.remove('bg-transparent')
    } else {
      navbar.classList.remove('navbar-scrolled')
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  // Mobile toggle
  btn?.addEventListener('click', () => {
    const isOpen = menu?.classList.contains('open')
    menu?.classList.toggle('open')
    btn.setAttribute('aria-expanded', String(!isOpen))
    iconOpen?.classList.toggle('hidden')
    iconClose?.classList.toggle('hidden')
  })

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!btn?.contains(e.target as Node) && !menu?.contains(e.target as Node)) {
      menu?.classList.remove('open')
      btn?.setAttribute('aria-expanded', 'false')
      iconOpen?.classList.remove('hidden')
      iconClose?.classList.add('hidden')
    }
  })
}
