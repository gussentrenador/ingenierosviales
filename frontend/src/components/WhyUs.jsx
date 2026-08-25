import { useContent } from '../context/ContentContext'
import Reveal from './Reveal'
import { AwardIcon, CompassIcon, ShieldIcon, ToolsIcon } from './icons'
import { sanitizeHtml } from '../utils/sanitizeHtml'
import { cardWidthClass } from '../utils/adaptiveGrid'

const ICONS = [AwardIcon, CompassIcon, ShieldIcon, ToolsIcon]

const DEFAULT_PILLARS = [
  {
    title: 'Más de 30 años de experiencia',
    text: 'En carreteras, puentes y aeropuertos, en el sector público y privado.',
  },
  {
    title: 'Áreas de especialización',
    text: 'Obras viales, aeropuertos y gran minería: movimientos de tierra, pavimentos y plantas de producción.',
  },
  {
    title: 'Amplia red de gestión',
    text: 'Contactos con Empresas Concesionarias, Dirección de Vialidad, aeropuertos, constructoras y transportistas.',
  },
  {
    title: 'Asesoría y asistencia técnica',
    text: 'Estudios de licitaciones, planificación de obras, laboratorio vial y auditorías.',
  },
]

// Compatibilidad con sitios creados antes del editor dinámico de puntos,
// que guardaban hasta 4 puntos en campos sueltos (whyus_pillar_1_title, etc).
function legacyPillars(content) {
  const list = [1, 2, 3, 4]
    .map((n) => ({ title: content[`whyus_pillar_${n}_title`], text: content[`whyus_pillar_${n}_text`] }))
    .filter((p) => p.title || p.text)
  return list.length > 0 ? list : null
}

function parsePillars(content) {
  if (content.whyus_pillars_json) {
    try {
      const parsed = JSON.parse(content.whyus_pillars_json)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    } catch {
      // ignorar JSON inválido y seguir con los siguientes fallbacks
    }
  }
  return legacyPillars(content) || DEFAULT_PILLARS
}

export default function WhyUs() {
  const { content } = useContent()
  if (content.show_whyus === '0') return null

  const pillars = parsePillars(content).map((p, i) => ({
    icon: ICONS[i % ICONS.length],
    title: p.title,
    text: p.text,
  }))

  return (
    <section className="bg-blueprint-grid relative overflow-hidden bg-slate-950 py-24 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
            {content.whyus_eyebrow || 'Por qué elegirnos'}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            {content.whyus_title || 'Confianza construida en cada proyecto'}
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-wrap justify-center gap-6">
          {pillars.map((p, i) => (
            <Reveal key={i} delay={i * 100} className={cardWidthClass(pillars.length)}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-7 transition-colors hover:border-[var(--accent)]/40 hover:bg-white/[0.08]">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-tint-15)] text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-slate-950">
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{p.title}</h3>
                <div
                  className="rich-content mt-2 text-sm leading-relaxed text-slate-400"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(p.text) }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
