import { useRef, useState } from 'react'
import api, { assetUrl } from '../../api/client'

const MAX_MEMBERS = 8

function parseTeam(raw) {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default function TeamEditor({ value, onChange }) {
  const team = parseTeam(value)
  const [uploading, setUploading] = useState(null)
  const [error, setError] = useState(null)
  const inputRefs = useRef({})

  const update = (list) => onChange(JSON.stringify(list))

  const updateField = (index, field, fieldValue) => {
    update(team.map((m, i) => (i === index ? { ...m, [field]: fieldValue } : m)))
  }

  const addMember = () => {
    if (team.length >= MAX_MEMBERS) return
    update([...team, { name: '', profession: '', about: '', photo: '', linkedin_url: '' }])
  }

  const removeMember = (index) => {
    update(team.filter((_, i) => i !== index))
  }

  const uploadPhoto = async (index, file) => {
    if (!file) return
    setUploading(index)
    setError(null)
    const formData = new FormData()
    formData.append('image', file)
    try {
      const res = await api.post('/upload.php', formData)
      updateField(index, 'photo', res.data.path)
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo subir la foto. Intenta nuevamente.')
    } finally {
      setUploading(null)
    }
  }

  return (
    <div className="space-y-4">
      {team.length === 0 && (
        <p className="text-sm text-slate-500">
          Todavía no agregaste a nadie. La sección "Equipo" no se muestra en el sitio hasta que agregues al menos un profesional.
        </p>
      )}

      {team.map((member, i) => (
        <div key={i} className="rounded-lg border border-slate-200 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">Profesional {i + 1}</span>
            <button
              type="button"
              onClick={() => removeMember(i)}
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              Eliminar
            </button>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative h-20 w-20 flex-none overflow-hidden rounded-full bg-slate-100">
              {member.photo ? (
                <img src={assetUrl(member.photo)} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                  Sin foto
                </div>
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
                {member.photo ? 'Reemplazar foto' : 'Subir foto'}
              </button>
              <input
                ref={(el) => (inputRefs.current[i] = el)}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0]
                  uploadPhoto(i, file)
                  e.target.value = ''
                }}
              />
              <p className="mt-1 text-xs text-slate-400">JPG, PNG, WEBP o GIF · máx. 100MB</p>
            </div>
          </div>

          <label className="mt-3 block text-sm font-medium text-slate-700">Nombre</label>
          <input
            value={member.name}
            onChange={(e) => updateField(i, 'name', e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
          />

          <label className="mt-3 block text-sm font-medium text-slate-700">Profesión / cargo</label>
          <input
            value={member.profession}
            onChange={(e) => updateField(i, 'profession', e.target.value)}
            placeholder="Ej: Ingeniero Civil Químico"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
          />

          <label className="mt-3 block text-sm font-medium text-slate-700">Acerca de</label>
          <textarea
            rows={2}
            value={member.about}
            onChange={(e) => updateField(i, 'about', e.target.value)}
            placeholder="Breve descripción profesional"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
          />

          <label className="mt-3 block text-sm font-medium text-slate-700">Link de LinkedIn</label>
          <input
            value={member.linkedin_url}
            onChange={(e) => updateField(i, 'linkedin_url', e.target.value)}
            placeholder="https://www.linkedin.com/in/..."
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
          />
        </div>
      ))}

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      {team.length < MAX_MEMBERS && (
        <button
          type="button"
          onClick={addMember}
          className="w-full rounded-md border border-dashed border-slate-300 py-2.5 text-sm font-medium text-slate-600 hover:border-sky-400 hover:text-sky-600"
        >
          + Añadir profesional ({team.length}/{MAX_MEMBERS})
        </button>
      )}
    </div>
  )
}
