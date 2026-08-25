import { useRef, useState } from 'react'
import api, { assetUrl } from '../../api/client'
import RichTextEditor from './RichTextEditor'

const MAX_PROJECTS = 6
const MIN_PROJECTS = 1
const MAX_IMAGES = 8

const DEFAULT_PROJECTS = [
  {
    title: 'Conservaciones Viales Periódicas',
    text: 'Tratamientos superficiales dobles y reposición de pavimentos asfálticos en calzadas y bermas, con bacheos, sellado de grietas, señalización y demarcación.',
    images: [],
  },
  {
    title: 'Obras en Autopistas Concesionadas',
    text: 'Desnivelación de enlaces viales en Ruta 5 Norte y Sur, y reposición de pavimentos de hormigón en calzadas de autopistas concesionadas.',
    images: [],
  },
  {
    title: 'Obras en Aeropuertos',
    text: 'Reparación y ensanche de pistas de rodado y pista principal mediante fresado, nueva base granular y pavimento asfáltico.',
    images: [],
  },
]

function parseProjects(raw) {
  if (!raw) return DEFAULT_PROJECTS
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((p) => ({ title: p.title || '', text: p.text || '', images: p.images || [] }))
    }
  } catch {
    // valor inválido o antiguo: usamos el default
  }
  return DEFAULT_PROJECTS
}

export default function ProjectsEditor({ value, onChange }) {
  const projects = parseProjects(value)
  const [uploading, setUploading] = useState(null) // índice del proyecto que está subiendo
  const [error, setError] = useState(null)
  const inputRefs = useRef({})

  const update = (list) => onChange(JSON.stringify(list))

  const updateField = (index, field, fieldValue) => {
    update(projects.map((p, i) => (i === index ? { ...p, [field]: fieldValue } : p)))
  }

  const addProject = () => {
    if (projects.length >= MAX_PROJECTS) return
    update([...projects, { title: '', text: '', images: [] }])
  }

  const removeProject = (index) => {
    if (projects.length <= MIN_PROJECTS) return
    update(projects.filter((_, i) => i !== index))
  }

  const moveProject = (index, delta) => {
    const target = index + delta
    if (target < 0 || target >= projects.length) return
    const next = [...projects]
    ;[next[index], next[target]] = [next[target], next[index]]
    update(next)
  }

  const removeImage = (projectIndex, imageIndex) => {
    const next = projects.map((p, i) =>
      i === projectIndex ? { ...p, images: p.images.filter((_, j) => j !== imageIndex) } : p
    )
    update(next)
  }

  const uploadImage = async (projectIndex, file) => {
    if (!file) return
    setUploading(projectIndex)
    setError(null)
    const formData = new FormData()
    formData.append('image', file)
    try {
      const res = await api.post('/upload.php', formData)
      const next = projects.map((p, i) =>
        i === projectIndex ? { ...p, images: [...p.images, res.data.path] } : p
      )
      update(next)
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo subir la imagen. Intenta nuevamente.')
    } finally {
      setUploading(null)
    }
  }

  return (
    <div className="space-y-4">
      {projects.map((project, i) => (
        <div key={i} className="rounded-lg border border-slate-200 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">Proyecto {i + 1}</span>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <button
                  type="button"
                  disabled={i === 0}
                  onClick={() => moveProject(i, -1)}
                  aria-label="Subir"
                  title="Mover arriba"
                  className="flex h-7 w-7 items-center justify-center rounded border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={i === projects.length - 1}
                  onClick={() => moveProject(i, 1)}
                  aria-label="Bajar"
                  title="Mover abajo"
                  className="flex h-7 w-7 items-center justify-center rounded border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ↓
                </button>
              </div>
              {projects.length > MIN_PROJECTS && (
                <button
                  type="button"
                  onClick={() => removeProject(i)}
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>

          <label className="block text-sm font-medium text-slate-700">Título</label>
          <input
            value={project.title}
            onChange={(e) => updateField(i, 'title', e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
          />
          <label className="mt-3 block text-sm font-medium text-slate-700">Descripción</label>
          <div className="mt-1">
            <RichTextEditor
              value={project.text}
              onChange={(html) => updateField(i, 'text', html)}
              placeholder="Escribe la descripción. Usa el botón de lista para viñetas, como en un Word."
            />
          </div>

          <p className="mt-3 text-sm font-medium text-slate-700">
            Fotos ({project.images.length}/{MAX_IMAGES}) — se muestran como carrusel en el sitio
          </p>
          <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {project.images.map((img, j) => (
              <div key={j} className="group relative aspect-square overflow-hidden rounded-md bg-slate-100">
                <img src={assetUrl(img)} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i, j)}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-950/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label="Quitar foto"
                >
                  ×
                </button>
              </div>
            ))}

            {project.images.length < MAX_IMAGES && (
              <button
                type="button"
                disabled={uploading === i}
                onClick={() => inputRefs.current[i]?.click()}
                className="flex aspect-square flex-col items-center justify-center gap-1 rounded-md border border-dashed border-slate-300 text-slate-500 hover:border-sky-400 hover:text-sky-600 disabled:opacity-60"
              >
                {uploading === i ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
                ) : (
                  <>
                    <span className="text-xl leading-none">+</span>
                    <span className="text-xs">Agregar</span>
                  </>
                )}
              </button>
            )}
            <input
              ref={(el) => (inputRefs.current[i] = el)}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0]
                uploadImage(i, file)
                e.target.value = ''
              }}
            />
          </div>
        </div>
      ))}

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      {projects.length < MAX_PROJECTS && (
        <button
          type="button"
          onClick={addProject}
          className="w-full rounded-md border border-dashed border-slate-300 py-2.5 text-sm font-medium text-slate-600 hover:border-sky-400 hover:text-sky-600"
        >
          + Añadir proyecto ({projects.length}/{MAX_PROJECTS})
        </button>
      )}
    </div>
  )
}
