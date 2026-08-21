import { useContent } from '../context/ContentContext'
import StatCounter from './StatCounter'

// Solo las 2 primeras tienen un valor por defecto, porque son las únicas
// respaldadas por datos reales del cliente. Las estadísticas 3 y 4 no se
// muestran hasta que se complete un valor real desde /admin — mejor no
// mostrar nada que inventar una cifra.
const DEFAULTS = [
  { value: '30+', label: 'Años de experiencia' },
  { value: '3', label: 'Sectores: vial, aeropuertos y minería' },
  null,
  null,
]

const GRID_COLS = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4' }

export default function StatsBar({ overlapHero = false }) {
  const { content } = useContent()

  const stats = DEFAULTS.map((d, i) => {
    const value = content[`stat_${i + 1}_value`] || d?.value
    const label = content[`stat_${i + 1}_label`] || d?.label
    return value ? { value, label } : null
  }).filter(Boolean)

  if (stats.length === 0) return null

  return (
    <div className={`relative z-10 mx-auto max-w-5xl px-6 ${overlapHero ? '-mt-20' : 'py-14'}`}>
      <div
        className={`grid grid-cols-2 gap-8 rounded-2xl border border-white/10 bg-slate-900/95 px-8 py-10 shadow-2xl shadow-slate-900/40 backdrop-blur ${
          GRID_COLS[stats.length] || 'sm:grid-cols-4'
        }`}
      >
        {stats.map((s, i) => (
          <StatCounter key={i} value={s.value} label={s.label} />
        ))}
      </div>
    </div>
  )
}
