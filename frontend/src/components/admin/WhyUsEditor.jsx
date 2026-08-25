import RichTextEditor from './RichTextEditor'

const MAX_PILLARS = 6
const MIN_PILLARS = 1

const DEFAULT_PILLARS = [
  { title: 'Más de 30 años de experiencia', text: 'En carreteras, puentes y aeropuertos, en el sector público y privado.' },
  { title: 'Áreas de especialización', text: 'Obras viales, aeropuertos y gran minería: movimientos de tierra, pavimentos y plantas de producción.' },
  { title: 'Amplia red de gestión', text: 'Contactos con Empresas Concesionarias, Dirección de Vialidad, aeropuertos, constructoras y transportistas.' },
  { title: 'Asesoría y asistencia técnica', text: 'Estudios de licitaciones, planificación de obras, laboratorio vial y auditorías.' },
]

function parsePillars(raw) {
  if (!raw) return DEFAULT_PILLARS
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length > 0) return parsed
  } catch {
    // valor inválido o antiguo: usamos el default
  }
  return DEFAULT_PILLARS
}

export default function WhyUsEditor({ value, onChange }) {
  const pillars = parsePillars(value)

  const update = (list) => onChange(JSON.stringify(list))

  const updateField = (index, field, fieldValue) => {
    update(pillars.map((p, i) => (i === index ? { ...p, [field]: fieldValue } : p)))
  }

  const addPillar = () => {
    if (pillars.length >= MAX_PILLARS) return
    update([...pillars, { title: '', text: '' }])
  }

  const removePillar = (index) => {
    if (pillars.length <= MIN_PILLARS) return
    update(pillars.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      {pillars.map((pillar, i) => (
        <div key={i} className="rounded-lg border border-slate-200 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">Punto {i + 1}</span>
            {pillars.length > MIN_PILLARS && (
              <button
                type="button"
                onClick={() => removePillar(i)}
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Eliminar
              </button>
            )}
          </div>
          <label className="block text-sm font-medium text-slate-700">Título</label>
          <input
            value={pillar.title}
            onChange={(e) => updateField(i, 'title', e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
          />
          <label className="mt-3 block text-sm font-medium text-slate-700">Descripción</label>
          <div className="mt-1">
            <RichTextEditor
              value={pillar.text}
              onChange={(html) => updateField(i, 'text', html)}
              placeholder="Escribe la descripción. Usa el botón de lista para viñetas, como en un Word."
            />
          </div>
        </div>
      ))}

      {pillars.length < MAX_PILLARS && (
        <button
          type="button"
          onClick={addPillar}
          className="w-full rounded-md border border-dashed border-slate-300 py-2.5 text-sm font-medium text-slate-600 hover:border-sky-400 hover:text-sky-600"
        >
          + Añadir punto ({pillars.length}/{MAX_PILLARS})
        </button>
      )}
    </div>
  )
}
