import { useContent } from '../context/ContentContext'
import { assetUrl } from '../api/client'
import Reveal from './Reveal'

export default function Proyectos() {
  const { content } = useContent()

  const DEFAULTS = [
    {
      title: 'Conservaciones Viales Periódicas',
      text: 'Tratamientos superficiales dobles y reposición de pavimentos asfálticos en calzadas y bermas, con bacheos, sellado de grietas, señalización y demarcación.',
    },
    {
      title: 'Obras en Autopistas Concesionadas',
      text: 'Desnivelación de enlaces viales en Ruta 5 Norte y Sur, y reposición de pavimentos de hormigón en calzadas de autopistas concesionadas.',
    },
    {
      title: 'Obras en Aeropuertos',
      text: 'Reparación y ensanche de pistas de rodado y pista principal mediante fresado, nueva base granular y pavimento asfáltico.',
    },
  ]

  const projects = [1, 2, 3].map((n) => ({
    title: content[`project_${n}_title`] || DEFAULTS[n - 1].title,
    text: content[`project_${n}_text`] || DEFAULTS[n - 1].text,
    image: assetUrl(content[`project_${n}_image`]),
  }))

  return (
    <section id="proyectos" className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">
          Nuestro trabajo
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
          Proyectos destacados
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-8 sm:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={i} delay={i * 120}>
            <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-200 shadow-sm">
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="bg-blueprint-grid flex h-full w-full items-center justify-center bg-slate-800 text-sm text-slate-400">
                  Imagen del proyecto
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 transition-transform duration-300 group-hover:translate-y-0">
                <h3 className="font-display text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-slate-300 opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100">
                  {p.text}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
