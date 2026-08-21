// Arma automáticamente una grilla de fotos (collage) según cuántas haya (1 a 10+).
// Para 3 y 5 fotos usa una combinación de una foto grande + chicas, el resto son
// grillas parejas. Sin fotos, muestra el placeholder.
const CURATED_SPANS = {
  3: [
    { gridColumn: '1 / 2', gridRow: '1 / 3' },
    { gridColumn: '2 / 3', gridRow: '1 / 2' },
    { gridColumn: '2 / 3', gridRow: '2 / 3' },
  ],
  5: [
    { gridColumn: '1 / 2', gridRow: '1 / 3' },
    { gridColumn: '2 / 3', gridRow: '1 / 2' },
    { gridColumn: '3 / 4', gridRow: '1 / 2' },
    { gridColumn: '2 / 3', gridRow: '2 / 3' },
    { gridColumn: '3 / 4', gridRow: '2 / 3' },
  ],
}

const GRID_SIZE = { 1: [1, 1], 2: [2, 1], 4: [2, 2], 6: [3, 2], 7: [4, 2], 8: [4, 2], 9: [3, 3], 10: [5, 2] }

function getGridConfig(n) {
  if (CURATED_SPANS[n]) {
    return { cols: n === 3 ? 2 : 3, rows: 2, spans: CURATED_SPANS[n] }
  }
  const [cols, rows] = GRID_SIZE[n] || [Math.ceil(Math.sqrt(n)), Math.ceil(n / Math.ceil(Math.sqrt(n)))]
  return { cols, rows, spans: null }
}

export default function ProjectCollage({ images, onOpen }) {
  if (!images || images.length === 0) {
    return (
      <div className="bg-blueprint-grid flex h-full w-full items-center justify-center bg-slate-800 text-sm text-slate-400">
        Imagen del proyecto
      </div>
    )
  }

  const { cols, rows, spans } = getGridConfig(images.length)

  return (
    <div
      className="grid h-full w-full gap-0.5 bg-slate-200"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
    >
      {images.map((src, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onOpen(i)}
          aria-label={`Ampliar foto ${i + 1} de ${images.length}`}
          className="group/tile relative block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-400"
          style={spans ? spans[i] : undefined}
        >
          <img src={src} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover/tile:scale-110" />
          <div className="absolute inset-0 bg-slate-950/0 transition-colors group-hover/tile:bg-slate-950/15" />
        </button>
      ))}
    </div>
  )
}
