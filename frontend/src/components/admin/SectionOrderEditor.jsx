export const DEFAULT_SECTION_ORDER = [
  'stats',
  'nosotros',
  'whyus',
  'servicios',
  'proyectos',
  'clientes',
  'equipo',
  'contacto',
]

const LABELS = {
  stats: 'Estadísticas (franja de confianza)',
  nosotros: 'Nosotros',
  whyus: 'Por qué elegirnos',
  servicios: 'Servicios',
  proyectos: 'Proyectos',
  clientes: 'Clientes recientes',
  equipo: 'Equipo (LinkedIn)',
  contacto: 'Contacto',
}

export function parseSectionOrder(raw) {
  if (raw) {
    try {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        const valid = parsed.filter((k) => DEFAULT_SECTION_ORDER.includes(k))
        const missing = DEFAULT_SECTION_ORDER.filter((k) => !valid.includes(k))
        return [...valid, ...missing]
      }
    } catch {
      // valor inválido: usamos el orden por defecto
    }
  }
  return DEFAULT_SECTION_ORDER
}

export default function SectionOrderEditor({ value, onChange }) {
  const order = parseSectionOrder(value)

  const move = (index, delta) => {
    const target = index + delta
    if (target < 0 || target >= order.length) return
    const next = [...order]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(JSON.stringify(next))
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-slate-500">
        El Hero (portada) siempre va primero y el pie de página siempre al final. Ordena el resto con las flechas.
      </p>
      {order.map((key, i) => (
        <div key={key} className="flex items-center justify-between rounded-md border border-slate-200 px-4 py-2.5">
          <span className="text-sm font-medium text-slate-700">
            {i + 1}. {LABELS[key]}
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              disabled={i === 0}
              onClick={() => move(i, -1)}
              aria-label="Subir"
              className="flex h-7 w-7 items-center justify-center rounded border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ↑
            </button>
            <button
              type="button"
              disabled={i === order.length - 1}
              onClick={() => move(i, 1)}
              aria-label="Bajar"
              className="flex h-7 w-7 items-center justify-center rounded border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ↓
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
