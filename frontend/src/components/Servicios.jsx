import { useContent } from '../context/ContentContext'
import { AwardIcon, ClockIcon, CompassIcon, ShieldIcon, ToolsIcon } from './icons'
import Reveal from './Reveal'
import { sanitizeHtml } from '../utils/sanitizeHtml'

const ICONS = [CompassIcon, ShieldIcon, ToolsIcon, AwardIcon, ClockIcon]

const DEFAULT_SERVICES = [
  {
    title: 'Asesorías',
    text: 'Estudios de licitaciones, planificación y gestión de obras viales, aeroportuarias y de gran minería.',
  },
  {
    title: 'Asistencia técnica',
    text: 'Plantas de producción de áridos, plantas asfálticas y de hormigón, laboratorio vial y auditorías de obras.',
  },
  {
    title: 'Obras en aeropuertos y minería',
    text: 'Conservación y repavimentación de pistas, caminos de servicio y accesos en gran minería.',
  },
]

// Compatibilidad con sitios creados antes del editor dinámico de servicios,
// que guardaban hasta 3 servicios en campos sueltos (service_1_title, etc).
function legacyServices(content) {
  const list = [1, 2, 3]
    .map((n) => ({ title: content[`service_${n}_title`], text: content[`service_${n}_text`] }))
    .filter((s) => s.title || s.text)
  return list.length > 0 ? list : null
}

function parseServices(content) {
  if (content.services_json) {
    try {
      const parsed = JSON.parse(content.services_json)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    } catch {
      // ignorar JSON inválido y seguir con los siguientes fallbacks
    }
  }
  return legacyServices(content) || DEFAULT_SERVICES
}

export default function Servicios() {
  const { content } = useContent()
  const services = parseServices(content)

  return (
    <section id="servicios" className="bg-slate-50 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">
            Lo que hacemos
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Nuestros servicios
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-wrap justify-center gap-8">
          {services.map((s, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <Reveal
                key={i}
                delay={i * 120}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]"
              >
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-900/10">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-slate-950">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-slate-900">{s.title}</h3>
                  <div
                    className="rich-content mt-3 text-left leading-relaxed text-slate-600"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(s.text) }}
                  />
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
