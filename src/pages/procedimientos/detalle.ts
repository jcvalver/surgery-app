import '../../style.css'
import { renderNavbar, initNavbar } from '../../components/navbar'
import { renderFooter } from '../../components/footer'
import { renderWhatsAppFloat, initAOS, img, url } from '../../utils/helpers'
import cirugias from '../../data/cirugias.json'
import siteData from '../../data/site.json'

interface Cirugia {
  id: string
  nombre: string
  categoria: string
  slug: string
  descripcionCorta: string
  descripcion: string
  beneficios: string[]
  candidatos: string
  recuperacion: string
  imagen: string
  icon: string
}

const app = document.getElementById('app')!
const slug = app.dataset.slug ?? ''
const cirugia = (cirugias as Cirugia[]).find(c => c.slug === slug)

if (!cirugia) {
  window.location.replace(url('/pages/cirugia-plastica.html'))
} else {
  document.title = `${cirugia.nombre} | Cirugía Plástica Valverde – Lima, Perú`

  const waMsg = encodeURIComponent('¡Hola, quisiera agendar una cita con ustedes!')

  app.innerHTML = `
    ${renderNavbar('/pages/cirugia-plastica.html')}
    <main>

      <!-- Hero -->
      <section class="relative h-72 md:h-[28rem] overflow-hidden" aria-labelledby="proc-titulo">
        <img src="${img(cirugia.imagen)}" alt="${cirugia.nombre}"
             class="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div class="absolute inset-0 bg-gradient-to-r from-brand-primary/90 via-brand-primary/70 to-brand-secondary/40"></div>
        <div class="relative z-10 section-container h-full flex flex-col justify-end pb-10">
          <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-white/70 text-sm mb-4 flex-wrap">
            <a href="${url('/')}" class="hover:text-white transition-colors">Inicio</a>
            <span aria-hidden="true">›</span>
            <a href="${url('/pages/cirugia-plastica.html')}" class="hover:text-white transition-colors">Cirugía Plástica</a>
            <span aria-hidden="true">›</span>
            <span class="text-white font-medium">${cirugia.nombre}</span>
          </nav>
          <h1 class="font-serif text-3xl md:text-5xl text-white font-bold leading-tight" id="proc-titulo">
            ${cirugia.nombre}
          </h1>
          <p class="text-white/85 text-base md:text-lg mt-3 max-w-2xl leading-relaxed">
            ${cirugia.descripcionCorta}
          </p>
        </div>
      </section>

      <!-- Content grid -->
      <section class="py-16 lg:py-20">
        <div class="section-container">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            <!-- Main -->
            <div class="lg:col-span-2 space-y-12">

              <!-- Descripción -->
              <div data-aos="fade-up">
                <h2 class="font-serif text-2xl md:text-3xl text-neutral-800 mb-4">
                  ¿Qué es la ${cirugia.nombre}?
                </h2>
                <p class="text-neutral-600 leading-relaxed text-lg">${cirugia.descripcion}</p>
              </div>

              <!-- Beneficios -->
              <div data-aos="fade-up" data-aos-delay="100">
                <h2 class="font-serif text-2xl md:text-3xl text-neutral-800 mb-6">Beneficios</h2>
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  ${cirugia.beneficios.map(b => `
                    <li class="flex items-start gap-3 bg-brand-accent rounded-xl p-4">
                      <svg class="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                      <span class="text-neutral-700 text-sm leading-relaxed">${b}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <!-- Imagen adicional -->
              <div class="rounded-3xl overflow-hidden aspect-video shadow-lg" data-aos="fade-up" data-aos-delay="150">
                <img src="${img(cirugia.imagen)}" alt="${cirugia.nombre} en Lima – Dra. Karen Valverde"
                     class="w-full h-full object-cover" loading="lazy" />
              </div>

            </div>

            <!-- Sidebar -->
            <aside class="space-y-6" data-aos="fade-left" data-aos-delay="200">

              <!-- Candidatos -->
              <div class="card p-6">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-xl bg-brand-accent flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <h3 class="font-semibold text-neutral-800">¿Quién es candidato?</h3>
                </div>
                <p class="text-neutral-600 text-sm leading-relaxed">${cirugia.candidatos}</p>
              </div>

              <!-- Recuperación -->
              <div class="card p-6">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-xl bg-brand-accent flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 class="font-semibold text-neutral-800">Recuperación</h3>
                </div>
                <p class="text-neutral-600 text-sm leading-relaxed">${cirugia.recuperacion}</p>
              </div>

              <!-- CTA card -->
              <div class="bg-brand-primary rounded-2xl p-6 text-white text-center">
                <h3 class="font-serif text-xl mb-2">¿Te interesa?</h3>
                <p class="text-white/80 text-sm mb-6 leading-relaxed">
                  Agenda una consulta con la Dra. Karen Valverde y recibe una evaluación personalizada.
                </p>
                <a href="${url('/pages/contacto.html')}"
                   class="btn-gold w-full justify-center mb-3">
                  Agendar consulta
                </a>
                <a href="https://wa.me/${siteData.whatsapp}?text=${waMsg}"
                   target="_blank" rel="noopener noreferrer"
                   class="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-colors">
                  <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Consultar por WhatsApp
                </a>
              </div>

              <!-- Back -->
              <a href="${url('/pages/cirugia-plastica.html')}"
                 class="flex items-center gap-2 text-brand-primary hover:text-brand-secondary font-medium text-sm transition-colors">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Ver todos los procedimientos
              </a>

            </aside>
          </div>
        </div>
      </section>

      <!-- Bottom CTA -->
      <section class="bg-brand-accent py-16">
        <div class="section-container text-center" data-aos="fade-up">
          <h2 class="font-serif text-3xl md:text-4xl text-neutral-800 mb-4">
            Da el primer paso
          </h2>
          <p class="text-neutral-600 max-w-xl mx-auto mb-8 leading-relaxed">
            Una consulta personalizada es el primer paso para conocer si este procedimiento es el ideal para ti.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="${url('/pages/contacto.html')}" class="btn-primary px-8 py-4">
              Agendar consulta gratuita
            </a>
            <a href="https://wa.me/${siteData.whatsapp}?text=${waMsg}"
               target="_blank" rel="noopener noreferrer"
               class="btn-secondary px-8 py-4">
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>

    </main>
    ${renderFooter()}
    ${renderWhatsAppFloat(`Hola, quiero información sobre ${cirugia.nombre}`)}
  `

  initNavbar()
  initAOS()

  // JSON-LD MedicalProcedure
  const ld = document.createElement('script')
  ld.type = 'application/ld+json'
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: cirugia.nombre,
    description: cirugia.descripcion,
    url: `https://jcvalver.github.io/surgery-app${window.location.pathname}`,
    procedureType: 'Surgical',
    followup: cirugia.recuperacion,
    provider: {
      '@type': 'MedicalBusiness',
      name: 'Cirugía Plástica Valverde',
      url: 'https://jcvalver.github.io/surgery-app/'
    }
  })
  document.head.appendChild(ld)
}
