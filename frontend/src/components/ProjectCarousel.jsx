import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from './icons'

export default function ProjectCarousel({ images, alt }) {
  const [index, setIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="bg-blueprint-grid flex h-full w-full items-center justify-center bg-slate-800 text-sm text-slate-400">
        Imagen del proyecto
      </div>
    )
  }

  const prev = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  }
  const next = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1))
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        src={images[index]}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Foto anterior"
            onClick={prev}
            className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/60 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-slate-950/80"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Foto siguiente"
            onClick={next}
            className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/60 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-slate-950/80"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>

          <div className="absolute inset-x-0 top-3 z-10 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-4 bg-amber-400' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
