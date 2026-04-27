import '../style.css'
import { renderNavbar, initNavbar } from '../components/navbar'
import { renderFooter } from '../components/footer'
import { renderWhatsAppFloat, initAOS, img, url } from '../utils/helpers'
import tratamientos from '../data/medicina-estetica.json'
import siteData from '../data/site.json'

const app = document.getElementById('app')!

const heroHTML = `
  <section class="bg-pink-50 py-20" aria-labelledby="med-estetica-titulo">
    <div class="section-container text-center">
      <span class="badge" data-aos="fade-up">Sin cirugía</span>
      <h1 class="font-serif text-4xl md:text-5xl text-neutral-800 mb-4" id="med-estetica-titulo" data-aos="fade-up" data-aos-delay="100">
        Medicina Estética
      </h1>
      <p class="text-neutral-600 max-w-2xl mx-auto text-lg" data-aos="fade-up" data-aos-delay="150">
        Tratamientos no quirúrgicos para rejuvenecer, revitalizar y embellecer tu piel con resultados
        naturales y sin tiempo de recuperación significativo.
      </p>
    </div>
  </section>
`

const listaHTML = `
  <section class="py-20" aria-label="Lista de tratamientos de medicina estética">
    <div class="section-container">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        ${tratamientos.map((t, i) => `
          <article class="card overflow-hidden" data-aos="fade-up" data-aos-delay="${(i % 2) * 100 + 100}">
            <div class="aspect-video overflow-hidden bg-brand-accent">
              <img src="${img((t as any).imagen)}" alt="${t.nombre}" loading="lazy"
                   class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div class="p-8">
            <h2 class="font-serif text-xl text-neutral-800 mb-3">${t.nombre}</h2>
            <p class="text-neutral-600 text-sm leading-relaxed mb-4">${t.descripcion}</p>
            <div class="text-xs text-neutral-500 flex items-center gap-1 mb-2">
              <svg class="w-4 h-4 text-brand-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              ${t.sesiones}
            </div>
            <ul class="space-y-1 mt-4 mb-6">
              ${t.beneficios.map(b => `
                <li class="text-xs text-neutral-600 flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-brand-primary flex-shrink-0"></span>
                  ${b}
                </li>
              `).join('')}
            </ul>
            <a href="${url('/pages/tratamientos/' + t.slug + '.html')}" class="btn-primary w-full justify-center text-sm py-2.5">
              Ver más
            </a>            </div>          </article>
        `).join('')}
      </div>
    </div>
  </section>
`

const ctaHTML = `
  <section class="py-20 bg-brand-accent">
    <div class="section-container text-center">
      <h2 class="font-serif text-3xl text-neutral-800 mb-4" data-aos="fade-up">
        ¿Cuál tratamiento es el ideal para ti?
      </h2>
      <p class="text-neutral-600 mb-8 max-w-lg mx-auto" data-aos="fade-up" data-aos-delay="100">
        Agenda una consulta y la Dra. Valverde diseñará un plan personalizado según tus necesidades.
      </p>
      <a href="https://wa.me/${siteData.whatsapp}?text=Hola%2C+quiero+consultar+sobre+medicina+est%C3%A9tica"
         target="_blank" rel="noopener noreferrer"
         class="btn-primary px-8 py-4" data-aos="fade-up" data-aos-delay="200">
        Consultar por WhatsApp
      </a>
    </div>
  </section>
`

app.innerHTML = `
  ${renderNavbar('/pages/medicina-estetica.html')}
  <main>
    ${heroHTML}
    ${listaHTML}
    ${ctaHTML}
  </main>
  ${renderFooter()}
  ${renderWhatsAppFloat()}
`

initNavbar()
initAOS()
