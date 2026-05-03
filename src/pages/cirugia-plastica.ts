import '../style.css'
import { renderNavbar, initNavbar } from '../components/navbar'
import { renderFooter } from '../components/footer'
import { renderWhatsAppFloat, initAOS, img, url } from '../utils/helpers'
import cirugias from '../data/cirugias.json'
import siteData from '../data/site.json'

const app = document.getElementById('app')!

const heroHTML = `
  <section class="bg-brand-accent py-20" aria-labelledby="cirugia-titulo">
    <div class="section-container text-center">
      <span class="badge" data-aos="fade-up">Nuestros procedimientos</span>
      <h1 class="font-serif text-4xl md:text-5xl text-neutral-800 mb-4" id="cirugia-titulo" data-aos="fade-up" data-aos-delay="100">
        Cirugía Plástica
      </h1>
      <p class="text-neutral-600 max-w-2xl mx-auto text-lg" data-aos="fade-up" data-aos-delay="150">
        Procedimientos quirúrgicos de alta precisión realizados por la Dra. Karen Valverde con los más
        altos estándares de seguridad y tecnología para resultados naturales y duraderos.
      </p>
    </div>
  </section>
`

const listaHTML = `
  <section class="py-20" aria-label="Lista de procedimientos de cirugía plástica">
    <div class="section-container">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        ${(cirugias as Array<{orden:number;icon:string;nombre:string;descripcionCorta:string;recuperacion:string;slug:string;imagen:string}>).slice().sort((a,b) => a.orden - b.orden).map((c, i) => `
          <article class="card" data-aos="fade-up" data-aos-delay="${(i % 3) * 100 + 100}">
            <div class="aspect-video overflow-hidden bg-brand-accent">
              <img src="${img(c.imagen)}" alt="${c.nombre}" loading="lazy"
                   class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div class="p-6">
              <h2 class="font-serif text-xl text-neutral-800 mb-2">${c.nombre}</h2>
              <p class="text-neutral-600 text-sm leading-relaxed mb-3">${c.descripcionCorta}</p>
              <div class="text-xs text-neutral-500 flex items-center gap-1 mb-4">
                <svg class="w-4 h-4 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Recuperación: ${c.recuperacion}
              </div>
              <a href="${url('/pages/procedimientos/' + c.slug + '.html')}"
                 class="btn-primary w-full justify-center text-sm py-2.5">
                Ver detalle
              </a>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  </section>
`

const ctaHTML = `
  <section class="py-20 bg-brand-primary text-white">
    <div class="section-container text-center">
      <h2 class="font-serif text-3xl text-white mb-4" data-aos="fade-up">
        ¿Tienes dudas sobre algún procedimiento?
      </h2>
      <p class="text-white/80 mb-8 max-w-lg mx-auto" data-aos="fade-up" data-aos-delay="100">
        La primera consulta con la Dra. Valverde es gratuita. Te explicamos todo con detalle y sin compromiso.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
        <a href="${url('/pages/contacto.html')}" class="btn-gold px-8 py-4">Agendar consulta gratuita</a>
        <a href="https://wa.me/${siteData.whatsapp}" target="_blank" rel="noopener noreferrer"
           class="btn-secondary border-white text-white hover:bg-white hover:text-brand-primary px-8 py-4">
          WhatsApp directo
        </a>
      </div>
    </div>
  </section>
`

app.innerHTML = `
  ${renderNavbar('/pages/cirugia-plastica.html')}
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
