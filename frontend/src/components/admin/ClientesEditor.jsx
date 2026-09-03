import { useRef, useState } from 'react'
import api, { assetUrl } from '../../api/client'

const MAX_CLIENTS = 12

function parseClients(raw) {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default function ClientesEditor({ value, onChange }) {
  const clients = parseClients(value)
  const [uploading, setUploading] = useState(null)
  const [error, setError] = useState(null)
  const inputRefs = useRef({})

  const update = (list) => onChange(JSON.stringify(list))

  const updateField = (index, field, fieldValue) => {
    update(clients.map((c, i) => (i === index ? { ...c, [field]: fieldValue } : c)))
  }

  const addClient = () => {
    if (clients.length >= MAX_CLIENTS) return
    update([...clients, { name: '', logo: '' }])
  }

  const removeClient = (index) => {
    update(clients.filter((_, i) => i !== index))
  }

  const uploadLogo = async (index, file) => {
    if (!file) return
    setUploading(index)
    setError(null)
    const formData = new FormData()
    formData.append('image', file)
    try {
      const res = await api.post('/upload.php', formData)
      updateField(index, 'logo', res.data.path)
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo subir el logo. Intenta nuevamente.')
    } finally {
      setUploading(null)
    }
  }

  return (
    <div className="space-y-4">
      {clients.length === 0 && (
        <p className="text-sm text-slate-500">
          Todavía no agregaste clientes. La sección "Clientes recientes" no se muestra en el sitio hasta que agregues al menos uno.
        </p>
      )}

      {clients.map((client, i) => (
        <div key={i} className="rounded-lg border border-slate-200 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">Cliente {i + 1}</span>
            <button
              type="button"
              onClick={() => removeClient(i)}
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              Eliminar
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-16 flex-none items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-white">
              {client.logo ? (
                <img src={assetUrl(client.logo)} alt="" className="h-full w-full object-contain p-1" />
              ) : (
                <span className="text-xs text-slate-400">Sin logo</span>
              )}
              {uploading === i && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                </div>
              )}
            </div>
            <div>
              <button
                type="button"
                disabled={uploading === i}
                onClick={() => inputRefs.current[i]?.click()}
                className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
              >
                {client.logo ? 'Reemplazar logo' : 'Subir logo'}
              </button>
              <input
                ref={(el) => (inputRefs.current[i] = el)}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0]
                  uploadLogo(i, file)
                  e.target.value = ''
                }}
              />
              <p className="mt-1 text-xs text-slate-400">JPG, PNG, WEBP o GIF · máx. 100MB</p>
            </div>
          </div>

          <label className="mt-3 block text-sm font-medium text-slate-700">Nombre del cliente</label>
          <input
            value={client.name}
            onChange={(e) => updateField(i, 'name', e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
          />
        </div>
      ))}

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      {clients.length < MAX_CLIENTS && (
        <button
          type="button"
          onClick={addClient}
          className="w-full rounded-md border border-dashed border-slate-300 py-2.5 text-sm font-medium text-slate-600 hover:border-sky-400 hover:text-sky-600"
        >
          + Añadir cliente ({clients.length}/{MAX_CLIENTS})
        </button>
      )}
    </div>
  )
}
