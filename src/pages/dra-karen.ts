import '../style.css'
import { renderNavbar, initNavbar } from '../components/navbar'
import { renderFooter } from '../components/footer'
import { renderWhatsAppFloat, initAOS, img, url } from '../utils/helpers'

const app = document.getElementById('app')!

app.innerHTML = `
  ${renderNavbar('/pages/dra-karen.html')}
  <main>
    <!-- Hero -->
    <section class="bg-brand-accent py-20" aria-labelledby="dra-titulo">
      <div class="section-container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right">
            <div class="relative max-w-sm mx-auto lg:mx-0">
              <div class="aspect-[3/4] rounded-3xl overflow-hidden bg-brand-primary/10">
                <img src="${img('/assets/images/vida_mas/karen-valverde_doc.png')}"
                     alt="Dra. Karen Valverde – Cirujana Plástica y Estética en Lima"
                     class="w-full h-full object-cover" loading="eager" />
              </div>
              <div class="absolute -bottom-4 -right-4 bg-white rounded-2xl px-6 py-4 shadow-xl" data-aos="zoom-in" data-aos-delay="400">
                <p class="font-serif text-3xl text-brand-primary font-bold">+10</p>
                <p class="text-xs text-neutral-500 font-medium">años de experiencia</p>
              </div>
            </div>
          </div>
          <div data-aos="fade-left" data-aos-delay="150">
            <span class="badge">Conoce a tu cirujana</span>
            <h1 class="font-serif text-4xl md:text-5xl text-neutral-800 mb-2" id="dra-titulo">Dra. Karen Valverde</h1>
            <p class="text-brand-primary font-semibold mb-1">Cirujana Plástica, Estética y Reconstructiva.</p>
            <p class="text-brand-primary font-semibold mb-6">C.M.P. 66516 - R.N.E. 36844 </p>
            <p class="text-neutral-600 leading-relaxed mb-4">
              Con más de 10 años de experiencia dedicados a la cirugía plástica, la Dra. Karen Valverde
              es reconocida en Lima por su enfoque personalizado, técnica precisa y resultados naturales
              que priorizan siempre la seguridad y bienestar del paciente.
            </p>
            <p class="text-neutral-600 leading-relaxed mb-6">
              Su formación incluye una especialización en el Perú y múltiples cursos internacionales en
              técnicas avanzadas de cirugía de alta definición, rejuvenecimiento facial y procedimientos
              reconstructivos, manteniéndose permanentemente actualizada con las últimas tendencias mundiales.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Formación y credenciales -->
    <section class="py-20" aria-labelledby="formacion-titulo">
      <div class="section-container">
        <h2 class="section-title" id="formacion-titulo" data-aos="fade-up">Formación y credenciales</h2>
        <p class="section-subtitle" data-aos="fade-up" data-aos-delay="100">
          Una trayectoria de excelencia respaldada por instituciones de primer nivel.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          ${[
            { año: '2014', titulo: 'Premio Tumi de Oro – Primer puesto durante los 7 años de carrera de Medicina', inst: 'Universidad Nacional de Trujillo – UNT' },
            { año: '2015', titulo: 'Especialización en Cirugía Plástica y Reconstructiva', inst: 'Hospital E. Rebagliati – HNERM, Hospital Nacional de Referencia más Grande del País' },
            { año: '2015', titulo: 'Primer puesto de ingreso de segunda especialización a nivel nacional', inst: 'Universidad Nacional Mayor de San Marcos – UNMSM' },
            { año: '2018', titulo: 'Miembro de la Sociedad Americana de Cirujanos Plásticos', inst: 'ASPS – American Society of Plastic Surgeons' },
            { año: '2018', titulo: 'Miembro de la Sociedad Internacional de Cirugía Plástica y Estética', inst: 'ISAPS – International Society of Aesthetic Plastic Surgery' },
            { año: '2019', titulo: 'Capacitación en Rejuvenecimiento Facial', inst: 'Hospital D\'Or Niterói – a cargo del Dr. Ronaldo Pontes, Brasil' },
            { año: '2019', titulo: 'Capacitación en Contorno Corporal', inst: 'Hospital Andaraí – a cargo del Dr. Carlos Roxo, Brasil' },
            { año: '2020', titulo: 'Capacitación en Cirugía Estética de la Mama', inst: 'Instituto Ivo Pitanguy – Brasil' },
            { año: '2021', titulo: 'Capacitación Internacional en Rinoplastia', inst: 'A cargo del Dr. Rod Rohrich – Dallas, EEUU' },
            { año: '2022', titulo: 'Capacitación Internacional en Rinoplastia – Técnica Rinofast', inst: 'A cargo del Dr. Héctor Marín – México' },
            { año: '2023', titulo: 'Capacitación en Medicina Estética', inst: 'Universidad de Buenos Aires – UBA, Argentina' },
          ].map((item, i) => `
            <div class="card p-6 flex items-start gap-4" data-aos="fade-up" data-aos-delay="${(i % 2) * 100 + 100}">
              <div class="w-14 h-14 rounded-xl bg-brand-accent flex items-center justify-center flex-shrink-0">
                <span class="text-brand-primary font-bold text-xs text-center leading-tight">${item.año}</span>
              </div>
              <div>
                <p class="font-semibold text-neutral-800 text-sm">${item.titulo}</p>
                <p class="text-neutral-500 text-xs mt-1">${item.inst}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Especialidades -->
    <section class="py-20 bg-neutral-50" aria-labelledby="especialidades-titulo">
      <div class="section-container">
        <h2 class="section-title" id="especialidades-titulo" data-aos="fade-up">Áreas de especialidad</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          ${[
            { icon: '👃', label: 'Cirugía Facial' },
            { icon: '💪', label: 'Cirugía Corporal' },
            { icon: '✨', label: 'Cirugía de Senos' },
            { icon: '🩸', label: 'Medicina Estética' },
            { icon: '⚡', label: 'No Invasivos' },
            { icon: '🔬', label: 'Alta Definición' },
            { icon: '🌿', label: 'Reconstructiva' },
            { icon: '💉', label: 'Rellenos y Botox' },
          ].map((e, i) => `
            <div class="card p-6 text-center" data-aos="zoom-in" data-aos-delay="${(i % 4) * 80 + 100}">
              <div class="text-4xl mb-3">${e.icon}</div>
              <p class="text-sm font-medium text-neutral-700">${e.label}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-brand-primary text-white">
      <div class="section-container text-center">
        <h2 class="font-serif text-3xl text-white mb-4" data-aos="fade-up">
          Agenda tu consulta con la Dra. Valverde
        </h2>
        <p class="text-white/80 mb-8 max-w-lg mx-auto" data-aos="fade-up" data-aos-delay="100">
          La primera consulta es gratuita. Conoce a la Dra. Valverde y resuelve todas tus dudas sin compromiso.
        </p>
        <a href="${url('/pages/contacto.html')}" class="btn-gold px-8 py-4" data-aos="fade-up" data-aos-delay="200">
          Agendar consulta gratuita
        </a>
      </div>
    </section>
  </main>
  ${renderFooter()}
  ${renderWhatsAppFloat()}
`

initNavbar()
initAOS()
