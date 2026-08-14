import { useContent } from '../context/ContentContext'
import { assetUrl } from '../api/client'
import Reveal from './Reveal'
import ProjectCarousel from './ProjectCarousel'

const DEFAULT_PROJECTS = [
  {
    title: 'Conservaciones Viales Periódicas',
    text: 'Tratamientos superficiales dobles y reposición de pavimentos asfálticos en calzadas y bermas, con bacheos, sellado de grietas, señalización y demarcación.',
    images: [],
  },
  {
    title: 'Obras en Autopistas Concesionadas',
    text: 'Desnivelación de enlaces viales en Ruta 5 Norte y Sur, y reposición de pavimentos de hormigón en calzadas de autopistas concesionadas.',
    images: [],
  },
  {
    title: 'Obras en Aeropuertos',
    text: 'Reparación y ensanche de pistas de rodado y pista principal mediante fresado, nueva base granular y pavimento asfáltico.',
    images: [],
  },
]

// Compatibilidad con sitios creados antes del editor dinámico de proyectos,
// que guardaban hasta 3 proyectos en campos sueltos (project_1_title, etc).
function legacyProjects(content) {
  const list = [1, 2, 3]
    .map((n) => ({
      title: content[`project_${n}_title`],
      text: content[`project_${n}_text`],
      images: content[`project_${n}_image`] ? [content[`project_${n}_image`]] : [],
    }))
    .filter((p) => p.title || p.text || p.images.length > 0)
  return list.length > 0 ? list : null
}

function parseProjects(content) {
  if (content.projects_json) {
    try {
      const parsed = JSON.parse(content.projects_json)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    } catch {
      // ignorar JSON inválido y seguir con los siguientes fallbacks
    }
  }
  return legacyProjects(content) || DEFAULT_PROJECTS
}

export default function Proyectos() {
  const { content } = useContent()
  const projects = parseProjects(content)

  return (
    <section id="proyectos" className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">
          Nuestro trabajo
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
          Proyectos destacados
        </h2>
        <p className="mt-3 text-slate-600">Imágenes de obras y tipo de proyectos</p>
      </Reveal>

      <div className="mt-14 flex flex-wrap justify-center gap-8">
        {projects.map((p, i) => (
          <Reveal
            key={i}
            delay={i * 120}
            className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]"
          >
            <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-200 shadow-sm">
              <ProjectCarousel images={(p.images || []).map(assetUrl)} alt={p.title} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-6 transition-transform duration-300 group-hover:translate-y-0">
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
