import './style.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { renderNavbar, initNavbar } from './components/navbar'
import { renderFooter } from './components/footer'
import { renderWhatsAppFloat, initAOS, img, url } from './utils/helpers'
import testimoniosData from './data/testimonios.json'
import cirugias from './data/cirugias.json'
import medicinadata from './data/medicina-estetica.json'
import { renderStars } from './utils/helpers'
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

const app = document.getElementById('app')!

// ─── Hero section ────────────────────────────────────────
const heroHTML = `
  <section class="relative min-h-[92vh] flex items-center overflow-hidden" aria-label="Hero principal">
    <!-- Background image placeholder (reemplazar con imagen real) -->
    <div class="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-secondary to-neutral-800">
      <img src="${img('/assets/images/home/01-1.png')}" alt=""
           role="presentation"
           class="w-full h-full object-cover object-top opacity-40" loading="eager" />
    </div>
    <div class="bg-hero-overlay absolute inset-0"></div>

    <div class="section-container relative z-10 py-20">
      <div class="max-w-3xl" data-aos="fade-right">
        <span class="badge bg-white/20 text-white border border-white/30">Dra. Karen Valverde – Lima, Perú</span>
        <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6">
          Belleza con ciencia,<br>
          <span class="text-brand-gold">arte y confianza</span>
        </h1>
        <p class="text-white/85 text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
          Especialista en cirugía plástica, reconstructiva y medicina estética.
          Resultados naturales que transforman vidas con la más alta tecnología.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="${url('/pages/contacto.html')}" class="btn-gold text-base px-8 py-4">
            Agendar consulta gratuita
          </a>
          <a href="${url('/pages/cirugia-plastica.html')}" class="btn-secondary border-white text-white hover:bg-white hover:text-brand-primary text-base px-8 py-4">
            Ver procedimientos
          </a>
        </div>
        <!-- Trust indicators -->
        <div class="flex items-center gap-6 mt-12 text-white/80 text-sm">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
            <span>Cirujana certificada</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>
            <span>+500 pacientes</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
            <span>+10 años de experiencia</span>
          </div>
        </div>
      </div>
    </div>
  </section>
`

