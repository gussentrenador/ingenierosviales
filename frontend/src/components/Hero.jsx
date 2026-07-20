import { useContent } from '../context/ContentContext'
import { assetUrl } from '../api/client'
import { ArrowRightIcon, ChevronDownIcon, CompassIcon } from './icons'

export default function Hero() {
  const { content } = useContent()
  const bg = assetUrl(content.hero_image)

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        {bg ? (
          <img
            src={bg}
            alt=""
            className="animate-ken-burns h-full w-full object-cover"
            fetchPriority="high"
          />
        ) : (
          <div className="bg-blueprint-grid h-full w-full bg-slate-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-28 pb-40 text-center">
        <span className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400">
          <CompassIcon className="h-4 w-4" />
          Ingeniería vial y obras viales
        </span>

        <h1
          className="animate-fade-in-up mx-auto mt-6 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl"
          style={{ animationDelay: '120ms' }}
        >
          {content.hero_title || 'Ingeniería vial con precisión y resultados'}
        </h1>

        <p
          className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-lg text-slate-300"
          style={{ animationDelay: '240ms' }}
        >
          {content.hero_subtitle ||
            'Diseñamos, pavimentamos y supervisamos obras viales con los más altos estándares de calidad y seguridad.'}
        </p>

        <div
          className="animate-fade-in-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ animationDelay: '360ms' }}
        >
          {content.show_contact_cta !== '0' && (
            <a
              href="#contacto"
              className="group inline-flex items-center gap-2 rounded-md bg-amber-500 px-7 py-3.5 font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-400 hover:shadow-amber-400/30"
            >
              Contáctanos
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          )}
          <a
            href="#proyectos"
            className="inline-flex items-center gap-2 rounded-md border border-white/25 px-7 py-3.5 font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
          >
            Ver proyectos
          </a>
        </div>
      </div>

      <a
        href="#nosotros"
        aria-label="Bajar a la siguiente sección"
        className="animate-bounce-y absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 text-slate-400 hover:text-amber-400 sm:block"
      >
        <ChevronDownIcon className="h-7 w-7" />
      </a>
    </section>
  )
}
