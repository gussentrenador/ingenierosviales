import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CONTENT_SCHEMA } from '../content-schema'
import { useContent } from '../context/ContentContext'
import { useAuth } from '../context/AuthContext'
import api from '../api/client'
import ImageField from '../components/admin/ImageField'
import ServicesEditor from '../components/admin/ServicesEditor'
import ProjectsEditor from '../components/admin/ProjectsEditor'
import TeamEditor from '../components/admin/TeamEditor'
import SectionOrderEditor from '../components/admin/SectionOrderEditor'

export default function AdminDashboard() {
  const { content, reload } = useContent()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const [values, setValues] = useState({})
  const [uploading, setUploading] = useState(null)
  const [uploadErrors, setUploadErrors] = useState({})
  const [saveState, setSaveState] = useState('idle') // idle | saving | ok | error

  useEffect(() => {
    setValues(content)
  }, [content])

  const setField = (key, value) => setValues((v) => ({ ...v, [key]: value }))

  const handleImageChange = async (key, file) => {
    if (!file) return
    setUploading(key)
    setUploadErrors((e) => ({ ...e, [key]: null }))
    const formData = new FormData()
    formData.append('image', file)
    try {
      // Importante: no fijar el header Content-Type a mano — axios/el navegador
      // debe generar el boundary del multipart automáticamente, o el backend
      // recibe el archivo vacío.
      const res = await api.post('/upload.php', formData)
      setField(key, res.data.path)
    } catch (err) {
      const message = err.response?.data?.error || 'No se pudo subir la imagen. Intenta nuevamente.'
      setUploadErrors((e) => ({ ...e, [key]: message }))
    } finally {
      setUploading(null)
    }
  }

  const handleSave = async () => {
    setSaveState('saving')
    try {
      await api.post('/content.php', { updates: values })
      await reload()
      setSaveState('ok')
      setTimeout(() => setSaveState('idle'), 2000)
    } catch {
      setSaveState('error')
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-100 pb-24">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-slate-900 px-6 py-4 text-white">
        <h1 className="font-bold">Panel de administración</h1>
        <div className="flex gap-3">
          <a href="/" target="_blank" rel="noreferrer" className="text-sm underline">
            Ver sitio
          </a>
          <button onClick={handleLogout} className="text-sm underline">
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-8 px-6 py-8">
        {CONTENT_SCHEMA.map((group) => (
          <section key={group.section} className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">{group.section}</h2>
            <div className="space-y-4">
              {group.fields.map((field) => (
                <div key={field.key}>
                  {field.type !== 'image' &&
                    field.type !== 'checkbox' &&
                    field.type !== 'services' &&
                    field.type !== 'projects' &&
                    field.type !== 'team' &&
                    field.type !== 'order' && (
                      <label className="block text-sm font-medium text-slate-700">{field.label}</label>
                    )}

                  {field.type === 'checkbox' &&
                    (() => {
                      const raw = values[field.key]
                      const isChecked = raw === '0' || raw === '1' ? raw !== '0' : field.defaultOn !== false
                      return (
                        <label className="flex cursor-pointer items-center gap-3">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={isChecked}
                            onChange={(e) => setField(field.key, e.target.checked ? '1' : '0')}
                          />
                          <span
                            className={`relative inline-flex h-6 w-11 flex-none items-center rounded-full transition-colors ${
                              isChecked ? 'bg-sky-500' : 'bg-slate-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                                isChecked ? 'translate-x-5' : 'translate-x-0.5'
                              }`}
                            />
                          </span>
                          <span className="text-sm font-medium text-slate-700">{field.label}</span>
                        </label>
                      )
                    })()}

                  {field.type === 'textarea' && (
                    <textarea
                      rows={3}
                      value={values[field.key] || ''}
                      onChange={(e) => setField(field.key, e.target.value)}
                      className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
                    />
                  )}

                  {field.type === 'text' && (
                    <input
                      value={values[field.key] || ''}
                      onChange={(e) => setField(field.key, e.target.value)}
                      className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
                    />
                  )}

                  {field.type === 'services' && (
                    <div className="mt-1">
                      <ServicesEditor
                        value={values[field.key]}
                        onChange={(json) => setField(field.key, json)}
                      />
                    </div>
                  )}

                  {field.type === 'projects' && (
                    <div className="mt-1">
                      <ProjectsEditor
                        value={values[field.key]}
                        onChange={(json) => setField(field.key, json)}
                      />
                    </div>
                  )}

                  {field.type === 'team' && (
                    <div className="mt-1">
                      <TeamEditor
                        value={values[field.key]}
                        onChange={(json) => setField(field.key, json)}
                      />
                    </div>
                  )}

                  {field.type === 'order' && (
                    <div className="mt-1">
                      <SectionOrderEditor
                        value={values[field.key]}
                        onChange={(json) => setField(field.key, json)}
                      />
                    </div>
                  )}

                  {field.type === 'image' && (
                    <div className="mt-1">
                      <ImageField
                        section={group.section}
                        label={field.label}
                        value={values[field.key]}
                        uploading={uploading === field.key}
                        error={uploadErrors[field.key]}
                        onChange={(file) => handleImageChange(field.key, file)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      <div className="fixed inset-x-0 bottom-0 border-t border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-end gap-4">
          {saveState === 'ok' && <span className="text-sm font-medium text-green-600">Guardado ✓</span>}
          {saveState === 'error' && <span className="text-sm font-medium text-red-600">Error al guardar</span>}
          <button
            onClick={handleSave}
            disabled={saveState === 'saving'}
            className="rounded-md bg-sky-500 px-6 py-2 font-semibold text-white hover:bg-sky-400 disabled:opacity-60 transition-colors"
          >
            {saveState === 'saving' ? 'Guardando…' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  )
}
