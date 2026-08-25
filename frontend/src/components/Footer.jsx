import { useContent } from '../context/ContentContext'
import { MailIcon, MapPinIcon, PhoneIcon } from './icons'

const LINKS = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Footer() {
  const { content } = useContent()
  const companyName = content.company_name || 'Empresa de Ingeniería Vial'

  const info = [
    { icon: MailIcon, value: content.contact_email },
    { icon: PhoneIcon, value: content.contact_phone },
    { icon: MapPinIcon, value: content.contact_address },
  ].filter((i) => i.value)

  return (
    <footer className="bg-slate-950 pt-16 text-slate-400">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-12 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold text-white">{companyName}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            {content.company_tagline || 'Ingeniería vial con precisión y seguridad, de principio a fin.'}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-200">Navegación</p>
          <ul className="mt-4 space-y-2 text-sm">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-[var(--accent)]">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {info.length > 0 && (
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-200">Contacto</p>
            <ul className="mt-4 space-y-3 text-sm">
              {info.map(({ icon: Icon, value }, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 flex-none text-[var(--accent)]" />
                  {value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="mx-auto max-w-6xl px-6 text-center text-xs text-slate-500">
          {content.footer_text || `© ${new Date().getFullYear()} ${companyName}. Todos los derechos reservados.`}
        </p>
      </div>
    </footer>
  )
}
