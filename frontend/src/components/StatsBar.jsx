import { useContent } from '../context/ContentContext'
import StatCounter from './StatCounter'

const DEFAULTS = [
  { value: '15+', label: 'Años de experiencia' },
  { value: '120+', label: 'Proyectos ejecutados' },
  { value: '98%', label: 'Clientes satisfechos' },
  { value: '40+', label: 'Profesionales certificados' },
]

export default function StatsBar() {
  const { content } = useContent()

  const stats = DEFAULTS.map((d, i) => ({
    value: content[`stat_${i + 1}_value`] || d.value,
    label: content[`stat_${i + 1}_label`] || d.label,
  }))

  return (
    <div className="relative z-10 mx-auto -mt-20 max-w-5xl px-6">
      <div className="grid grid-cols-2 gap-8 rounded-2xl border border-white/10 bg-slate-900/95 px-8 py-10 shadow-2xl shadow-slate-900/40 backdrop-blur sm:grid-cols-4">
        {stats.map((s, i) => (
          <StatCounter key={i} value={s.value} label={s.label} />
        ))}
      </div>
    </div>
  )
}
