import '../style.css'
import { renderNavbar, initNavbar } from '../components/navbar'
import { renderFooter } from '../components/footer'
import { renderWhatsAppFloat, initAOS, url } from '../utils/helpers'
import siteData from '../data/site.json'
import emailjs from '@emailjs/browser'

const app = document.getElementById('app')!

app.innerHTML = `
  ${renderNavbar('/pages/contacto.html')}
  <main>
    <!-- Hero -->
    <section class="bg-brand-accent py-16">
      <div class="section-container text-center">
        <span class="badge" data-aos="fade-up">Estamos para ayudarte</span>
        <h1 class="font-serif text-4xl md:text-5xl text-neutral-800 mb-4" data-aos="fade-up" data-aos-delay="100">
          Contacto
        </h1>
        <p class="text-neutral-600 max-w-xl mx-auto text-lg" data-aos="fade-up" data-aos-delay="150">
          Agenda tu consulta gratuita o escríbenos con cualquier consulta.
          Respondemos en menos de 24 horas.
        </p>
      </div>
    </section>

    <!-- Contenido principal -->
    <section class="py-20">
      <div class="section-container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">

          <!-- Formulario -->
          <div data-aos="fade-right">
            <h2 class="font-serif text-2xl text-neutral-800 mb-6">Envíanos un mensaje</h2>
            <form id="contactForm" novalidate class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label for="nombre" class="block text-sm font-medium text-neutral-700 mb-1.5">
                    Nombre completo <span class="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input type="text" id="nombre" name="nombre" autocomplete="name"
                         class="form-input" placeholder="Tu nombre" required
                         aria-required="true" />
                  <p class="text-red-500 text-xs mt-1 hidden" id="nombre-error" role="alert">Por favor ingresa tu nombre.</p>
                </div>
                <div>
                  <label for="telefono" class="block text-sm font-medium text-neutral-700 mb-1.5">
                    Teléfono / WhatsApp <span class="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input type="tel" id="telefono" name="telefono" autocomplete="tel"
                         class="form-input" placeholder="+51 999 999 999" required
                         aria-required="true" pattern="[0-9+\\s\\-]{7,15}" />
                  <p class="text-red-500 text-xs mt-1 hidden" id="telefono-error" role="alert">Ingresa un teléfono válido.</p>
                </div>
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-neutral-700 mb-1.5">
                  Correo electrónico <span class="text-red-500" aria-hidden="true">*</span>
                </label>
                <input type="email" id="email" name="email" autocomplete="email"
                       class="form-input" placeholder="tucorreo@email.com" required
                       aria-required="true" />
                <p class="text-red-500 text-xs mt-1 hidden" id="email-error" role="alert">Ingresa un email válido.</p>
              </div>
              <div>
                <label for="servicio" class="block text-sm font-medium text-neutral-700 mb-1.5">
                  Servicio de interés
                </label>
                <select id="servicio" name="servicio" class="form-input">
                  <option value="">Selecciona un servicio (opcional)</option>
                  <optgroup label="Cirugía Plástica">
                    <option>Rinoplastia</option>
                    <option>Mamoplastia</option>
                    <option>Lipoescultura</option>
                    <option>Lipoabdominoplastia</option>
                    <option>Lipomarcación Abdominal</option>
                    <option>Lipotransferencia de Glúteos</option>
                    <option>Implante de Glúteos</option>
                    <option>Blefaroplastia</option>
                    <option>Otoplastia</option>
                    <option>Bichectomía</option>
                    <option>Afinamiento Facial</option>
                    <option>Ginecomastia</option>
                  </optgroup>
                  <optgroup label="Medicina Estética">
                    <option>Plasma Rico en Plaquetas</option>
                    <option>Ácido Hialurónico</option>
                    <option>Vitamina C</option>
                    <option>Toxina Botulínica</option>
                  </optgroup>
                  <optgroup label="No Invasivos">
                    <option>Depilación Láser</option>
                    <option>Exilis Ultra 360</option>
                  </optgroup>
                </select>
              </div>
              <div>
                <label for="mensaje" class="block text-sm font-medium text-neutral-700 mb-1.5">
                  Mensaje <span class="text-red-500" aria-hidden="true">*</span>
                </label>
                <textarea id="mensaje" name="mensaje" rows="4"
                          class="form-input resize-none" placeholder="Cuéntanos cómo podemos ayudarte..." required
                          aria-required="true"></textarea>
                <p class="text-red-500 text-xs mt-1 hidden" id="mensaje-error" role="alert">Por favor escribe tu mensaje.</p>
              </div>

              <!-- LGPD / Privacidad -->
              <div class="flex items-start gap-3">
                <input type="checkbox" id="privacidad" name="privacidad" required
                       class="mt-1 w-4 h-4 accent-brand-primary cursor-pointer flex-shrink-0" />
                <label for="privacidad" class="text-xs text-neutral-600 cursor-pointer">
                  He leído y acepto la
                  <a href="${url('/pages/privacidad.html')}" class="text-brand-primary underline hover:no-underline">Política de Privacidad</a>.
                  Mis datos serán usados únicamente para responder a mi consulta.
                  <span class="text-red-500" aria-hidden="true">*</span>
                </label>
              </div>
              <p class="text-red-500 text-xs hidden" id="privacidad-error" role="alert">Debes aceptar la política de privacidad.</p>

              <button type="submit" id="submitBtn" class="btn-primary w-full justify-center py-4 text-base">
                <span id="btnText">Enviar mensaje</span>
                <span id="btnLoading" class="hidden">Enviando...</span>
              </button>

              <!-- Feedback -->
              <div id="formSuccess" class="hidden bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 text-sm text-center" role="status">
                ✅ ¡Mensaje enviado! Te contactaremos muy pronto.
              </div>
              <div id="formError" class="hidden bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 text-sm text-center" role="alert">
                ❌ Ocurrió un error. Por favor contáctanos por WhatsApp.
              </div>
            </form>
          </div>

          <!-- Info de contacto -->
          <div data-aos="fade-left" data-aos-delay="150" class="space-y-8">
            <div>
              <h2 class="font-serif text-2xl text-neutral-800 mb-6">Información de contacto</h2>
              <div class="space-y-4">
                <a href="tel:${siteData.phone}" class="flex items-center gap-4 p-4 rounded-xl hover:bg-brand-accent transition-colors group">
                  <div class="w-12 h-12 rounded-xl bg-brand-accent group-hover:bg-brand-primary/10 flex items-center justify-center flex-shrink-0 transition-colors">
                    <svg class="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-neutral-400 font-medium uppercase tracking-wide">Teléfono</p>
                    <p class="text-neutral-800 font-medium">${siteData.phone}</p>
                  </div>
                </a>
                <a href="mailto:${siteData.email}" class="flex items-center gap-4 p-4 rounded-xl hover:bg-brand-accent transition-colors group">
                  <div class="w-12 h-12 rounded-xl bg-brand-accent group-hover:bg-brand-primary/10 flex items-center justify-center flex-shrink-0 transition-colors">
                    <svg class="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-neutral-400 font-medium uppercase tracking-wide">Email</p>
                    <p class="text-neutral-800 font-medium">${siteData.email}</p>
                  </div>
                </a>
                <a href="https://wa.me/${siteData.whatsapp}?text=%C2%A1Hola%2C+quisiera+agendar+una+cita+con+ustedes%21" target="_blank" rel="noopener noreferrer"
                   class="flex items-center gap-4 p-4 rounded-xl hover:bg-green-50 transition-colors group">
                  <div class="w-12 h-12 rounded-xl bg-green-50 group-hover:bg-green-100 flex items-center justify-center flex-shrink-0 transition-colors">
                    <svg class="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-neutral-400 font-medium uppercase tracking-wide">WhatsApp</p>
                    <p class="text-neutral-800 font-medium">Respuesta inmediata</p>
                  </div>
                </a>
              </div>
            </div>

            <!-- Sedes -->
            <div>
              <h3 class="font-serif text-xl text-neutral-800 mb-4">Nuestras sedes</h3>
              <div class="space-y-4">
                ${(siteData.sedes as Array<{nombre:string;direccion:string;mapsUrl:string}>).map(sede => `
                  <div class="card p-5">
                    <p class="font-semibold text-neutral-800 text-sm mb-1">${sede.nombre}</p>
                    <a href="${sede.mapsUrl}" target="_blank" rel="noopener noreferrer"
                       class="text-sm text-neutral-500 hover:text-brand-primary transition-colors flex items-start gap-2">
                      <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      ${sede.direccion}
                    </a>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  ${renderFooter()}
  ${renderWhatsAppFloat()}
