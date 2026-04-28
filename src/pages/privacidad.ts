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
          <span class="text-neutral-800 font-medium">Política de Privacidad</span>
        </nav>
        <h1 class="font-serif text-4xl md:text-5xl text-neutral-800" data-aos="fade-up">
          Política de Privacidad
        </h1>
        <p class="text-neutral-500 mt-3 text-sm" data-aos="fade-up" data-aos-delay="100">
          Última actualización: abril 2026
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="py-16">
      <div class="section-container">
        <div class="max-w-3xl mx-auto prose prose-neutral" data-aos="fade-up">

          <div class="space-y-10 text-neutral-700 leading-relaxed">

            <div>
              <h2 class="font-serif text-2xl text-neutral-800 mb-3">1. Responsable del tratamiento</h2>
              <p>
                <strong>Cirugía Plástica Valverde</strong>, a cargo de la Dra. Karen Valverde, con consultorios
                en Pueblo Libre – Lima, Perú, es la entidad responsable
                del tratamiento de los datos personales recabados a través de este sitio web.
              </p>
              <p class="mt-2">
                Contacto: <a href="mailto:cirugiaplasticavalverde@gmail.com"
                  class="text-brand-primary hover:underline">cirugiaplasticavalverde@gmail.com</a>
              </p>
            </div>

            <div>
              <h2 class="font-serif text-2xl text-neutral-800 mb-3">2. Datos que recopilamos</h2>
              <p>Recopilamos únicamente los datos que usted nos proporciona de forma voluntaria a través del formulario de contacto:</p>
              <ul class="list-disc pl-6 mt-3 space-y-1">
                <li>Nombre completo</li>
                <li>Número de teléfono</li>
                <li>Dirección de correo electrónico</li>
                <li>Servicio de interés</li>
                <li>Mensaje o consulta</li>
              </ul>
              <p class="mt-3">
                No recopilamos datos sensibles de salud a través de este formulario. Cualquier información
                médica se gestiona directamente en consulta bajo estrictas normas de confidencialidad.
              </p>
            </div>

            <div>
              <h2 class="font-serif text-2xl text-neutral-800 mb-3">3. Finalidad del tratamiento</h2>
              <p>Sus datos se utilizan exclusivamente para:</p>
              <ul class="list-disc pl-6 mt-3 space-y-1">
                <li>Responder a su consulta o solicitud de cita</li>
                <li>Brindar información sobre nuestros procedimientos y servicios</li>
                <li>Coordinar la atención médica solicitada</li>
              </ul>
              <p class="mt-3">
                No utilizamos sus datos para envío de publicidad masiva sin su consentimiento previo.
              </p>
            </div>

            <div>
              <h2 class="font-serif text-2xl text-neutral-800 mb-3">4. Base legal</h2>
              <p>
                El tratamiento de sus datos se fundamenta en su consentimiento explícito al enviar el
                formulario de contacto, de conformidad con la <strong>Ley N° 29733</strong> – Ley de
                Protección de Datos Personales del Perú y su Reglamento (D.S. N° 003-2013-JUS).
              </p>
            </div>

            <div>
              <h2 class="font-serif text-2xl text-neutral-800 mb-3">5. Compartición de datos</h2>
              <p>
                Sus datos personales <strong>no se venden, alquilan ni ceden</strong> a terceros. Únicamente
                pueden ser accedidos por el personal autorizado de la clínica directamente involucrado en
                su atención.
              </p>
              <p class="mt-2">
                Utilizamos <strong>EmailJS</strong> como servicio de envío de formularios. Esta plataforma
                procesa el mensaje de forma transitoria para su entrega y no almacena sus datos de forma permanente.
              </p>
            </div>

            <div>
              <h2 class="font-serif text-2xl text-neutral-800 mb-3">6. Conservación de datos</h2>
              <p>
                Los datos enviados a través del formulario se conservan en nuestra bandeja de correo
                únicamente durante el tiempo necesario para gestionar su consulta. Puede solicitarnos
                su eliminación en cualquier momento.
              </p>
            </div>

            <div>
              <h2 class="font-serif text-2xl text-neutral-800 mb-3">7. Sus derechos</h2>
              <p>De acuerdo con la Ley N° 29733, usted tiene derecho a:</p>
              <ul class="list-disc pl-6 mt-3 space-y-1">
                <li><strong>Acceso:</strong> conocer qué datos suyos tenemos</li>
                <li><strong>Rectificación:</strong> corregir datos inexactos</li>
                <li><strong>Cancelación:</strong> solicitar la eliminación de sus datos</li>
                <li><strong>Oposición:</strong> oponerse al tratamiento de sus datos</li>
              </ul>
              <p class="mt-3">
                Para ejercer estos derechos, escríbanos a
                <a href="mailto:cirugiaplasticavalverde@gmail.com"
                   class="text-brand-primary hover:underline">cirugiaplasticavalverde@gmail.com</a>
                indicando el derecho que desea ejercer.
              </p>
            </div>

            <div>
              <h2 class="font-serif text-2xl text-neutral-800 mb-3">8. Cookies</h2>
              <p>
                Este sitio web no utiliza cookies de seguimiento ni publicidad. Las únicas cookies
                presentes son técnicas, necesarias para el correcto funcionamiento del sitio, y no
                requieren consentimiento.
              </p>
            </div>

            <div>
              <h2 class="font-serif text-2xl text-neutral-800 mb-3">9. Cambios en esta política</h2>
              <p>
                Nos reservamos el derecho de actualizar esta política cuando sea necesario. La fecha
                de última actualización se indica al inicio de este documento.
              </p>
            </div>

          </div>

          <div class="mt-12 p-6 bg-brand-accent rounded-2xl text-center">
            <p class="text-neutral-700 mb-4">¿Tiene preguntas sobre el uso de sus datos?</p>
            <a href="${url('/pages/contacto.html')}" class="btn-primary">
              Contáctenos
            </a>
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
