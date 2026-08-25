const MAX_ITEMS = 8

function parseList(raw) {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed
  } catch {
    // valor inválido o antiguo: lista vacía
  }
  return []
}

// Lista simple de textos con agregar/eliminar (sin mínimo: dejarla vacía la oculta en el sitio).
export default function ListEditor({ value, onChange, placeholder }) {
  const items = parseList(value)

  const update = (list) => onChange(JSON.stringify(list))

  const updateItem = (index, itemValue) => {
    update(items.map((it, i) => (i === index ? itemValue : it)))
  }

  const addItem = () => {
    if (items.length >= MAX_ITEMS) return
    update([...items, ''])
  }

  const removeItem = (index) => {
    update(items.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            value={item}
            placeholder={placeholder}
            onChange={(e) => updateItem(i, e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => removeItem(i)}
            aria-label="Eliminar"
            className="flex h-9 w-9 flex-none items-center justify-center rounded-md text-red-600 hover:bg-red-50"
          >
            ×
          </button>
        </div>
      ))}

      {items.length < MAX_ITEMS && (
        <button
          type="button"
          onClick={addItem}
          className="w-full rounded-md border border-dashed border-slate-300 py-2 text-sm font-medium text-slate-600 hover:border-sky-400 hover:text-sky-600"
        >
          + Añadir punto ({items.length}/{MAX_ITEMS})
        </button>
      )}
    </div>
  )
}
