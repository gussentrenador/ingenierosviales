import { useContent } from '../context/ContentContext'
import { assetUrl } from '../api/client'
import { CheckIcon } from './icons'
import Reveal from './Reveal'

const HIGHLIGHTS = [
  'Equipo de ingenieros y proyectistas certificados',
  'Cumplimiento normativo y de plazos comprometidos',
  'Tecnología de topografía y control de calidad',
]

export default function Nosotros() {
  const { content } = useContent()
  const img = assetUrl(content.about_image)

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
            <div className="absolute -bottom-6 -right-6 hidden rounded-xl bg-amber-500 px-6 py-4 text-slate-950 shadow-lg sm:block">
              <p className="font-display text-3xl font-extrabold leading-none">
                {content.stat_1_value || '15+'}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide">Años de trayectoria</p>
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" delay={100}>
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">
            Quiénes somos
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            {content.about_title || 'Sobre nosotros'}
          </h2>
          <p className="mt-5 leading-relaxed text-slate-600">
            {content.about_text ||
              'Somos una empresa de ingeniería vial con años de experiencia entregando soluciones técnicas confiables para clientes exigentes, desde el diseño hasta la ejecución y supervisión de obra.'}
          </p>

          <ul className="mt-7 space-y-3">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-start gap-3 text-slate-700">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
