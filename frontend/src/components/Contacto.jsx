import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import api from '../api/client'

const INITIAL = { name: '', email: '', phone: '', message: '' }

export default function Contacto() {
  const { content } = useContent()
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | sending | ok | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await api.post('/contact.php', form)
      setStatus('ok')
      setForm(INITIAL)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className="bg-slate-50 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Conversemos sobre tu proyecto</h2>
          <p className="mt-4 text-slate-600">
            Escríbenos y te responderemos a la brevedad.
          </p>
          <dl className="mt-8 space-y-3 text-slate-700">
            {content.contact_email && (
              <div>
                <dt className="font-semibold">Email</dt>
                <dd>{content.contact_email}</dd>
              </div>
            )}
            {content.contact_phone && (
              <div>
                <dt className="font-semibold">Teléfono</dt>
                <dd>{content.contact_phone}</dd>
              </div>
            )}
            {content.contact_address && (
              <div>
                <dt className="font-semibold">Dirección</dt>
                <dd>{content.contact_address}</dd>
              </div>
            )}
          </dl>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-white p-8 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-slate-700">Nombre</label>
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Teléfono</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Mensaje</label>
            <textarea
              required
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full rounded-md bg-sky-500 px-4 py-2 font-semibold text-white hover:bg-sky-400 disabled:opacity-60 transition-colors"
          >
            {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
          </button>

          {status === 'ok' && (
            <p className="text-sm font-medium text-green-600">
              ¡Gracias! Tu mensaje fue enviado correctamente.
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm font-medium text-red-600">
              Ocurrió un error al enviar tu mensaje. Intenta nuevamente.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
