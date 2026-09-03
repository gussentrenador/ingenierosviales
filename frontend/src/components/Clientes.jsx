import { useContent } from '../context/ContentContext'
import { assetUrl } from '../api/client'
import Reveal from './Reveal'

function parseClients(raw) {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((c) => c.name || c.logo) : []
  } catch {
    return []
  }
}

export default function Clientes() {
  const { content } = useContent()
  const clients = parseClients(content.clientes_json)
  if (content.show_clientes === '0' || clients.length === 0) return null

  return (
    <section id="clientes" className="bg-slate-50 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
            {content.clientes_eyebrow || 'Confían en nosotros'}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            {content.clientes_heading || 'Clientes recientes'}
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-wrap justify-center gap-6">
          {clients.map((c, i) => (
            <Reveal
              key={i}
              delay={i * 60}
              className="flex w-[calc(50%-0.75rem)] flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 text-center sm:w-[calc(33.333%-1rem)] lg:w-[calc(16.666%-1.25rem)]"
            >
              <div className="flex h-16 w-full items-center justify-center">
                {c.logo ? (
                  <img src={assetUrl(c.logo)} alt={c.name} className="max-h-16 max-w-full object-contain" />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-400">
                    {(c.name || '?').slice(0, 1).toUpperCase()}
                  </div>
                )}
              </div>
              {c.name && <p className="text-sm font-medium text-slate-600">{c.name}</p>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