// ─── Servicios destacados ─────────────────────────────────
const categorias = [
  {
    titulo: 'Cirugía Plástica',
    descripcion: 'Procedimientos quirúrgicos de alta precisión para transformar y armonizar tu figura.',
    href: '/pages/cirugia-plastica.html',
    icon: `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>`,
    count: cirugias.length,
    color: 'bg-brand-accent',
    textColor: 'text-brand-primary',
  },
  {
    titulo: 'Medicina Estética',
    descripcion: 'Tratamientos no quirúrgicos para rejuvenecer y revitalizar tu piel con resultados visibles.',
    href: '/pages/medicina-estetica.html',
    icon: `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>`,
    count: medicinadata.length,
    color: 'bg-pink-50',
    textColor: 'text-pink-600',
  },
  {
    titulo: 'Tratamientos No Invasivos',
    descripcion: 'Tecnología de última generación para modelar y rejuvenecer sin cirugía ni tiempo de recuperación.',
    href: '/pages/no-invasivos.html',
    icon: `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
    count: 2,
    color: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
]

const serviciosHTML = `
  <section class="py-20 bg-neutral-50" aria-labelledby="servicios-titulo">
    <div class="section-container">
      <span class="badge" data-aos="fade-up">¿Qué hacemos?</span>
      <h2 class="section-title" id="servicios-titulo" data-aos="fade-up" data-aos-delay="100">
        Nuestros servicios
      </h2>
      <p class="section-subtitle" data-aos="fade-up" data-aos-delay="150">
        Ofrecemos una gama completa de procedimientos con los más altos estándares de seguridad y calidad.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${categorias.map((cat, i) => `
          <article class="card p-8" data-aos="fade-up" data-aos-delay="${i * 100 + 200}">
            <div class="${cat.color} ${cat.textColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              ${cat.icon}
            </div>
            <h3 class="font-serif text-xl text-neutral-800 mb-3">${cat.titulo}</h3>
            <p class="text-neutral-600 text-sm leading-relaxed mb-6">${cat.descripcion}</p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-neutral-400">${cat.count} procedimientos</span>
              <a href="${cat.href}" class="text-brand-primary font-semibold text-sm hover:text-brand-secondary transition-colors flex items-center gap-1">
                Ver más
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </a>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  </section>
`

// ─── Sobre la Dra. ───────────────────────────────────────
const draHTML = `
  <section class="py-20" aria-labelledby="dra-titulo">
    <div class="section-container">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div data-aos="fade-right">
          <div class="relative">
            <div class="aspect-[4/5] rounded-3xl overflow-hidden bg-brand-accent">
              <img src="${img('/assets/images/vida_mas/karen-valverde_doc.png')}" alt="Dra. Karen Valverde – Cirujana Plástica"
                   class="w-full h-full object-cover" loading="lazy" />
            </div>
            <!-- Floating badge -->
            <div class="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl" data-aos="zoom-in" data-aos-delay="300">
              <p class="font-serif text-2xl text-brand-primary font-bold">+10</p>
              <p class="text-xs text-neutral-500">años de experiencia</p>
            </div>
          </div>
        </div>
        <div data-aos="fade-left" data-aos-delay="100">
          <span class="badge">Nuestra especialista</span>
          <h2 class="font-serif text-3xl md:text-4xl text-neutral-800 mb-6" id="dra-titulo">
            Dra. Karen Valverde
          </h2>
          <p class="text-neutral-600 leading-relaxed mb-4">
            Cirujana Plástica, Estética y Reconstructiva con más de 10 años de experiencia, dedicada a
            ofrecer resultados naturales que potencian la confianza y bienestar de cada paciente.
          </p>
          <p class="text-neutral-600 leading-relaxed mb-8">
            Formada en las mejores instituciones del Perú y el extranjero, con especializaciones en
            técnicas de alta definición, rejuvenecimiento facial y cirugía reconstructiva avanzada.
          </p>
          <ul class="space-y-3 mb-8">
            ${[
              'Cirujana Plástica certificada por el Colegio Médico del Perú',
              'Especialización en técnicas de alta definición',
              'Miembro de la Sociedad Peruana de Cirugía Plástica',
              'Más de 500 procedimientos realizados con éxito',
            ].map(item => `
              <li class="flex items-start gap-3 text-sm text-neutral-700">
                <svg class="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                ${item}
              </li>
            `).join('')}
          </ul>
          <a href="${url('/pages/dra-karen.html')}" class="btn-primary">Conocer más</a>
        </div>
      </div>
    </div>
  </section>
`

// ─── Cirugías populares ───────────────────────────────────
const cirugiasPopulares = cirugias.slice(0, 6)
const cirugiasHTML = `
  <section class="py-20 bg-neutral-50" aria-labelledby="cirugas-titulo">
    <div class="section-container">
      <span class="badge" data-aos="fade-up">Procedimientos más solicitados</span>
      <h2 class="section-title" id="cirugas-titulo" data-aos="fade-up" data-aos-delay="100">
        Cirugías más populares
      </h2>
      <p class="section-subtitle" data-aos="fade-up" data-aos-delay="150">
        Procedimientos quirúrgicos realizados con la más alta tecnología y estándares de seguridad.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        ${(cirugiasPopulares as Array<{icon:string;nombre:string;descripcionCorta:string;slug:string;imagen:string}>).map((c, i) => `
          <article class="card" data-aos="fade-up" data-aos-delay="${i * 80 + 200}">
            <div class="aspect-video overflow-hidden bg-brand-accent">
              <img src="${img(c.imagen)}" alt="${c.nombre}" loading="lazy"
                   class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div class="p-6">
              <h3 class="font-serif text-lg text-neutral-800 mb-2">${c.nombre}</h3>
              <p class="text-neutral-600 text-sm leading-relaxed mb-4">${c.descripcionCorta}</p>
              <a href="${url('/pages/procedimientos/' + c.slug + '.html')}"
                 class="text-brand-primary font-semibold text-sm hover:text-brand-secondary transition-colors flex items-center gap-1">
                Más información
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </a>
            </div>
          </article>
        `).join('')}
      </div>
      <div class="text-center mt-12" data-aos="fade-up">
        <a href="${url('/pages/cirugia-plastica.html')}" class="btn-secondary">Ver todos los procedimientos</a>
      </div>
    </div>
  </section>
`

// ─── Por qué elegirnos ───────────────────────────────────
const razonesHTML = `
  <section class="py-20 bg-brand-primary text-white" aria-labelledby="razones-titulo">
    <div class="section-container">
      <span class="badge bg-white/20 text-white" data-aos="fade-up">¿Por qué elegirnos?</span>
      <h2 class="section-title text-white" id="razones-titulo" data-aos="fade-up" data-aos-delay="100">
        Tu seguridad y satisfacción, nuestra prioridad
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        ${[
          { icon: '🏥', titulo: 'Instalaciones certificadas', texto: 'Operamos en clínicas con equipamiento de última generación y todos los estándares de seguridad.' },
          { icon: '👩‍⚕️', titulo: 'Especialista certificada', texto: 'La Dra. Valverde cuenta con certificaciones nacionales e internacionales en cirugía plástica.' },
          { icon: '🤝', titulo: 'Atención personalizada', texto: 'Cada paciente recibe un plan personalizado. Tu caso es único y lo tratamos con la máxima atención.' },
          { icon: '✅', titulo: 'Resultados comprobados', texto: 'Más de 500 procedimientos exitosos avalan nuestro trabajo. La satisfacción de nuestros pacientes nos respalda.' },
        ].map((r, i) => `
          <div class="text-center" data-aos="fade-up" data-aos-delay="${i * 100 + 200}">
            <div class="text-5xl mb-4">${r.icon}</div>
            <h3 class="font-serif text-lg text-white mb-3">${r.titulo}</h3>
            <p class="text-white/75 text-sm leading-relaxed">${r.texto}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
`

// ─── Testimonios ─────────────────────────────────────────
const testimoniosHTML = `
  <section class="py-20" aria-labelledby="testimonios-titulo">
    <div class="section-container">
      <span class="badge" data-aos="fade-up">Lo que dicen nuestras pacientes</span>
      <h2 class="section-title" id="testimonios-titulo" data-aos="fade-up" data-aos-delay="100">
        Testimonios reales
      </h2>
      <div class="swiper testimoniosSwiper mt-12" data-aos="fade-up" data-aos-delay="200">
        <div class="swiper-wrapper pb-12">
          ${testimoniosData.map(t => `
            <div class="swiper-slide">
              <div class="card p-8 h-full flex flex-col">
                <div class="flex items-center gap-1 mb-4">
                  ${renderStars(t.rating)}
                </div>
                <blockquote class="text-neutral-700 leading-relaxed flex-1 mb-6 text-sm italic">
                  "${t.texto}"
                </blockquote>
                <div class="flex items-center gap-3 mt-auto">
                  <div class="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    ${t.avatar}
                  </div>
                  <div>
                    <p class="font-semibold text-neutral-800 text-sm">${t.nombre}</p>
                    <p class="text-xs text-neutral-400">${t.procedimiento}</p>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </section>
`

// ─── CTA final ───────────────────────────────────────────
const ctaHTML = `
  <section class="py-20 bg-neutral-900" aria-labelledby="cta-titulo">
    <div class="section-container text-center">
      <span class="badge bg-brand-accent text-brand-primary" data-aos="fade-up">¿Lista para el cambio?</span>
      <h2 class="font-serif text-3xl md:text-4xl text-white mb-4" id="cta-titulo" data-aos="fade-up" data-aos-delay="100">
        Agenda tu consulta <span class="text-brand-gold">hoy mismo</span>
      </h2>
      <p class="text-neutral-400 max-w-lg mx-auto mb-8 text-sm" data-aos="fade-up" data-aos-delay="150">
        La primera consulta es gratuita. Te guiamos paso a paso para que tomes la mejor decisión.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
        <a href="${url('/pages/contacto.html')}" class="btn-gold text-base px-8 py-4">Agendar consulta gratuita</a>
        <a href="https://wa.me/51998471613?text=%C2%A1Hola%2C+quisiera+agendar+una+cita+con+ustedes%21" target="_blank" rel="noopener noreferrer"
           class="btn-secondary border-white text-white hover:bg-white hover:text-neutral-900 text-base px-8 py-4">
          WhatsApp directo
        </a>
      </div>
    </div>
  </section>
`

// ─── Render completo ─────────────────────────────────────
app.innerHTML = `
  ${renderNavbar('/')}
  <main>
    ${heroHTML}
    ${serviciosHTML}
    ${draHTML}
    ${cirugiasHTML}
    ${razonesHTML}
    ${testimoniosHTML}
    ${ctaHTML}
  </main>
  ${renderFooter()}
  ${renderWhatsAppFloat()}
`

// ─── Init JS ─────────────────────────────────────────────
initNavbar()
initAOS()

// Swiper testimonios
new Swiper('.testimoniosSwiper', {
  modules: [Navigation, Pagination, Autoplay],
  slidesPerView: 1,
  spaceBetween: 24,
  loop: true,
  autoplay: { delay: 5000, disableOnInteraction: false },
  pagination: { el: '.swiper-pagination', clickable: true },
  breakpoints: {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
})
