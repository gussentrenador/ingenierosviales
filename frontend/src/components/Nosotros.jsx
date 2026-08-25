import { useContent } from '../context/ContentContext'
import { assetUrl } from '../api/client'
import { CheckIcon } from './icons'
import Reveal from './Reveal'

// Solo muestra puntos destacados si se guardaron explícitamente desde el
// editor de /admin — sin valores de respaldo, para no mostrar nada que el
// usuario no haya puesto ahí.
function parseHighlights(content) {
  if (!content.highlights_json) return []
  try {
    const parsed = JSON.parse(content.highlights_json)
    return Array.isArray(parsed) ? parsed.filter(Boolean) : []
  } catch {
    return []
  }
}

export default function Nosotros() {
  const { content } = useContent()
  if (content.show_nosotros === '0') return null
  const img = assetUrl(content.about_image)
  const years = content.stat_1_value || '30+'
  const highlights = parseHighlights(content)

  return (
    <section id="nosotros" className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <div className="grid items-center gap-14 sm:grid-cols-2">
        <Reveal direction="left">
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 shadow-xl">
              {img ? (
                <img src={img} alt="Equipo de ingeniería" className="h-full w-full object-cover" />
              ) : (
                <div className="bg-blueprint-grid flex h-full w-full items-center justify-center bg-slate-800 text-sm text-slate-400">
                  Imagen del equipo
                </div>
              )}
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-xl bg-[var(--accent)] px-6 py-4 text-slate-950 shadow-lg sm:block">
              <p className="font-display text-3xl font-extrabold leading-none">{years}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide">Años de trayectoria</p>
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" delay={100}>
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
            {content.nosotros_eyebrow || 'Quiénes somos'}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            {content.about_title || 'Sobre nosotros'}
          </h2>
          <p className="mt-5 leading-relaxed text-slate-600">
            {content.about_text ||
              'Profesionales del área vial con más de 30 años de experiencia en carreteras, puentes y aeropuertos, en el sector público y privado. Liderados por Orlando Maluenda Rojas, Ingeniero Civil Químico y Consultor Líder, ofrecemos asesorías en licitaciones, planificación y gestión de obras, además de asistencia técnica en plantas de áridos, plantas asfálticas, hormigones y laboratorio vial.'}
          </p>

          {highlights.length > 0 && (
            <ul className="mt-7 space-y-3">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[var(--accent-tint)] text-[var(--accent-dark)]">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  )
}