`

initNavbar()
initAOS()

// ─── Formulario con EmailJS ───────────────────────────────
// IMPORTANT: Reemplaza con tus credenciales reales de EmailJS
const EMAILJS_SERVICE_ID  = 'service_qwyunmj'
const EMAILJS_TEMPLATE_ID = 'template_as1dwk3'
const EMAILJS_PUBLIC_KEY  = 'HtQKduj874gJKcnKp'

const form = document.getElementById('contactForm') as HTMLFormElement
const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement
const btnText = document.getElementById('btnText')!
const btnLoading = document.getElementById('btnLoading')!
const formSuccess = document.getElementById('formSuccess')!
const formError = document.getElementById('formError')!

function showError(fieldId: string, show: boolean): void {
  const el = document.getElementById(`${fieldId}-error`)
  const input = document.getElementById(fieldId)
  if (!el || !input) return
  el.classList.toggle('hidden', !show)
  input.classList.toggle('border-red-400', show)
}

function validateForm(): boolean {
  let valid = true
  const nombre = (document.getElementById('nombre') as HTMLInputElement).value.trim()
  const telefono = (document.getElementById('telefono') as HTMLInputElement).value.trim()
  const email = (document.getElementById('email') as HTMLInputElement).value.trim()
  const mensaje = (document.getElementById('mensaje') as HTMLTextAreaElement).value.trim()
  const privacidad = (document.getElementById('privacidad') as HTMLInputElement).checked

  showError('nombre', !nombre)
  if (!nombre) valid = false

  showError('telefono', !telefono || !/^[0-9+\s\-]{7,15}$/.test(telefono))
  if (!telefono || !/^[0-9+\s\-]{7,15}$/.test(telefono)) valid = false

  showError('email', !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) valid = false

  showError('mensaje', !mensaje)
  if (!mensaje) valid = false

  const privEl = document.getElementById('privacidad-error')!
  privEl.classList.toggle('hidden', privacidad)
  if (!privacidad) valid = false

  return valid
}

emailjs.init(EMAILJS_PUBLIC_KEY)

form?.addEventListener('submit', async (e) => {
  e.preventDefault()
  if (!validateForm()) return

  submitBtn.disabled = true
  btnText.classList.add('hidden')
  btnLoading.classList.remove('hidden')
  formSuccess.classList.add('hidden')
  formError.classList.add('hidden')

  try {
    const nombre = (document.getElementById('nombre') as HTMLInputElement).value.trim()
    const telefono = (document.getElementById('telefono') as HTMLInputElement).value.trim()
    const email = (document.getElementById('email') as HTMLInputElement).value.trim()
    const servicio = (document.getElementById('servicio') as HTMLSelectElement).value
    const mensaje = (document.getElementById('mensaje') as HTMLTextAreaElement).value.trim()

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name: nombre,
      from_phone: telefono,
      from_email: email,
      servicio: servicio || 'No especificado',
      message: mensaje,
    })

    formSuccess.classList.remove('hidden')
    form.reset()
  } catch {
    formError.classList.remove('hidden')
  } finally {
    submitBtn.disabled = false
    btnText.classList.remove('hidden')
    btnLoading.classList.add('hidden')
  }
})
