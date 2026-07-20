import { useContent } from '../context/ContentContext'
import { CompassIcon, ShieldIcon, ToolsIcon } from './icons'
import Reveal from './Reveal'

const ICONS = [CompassIcon, ShieldIcon, ToolsIcon]

export default function Servicios() {
  const { content } = useContent()

  const services = [1, 2, 3].map((n) => ({
    title: content[`service_${n}_title`] || `Servicio ${n}`,
    text: content[`service_${n}_text`] || 'Descripción del servicio.',
  }))

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

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {services.map((s, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <Reveal key={i} delay={i * 120}>
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-900/10">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-slate-950">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{s.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
