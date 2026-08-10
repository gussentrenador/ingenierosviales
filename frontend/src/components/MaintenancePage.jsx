import { useContent } from '../context/ContentContext'
import { MailIcon, ToolsIcon } from './icons'

export default function MaintenancePage() {
  const { content } = useContent()
  const companyName = content.company_name || 'Ingenieros Viales'

  return (
    <div className="bg-blueprint-grid relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950" />

      <div className="animate-fade-in-up relative z-10 max-w-lg">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400">
          <ToolsIcon className="h-8 w-8 animate-pulse" />
        </span>

        <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-amber-400">
          {companyName}
        </p>

        <h1 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
          {content.maintenance_title || 'Sitio en mantención'}
        </h1>

        <p className="mt-5 leading-relaxed text-slate-300">
          {content.maintenance_message ||
            'Estamos realizando mejoras en nuestro sitio. Vuelve a visitarnos pronto.'}
        </p>

        {content.contact_email && (
          <a
            href={`mailto:${content.contact_email}`}
            className="mt-8 inline-flex items-center gap-2 rounded-md border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-amber-400/50 hover:text-amber-400"
          >
            <MailIcon className="h-4 w-4" />
            {content.contact_email}
          </a>
        )}
      </div>
    </div>
  )
}
