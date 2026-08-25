import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import { assetUrl } from '../api/client'
import Reveal from './Reveal'
import ProjectCollage from './ProjectCollage'
import Lightbox from './Lightbox'
import { sanitizeHtml } from '../utils/sanitizeHtml'
import { cardWidthClass } from '../utils/adaptiveGrid'

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
  const [lightbox, setLightbox] = useState(null) // { projectIndex, photoIndex } | null

  const activeImages = lightbox ? (projects[lightbox.projectIndex].images || []).map(assetUrl) : []

  const navigate = (delta) => {
    setLightbox((lb) => {
      if (!lb) return lb
      const len = activeImages.length
      return { ...lb, photoIndex: (lb.photoIndex + delta + len) % len }
    })
  }

  if (content.show_proyectos === '0') return null

  return (
    <section id="proyectos" className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
          {content.proyectos_eyebrow || 'Nuestro trabajo'}
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
          {content.proyectos_heading || 'Proyectos destacados'}
        </h2>
        <p className="mt-3 text-slate-600">{content.proyectos_subtitle || 'Imágenes de obras y tipo de proyectos'}</p>
      </Reveal>

      <div className="mt-14 flex flex-wrap justify-center gap-8">
        {projects.map((p, i) => (
          <Reveal
            key={i}
            delay={i * 120}
            className={cardWidthClass(projects.length)}
          >
            <div className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
              <div className="aspect-[4/3] w-full">
                <ProjectCollage
                  images={(p.images || []).map(assetUrl)}
                  onOpen={(photoIndex) => setLightbox({ projectIndex: i, photoIndex })}
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-slate-900">{p.title}</h3>
                {p.text && (
                  <div
                    className="rich-content mt-2 text-sm leading-relaxed text-slate-600"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(p.text) }}
                  />
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {lightbox && activeImages.length > 0 && (
        <Lightbox
          images={activeImages}
          index={lightbox.photoIndex}
          onClose={() => setLightbox(null)}
          onNavigate={navigate}
        />
      )}
    </section>
  )
}
