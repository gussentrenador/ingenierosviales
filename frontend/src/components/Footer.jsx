import { useContent } from '../context/ContentContext'

export default function Footer() {
  const { content } = useContent()

  return (
    <footer className="bg-slate-900 py-8 text-center text-sm text-slate-400">
      <p>
        {content.footer_text ||
          `© ${new Date().getFullYear()} ${content.company_name || 'Empresa de Ingeniería'}. Todos los derechos reservados.`}
      </p>
    </footer>
  )
}
