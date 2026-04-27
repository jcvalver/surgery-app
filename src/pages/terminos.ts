import '../style.css'
import { renderNavbar, initNavbar } from '../components/navbar'
import { renderFooter } from '../components/footer'
import { renderWhatsAppFloat, initAOS, url } from '../utils/helpers'

const app = document.getElementById('app')!

app.innerHTML = `
  ${renderNavbar('')}
  <main>

    <!-- Hero -->
    <section class="bg-brand-accent py-16">
      <div class="section-container">
        <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-neutral-500 text-sm mb-6">
          <a href="${url('/')}" class="hover:text-brand-primary transition-colors">Inicio</a>
          <span aria-hidden="true">›</span>
          <span class="text-neutral-800 font-medium">Términos de Uso</span>
        </nav>
        <h1 class="font-serif text-4xl md:text-5xl text-neutral-800" data-aos="fade-up">
          Términos de Uso
        </h1>
        <p class="text-neutral-500 mt-3 text-sm" data-aos="fade-up" data-aos-delay="100">
          Última actualización: abril 2026
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="py-16">
      <div class="section-container">
        <div class="max-w-3xl mx-auto" data-aos="fade-up">

          <div class="space-y-10 text-neutral-700 leading-relaxed">

            <div>
              <h2 class="font-serif text-2xl text-neutral-800 mb-3">1. Aceptación de los términos</h2>
              <p>
                Al acceder y utilizar el sitio web de <strong>Cirugía Plástica Valverde</strong>
                (en adelante, "el Sitio"), usted acepta íntegramente estos Términos de Uso. Si no está
                de acuerdo con alguna de las condiciones aquí expuestas, le rogamos que se abstenga de
                utilizar el Sitio.
              </p>
            </div>

            <div>
              <h2 class="font-serif text-2xl text-neutral-800 mb-3">2. Naturaleza informativa del Sitio</h2>
              <p>
                El contenido publicado en este Sitio tiene carácter <strong>exclusivamente informativo</strong>
                y no constituye en ningún caso un consejo, diagnóstico ni prescripción médica.
              </p>
              <p class="mt-2">
                Toda decisión relacionada con procedimientos estéticos o quirúrgicos debe tomarse previa
                consulta presencial con la Dra. Karen Valverde u otro profesional médico calificado.
              </p>
            </div>

            <div>
              <h2 class="font-serif text-2xl text-neutral-800 mb-3">3. Propiedad intelectual</h2>
              <p>
                Todos los contenidos del Sitio — textos, imágenes, logotipos, diseño gráfico y código —
                son propiedad de Cirugía Plástica Valverde o de sus respectivos autores y están protegidos
                por las leyes de propiedad intelectual aplicables.
              </p>
              <p class="mt-2">
                Queda prohibida su reproducción total o parcial, distribución, modificación o uso
                comercial sin autorización escrita previa.
              </p>
            </div>

            <div>
              <h2 class="font-serif text-2xl text-neutral-800 mb-3">4. Uso del formulario de contacto</h2>
              <p>Al utilizar el formulario de contacto, usted se compromete a:</p>
              <ul class="list-disc pl-6 mt-3 space-y-1">
                <li>Proporcionar información veraz y actualizada</li>
                <li>No enviar contenido spam, ofensivo o inapropiado</li>
                <li>No suplantar la identidad de terceros</li>
              </ul>
              <p class="mt-3">
                Nos reservamos el derecho de no responder mensajes que incumplan estas condiciones.
              </p>
            </div>

            <div>
              <h2 class="font-serif text-2xl text-neutral-800 mb-3">5. Limitación de responsabilidad</h2>
              <p>
                Cirugía Plástica Valverde no se responsabiliza de los daños que pudieran derivarse del
                uso incorrecto del Sitio, de la interpretación inadecuada de su contenido o de
                interrupciones en el servicio por causas técnicas ajenas a nuestra voluntad.
              </p>
              <p class="mt-2">
                Los resultados de los procedimientos pueden variar según las condiciones individuales
                de cada paciente. Las imágenes del Sitio son referenciales.
              </p>
            </div>

            <div>
              <h2 class="font-serif text-2xl text-neutral-800 mb-3">6. Enlaces externos</h2>
              <p>
                El Sitio puede contener enlaces a páginas de terceros (redes sociales, Google Maps, etc.).
                No nos hacemos responsables del contenido, políticas de privacidad ni prácticas de dichos
                sitios externos.
              </p>
            </div>

            <div>
              <h2 class="font-serif text-2xl text-neutral-800 mb-3">7. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de modificar estos Términos de Uso en cualquier momento.
                Los cambios entrarán en vigor desde su publicación en el Sitio. El uso continuado del
                Sitio tras las modificaciones implica la aceptación de los nuevos términos.
              </p>
            </div>

            <div>
              <h2 class="font-serif text-2xl text-neutral-800 mb-3">8. Legislación aplicable</h2>
              <p>
                Estos Términos de Uso se rigen por la legislación vigente de la
                <strong>República del Perú</strong>. Cualquier controversia que pudiera surgir se
                someterá a los tribunales competentes de la ciudad de Lima.
              </p>
            </div>

          </div>

          <div class="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center p-6 bg-brand-accent rounded-2xl">
            <p class="text-neutral-700 text-sm">¿Tiene alguna duda sobre estos términos?</p>
            <a href="${url('/pages/contacto.html')}" class="btn-primary flex-shrink-0">
              Contáctenos
            </a>
          </div>

          <p class="text-center text-sm text-neutral-400 mt-8">
            También puede revisar nuestra
            <a href="${url('/pages/privacidad.html')}" class="text-brand-primary hover:underline">
              Política de Privacidad
            </a>.
          </p>

        </div>
      </div>
    </section>

  </main>
  ${renderFooter()}
  ${renderWhatsAppFloat()}
`

initNavbar()
initAOS()
