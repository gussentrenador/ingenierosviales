import { useContent } from '../context/ContentContext'
import { assetUrl } from '../api/client'

export default function Hero() {
  const { content } = useContent()
  const bg = assetUrl(content.hero_image)

  return (
    <section
      id="top"
      className="relative flex min-h-[70vh] items-center justify-center bg-slate-900 text-white bg-cover bg-center"
      style={bg ? { backgroundImage: `linear-gradient(rgba(15,23,42,.75),rgba(15,23,42,.75)), url(${bg})` } : undefined}
    >
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {content.hero_title || 'Ingeniería con precisión y resultados'}
        </h1>
        <p className="mt-6 text-lg text-slate-200">
          {content.hero_subtitle ||
            'Diseñamos, construimos y supervisamos proyectos de ingeniería con los más altos estándares de calidad.'}
        </p>
        <a
          href="#contacto"
          className="mt-8 inline-block rounded-md bg-sky-500 px-6 py-3 font-semibold hover:bg-sky-400 transition-colors"
        >
          Solicitar cotización
        </a>
      </div>
    </section>
  )
}
