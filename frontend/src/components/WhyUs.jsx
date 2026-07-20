import Reveal from './Reveal'
import { AwardIcon, ClockIcon, ShieldIcon, ToolsIcon } from './icons'

const PILLARS = [
  {
    icon: AwardIcon,
    title: 'Experiencia comprobada',
    text: 'Proyectos ejecutados para clientes públicos y privados con estándares exigentes.',
  },
  {
    icon: ClockIcon,
    title: 'Cumplimiento de plazos',
    text: 'Planificación y control de obra que aseguran entregas dentro del cronograma.',
  },
  {
    icon: ShieldIcon,
    title: 'Seguridad y normativa',
    text: 'Cumplimiento estricto de normas de seguridad vial y control de calidad.',
  },
  {
    icon: ToolsIcon,
    title: 'Tecnología y precisión',
    text: 'Equipos de topografía y software especializado para resultados exactos.',
  },
]

export default function WhyUs() {
  return (
    <section className="bg-blueprint-grid relative overflow-hidden bg-slate-950 py-24 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            Por qué elegirnos
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Confianza construida en cada proyecto
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-7 transition-colors hover:border-amber-400/40 hover:bg-white/[0.08]">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 transition-colors group-hover:bg-amber-500 group-hover:text-slate-950">
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
