import { useEffect, useState } from 'react'
import { useContent } from '../context/ContentContext'
import { MenuIcon, CloseIcon } from './icons'

const LINKS = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const { content } = useContent()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'bg-slate-950/95 shadow-lg backdrop-blur' : 'bg-gradient-to-b from-slate-950/70 to-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <ul className="hidden gap-8 text-sm font-medium text-slate-200 sm:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="relative py-1 transition-colors hover:text-amber-400">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {content.show_contact_cta !== '0' && (
          <a
            href="#contacto"
            className="hidden rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm transition-all hover:bg-amber-400 hover:shadow-amber-500/30 sm:inline-block"
          >
            Contacto
          </a>
        )}

        <button
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto text-white sm:hidden"
        >
          {open ? <CloseIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
        </button>
      </nav>

      <div
        className={`overflow-hidden bg-slate-950/98 transition-[max-height] duration-300 sm:hidden ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 pb-6 text-slate-200">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-3 text-base font-medium transition-colors hover:bg-white/5 hover:text-amber-400"
              >
                {link.label}
              </a>
            </li>
          ))}
          {content.show_contact_cta !== '0' && (
            <li>
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-md bg-amber-500 px-4 py-3 text-center font-semibold text-slate-950"
              >
                Contacto
              </a>
            </li>
          )}
        </ul>
      </div>
    </header>
  )
}
