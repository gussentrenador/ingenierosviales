import { useContent } from '../context/ContentContext'
import { assetUrl } from '../api/client'
import Reveal from './Reveal'

// A partir de esta cantidad de logos, la franja pasa a desplazarse sola en
// vez de mostrarse estática — con pocos logos no hace falta animar nada.
const SCROLL_THRESHOLD = 6
// Segundos por logo: la velocidad se mantiene pareja sin importar cuántos haya.
const SECONDS_PER_LOGO = 3

function parseClients(raw) {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((c) => c.name || c.logo) : []
  } catch {
    return []
  }
}

function ClientLogo({ client }) {
  return (
    <div className="flex w-24 flex-none flex-col items-center gap-2 sm:w-28">
      <div className="flex h-12 w-full items-center justify-center sm:h-16">
        {client.logo ? (
          <img
            src={assetUrl(client.logo)}
            alt={client.name}
            className="max-h-12 max-w-full object-contain grayscale transition-all duration-300 hover:grayscale-0 sm:max-h-16"
          />
        ) : (
          <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-slate-100 text-xs text-slate-400 sm:h-14 sm:w-14">
            {(client.name || '?').slice(0, 1).toUpperCase()}
          </div>
        )}
      </div>
      {client.name && (
        <p className="max-w-full truncate text-center text-xs font-medium text-slate-500 sm:text-sm">
          {client.name}
        </p>
      )}
    </div>
  )
}

export default function Clientes() {
  const { content } = useContent()
  const clients = parseClients(content.clientes_json)
  if (content.show_clientes === '0' || clients.length === 0) return null

  const shouldScroll = clients.length > SCROLL_THRESHOLD
  const trackItems = shouldScroll ? [...clients, ...clients] : clients
  const duration = clients.length * SECONDS_PER_LOGO

  return (
    <section id="clientes" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
            {content.clientes_eyebrow || 'Confían en nosotros'}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            {content.clientes_heading || 'Clientes recientes'}
          </h2>
        </Reveal>
      </div>

      <Reveal delay={100}>
        <div className={`relative mt-12 overflow-hidden ${shouldScroll ? 'clientes-fade-edges' : ''}`}>
          <div
            className={
              shouldScroll
                ? 'animate-clientes-scroll flex items-start gap-10 sm:gap-14'
                : 'flex flex-wrap items-start justify-center gap-x-10 gap-y-8 px-6 sm:gap-x-14'
            }
            style={shouldScroll ? { width: 'max-content', animationDuration: `${duration}s` } : undefined}
          >
            {trackItems.map((c, i) => (
              <ClientLogo key={i} client={c} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
