import '../style.css'
import { renderNavbar, initNavbar } from '../components/navbar'
import { renderFooter } from '../components/footer'
import { renderWhatsAppFloat, initAOS, img } from '../utils/helpers'
import noInvasivos from '../data/no-invasivos.json'
import siteData from '../data/site.json'

const app = document.getElementById('app')!

app.innerHTML = `
  ${renderNavbar('/pages/no-invasivos.html')}
  <main>
    <section class="bg-blue-50 py-20">
      <div class="section-container text-center">
        <span class="badge" data-aos="fade-up">Tecnología avanzada</span>
        <h1 class="font-serif text-4xl md:text-5xl text-neutral-800 mb-4" data-aos="fade-up" data-aos-delay="100">
          Tratamientos No Invasivos
        </h1>
        <p class="text-neutral-600 max-w-2xl mx-auto text-lg" data-aos="fade-up" data-aos-delay="150">
          Lo último en tecnología estética para remodelar, reafirmar y rejuvenecer sin cirugía.
          Sin tiempo de recuperación, con resultados visibles desde la primera sesión.
        </p>
      </div>
    </section>

    <section class="py-20">
      <div class="section-container">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          ${(noInvasivos as Array<any>).slice().sort((a: any, b: any) => a.orden - b.orden).map((t, i) => `
          <article class="card overflow-hidden" data-aos="fade-up" data-aos-delay="${i * 150 + 100}">
            <div class="aspect-video overflow-hidden bg-brand-accent">
              <img src="${img((t as any).imagen)}" alt="${t.nombre}" loading="lazy"
                   width="800" height="450"
                   class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div class="p-8">
              <h2 class="font-serif text-2xl text-neutral-800 mb-3 text-center">${t.nombre}</h2>
              <p class="text-neutral-600 text-sm leading-relaxed mb-4 text-center">${t.descripcion}</p>
              <div class="bg-brand-accent rounded-xl p-4 mb-6">
                <p class="text-xs text-brand-primary font-semibold mb-1">Sesiones recomendadas:</p>
                <p class="text-sm text-neutral-700">${t.sesiones}</p>
              </div>
              <ul class="space-y-2 mb-6">
                ${t.beneficios.map((b: string) => `
                  <li class="text-sm text-neutral-700 flex items-center gap-2">
                    <svg class="w-4 h-4 text-brand-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    ${b}
                  </li>
                `).join('')}
              </ul>
              <a href="https://wa.me/${siteData.whatsapp}?text=%C2%A1Hola%2C+quisiera+agendar+una+cita+con+ustedes%21"
                 target="_blank" rel="noopener noreferrer"
                 class="btn-primary w-full justify-center">
                Consultar ahora
              </a>
            </div>
          </article>
          `).join('')}
        </div>
      </div>
    </section>
  </main>
  ${renderFooter()}
  ${renderWhatsAppFloat()}
`

initNavbar()
initAOS()
