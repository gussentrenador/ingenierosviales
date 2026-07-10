import { useContent } from '../context/ContentContext'
import { assetUrl } from '../api/client'

export default function Proyectos() {
  const { content } = useContent()

  const projects = [1, 2, 3].map((n) => ({
    title: content[`project_${n}_title`] || `Proyecto ${n}`,
    text: content[`project_${n}_text`] || 'Descripción breve del proyecto.',
    image: assetUrl(content[`project_${n}_image`]),
  }))

  return (
    <section id="proyectos" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold text-slate-900">Proyectos destacados</h2>
      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {projects.map((p, i) => (
          <div key={i} className="overflow-hidden rounded-lg shadow-sm">
            <div className="aspect-video bg-slate-200">
              {p.image && <img src={p.image} alt={p.title} className="h-full w-full object-cover" />}
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{p.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
