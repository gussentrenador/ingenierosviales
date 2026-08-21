import RichTextEditor from './RichTextEditor'

const MAX_SERVICES = 5
const MIN_SERVICES = 1

const DEFAULT_SERVICES = [
  { title: 'Asesorías', text: 'Estudios de licitaciones, planificación y gestión de obras viales, aeroportuarias y de gran minería.' },
  { title: 'Asistencia técnica', text: 'Plantas de producción de áridos, plantas asfálticas y de hormigón, laboratorio vial y auditorías de obras.' },
  { title: 'Obras en aeropuertos y minería', text: 'Conservación y repavimentación de pistas, caminos de servicio y accesos en gran minería.' },
]

function parseServices(raw) {
  if (!raw) return DEFAULT_SERVICES
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length > 0) return parsed
  } catch {
    // valor inválido o antiguo: usamos el default
  }
  return DEFAULT_SERVICES
}

export default function ServicesEditor({ value, onChange }) {
  const services = parseServices(value)

  const update = (list) => onChange(JSON.stringify(list))

  const updateField = (index, field, fieldValue) => {
    const next = services.map((s, i) => (i === index ? { ...s, [field]: fieldValue } : s))
    update(next)
  }

  const addService = () => {
    if (services.length >= MAX_SERVICES) return
    update([...services, { title: '', text: '' }])
  }

  const removeService = (index) => {
    if (services.length <= MIN_SERVICES) return
    update(services.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      {services.map((service, i) => (
        <div key={i} className="rounded-lg border border-slate-200 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">Servicio {i + 1}</span>
            {services.length > MIN_SERVICES && (
              <button
                type="button"
                onClick={() => removeService(i)}
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Eliminar
              </button>
            )}
          </div>
          <label className="block text-sm font-medium text-slate-700">Título</label>
          <input
            value={service.title}
            onChange={(e) => updateField(i, 'title', e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
          />
          <label className="mt-3 block text-sm font-medium text-slate-700">Descripción</label>
          <div className="mt-1">
            <RichTextEditor
              value={service.text}
              onChange={(html) => updateField(i, 'text', html)}
              placeholder="Escribe la descripción. Usa el botón de lista para viñetas, como en un Word."
            />
          </div>
        </div>
      ))}

      {services.length < MAX_SERVICES && (
        <button
          type="button"
          onClick={addService}
          className="w-full rounded-md border border-dashed border-slate-300 py-2.5 text-sm font-medium text-slate-600 hover:border-sky-400 hover:text-sky-600"
        >
          + Añadir servicio ({services.length}/{MAX_SERVICES})
        </button>
      )}
    </div>
  )
}
