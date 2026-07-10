import { useContent } from '../context/ContentContext'

const LINKS = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const { content } = useContent()

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur text-white shadow">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="text-lg font-bold tracking-tight">
          {content.company_name || 'Empresa de Ingeniería'}
        </a>
        <ul className="hidden gap-8 text-sm font-medium sm:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-sky-400 transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contacto"
          className="rounded-md bg-sky-500 px-4 py-2 text-sm font-semibold hover:bg-sky-400 transition-colors"
        >
          Cotiza tu proyecto
        </a>
      </nav>
    </header>
  )
}
