import { useContent } from '../context/ContentContext'
import { assetUrl } from '../api/client'

export default function Nosotros() {
  const { content } = useContent()
  const img = assetUrl(content.about_image)

  return (
    <section id="nosotros" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid items-center gap-10 sm:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            {content.about_title || 'Sobre nosotros'}
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            {content.about_text ||
              'Somos una empresa de ingeniería con años de experiencia entregando soluciones técnicas confiables para clientes exigentes.'}
          </p>
        </div>
        <div className="aspect-video overflow-hidden rounded-lg bg-slate-200">
          {img && <img src={img} alt="Nuestro equipo" className="h-full w-full object-cover" />}
        </div>
      </div>
    </section>
  )
}
