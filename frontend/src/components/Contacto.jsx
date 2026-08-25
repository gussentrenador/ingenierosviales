import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import api from '../api/client'
import { MailIcon, MapPinIcon, PhoneIcon, CheckIcon } from './icons'
import Reveal from './Reveal'

const INITIAL = { name: '', email: '', phone: '', message: '' }

const inputClass =
  'mt-1.5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20'

export default function Contacto() {
  const { content } = useContent()
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | sending | ok | error

  if (content.show_contacto === '0') return null

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

  const info = [
    { icon: MailIcon, label: 'Email', value: content.contact_email },
    { icon: PhoneIcon, label: 'Teléfono', value: content.contact_phone },
    { icon: MapPinIcon, label: 'Dirección', value: content.contact_address },
  ].filter((i) => i.value)

  return (
    <section id="contacto" className="bg-slate-50 py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <Reveal direction="left">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
            {content.contacto_eyebrow || 'Contacto'}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            {content.contacto_heading || 'Conversemos sobre tu proyecto'}
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-slate-600">
            {content.contacto_subtitle ||
              'Cuéntanos qué necesitas y te responderemos a la brevedad con una propuesta a la medida.'}
          </p>

          {info.length > 0 && (
            <dl className="mt-9 space-y-5">
              {info.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[var(--accent-tint)] text-[var(--accent-dark)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <dt className="text-sm font-semibold text-slate-500">{label}</dt>
                    <dd className="text-slate-900">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          )}
        </Reveal>

        <Reveal direction="right" delay={100}>
          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white p-8 shadow-lg shadow-slate-900/5">
            <div>
              <label className="text-sm font-medium text-slate-700">Nombre</label>
              <input
                required
                name="name"
                placeholder="Tu nombre completo"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input
                required
                type="email"
                name="email"
                placeholder="tu@correo.com"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Teléfono</label>
              <input
                name="phone"
                placeholder="+56 9 0000 0000"
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Mensaje</label>
              <textarea
                required
                name="message"
                rows={4}
                placeholder="Cuéntanos sobre tu proyecto"
                value={form.message}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full rounded-lg bg-[var(--accent)] px-4 py-3 font-semibold text-slate-950 shadow-md shadow-[var(--accent)]/20 transition-all hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
            </button>

            {status === 'ok' && (
              <p className="flex items-center gap-2 text-sm font-medium text-green-600">
                <CheckIcon className="h-4 w-4" /> ¡Gracias! Tu mensaje fue enviado correctamente.
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm font-medium text-red-600">
                Ocurrió un error al enviar tu mensaje. Intenta nuevamente.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
