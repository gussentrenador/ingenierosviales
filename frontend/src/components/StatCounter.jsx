import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

// Extrae la parte numérica de un valor tipo "15+" o "98%" para animarla,
// conservando el prefijo/sufijo no numérico tal cual (ej. "+", "%").
function parseValue(raw) {
  const match = String(raw).match(/(\d+)/)
  if (!match) return { number: null, prefix: '', suffix: String(raw) }
  const number = parseInt(match[1], 10)
  const prefix = String(raw).slice(0, match.index)
  const suffix = String(raw).slice(match.index + match[1].length)
  return { number, prefix, suffix }
}

export default function StatCounter({ value, label }) {
  const [ref, visible] = useReveal()
  const { number, prefix, suffix } = parseValue(value)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!visible || number === null) return
    const duration = 1400
    const start = performance.now()

    let frame
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * number))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [visible, number])

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl font-extrabold text-white sm:text-5xl">
        {prefix}
        {number === null ? suffix : count}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-medium uppercase tracking-wide text-slate-300">{label}</p>
    </div>
  )
}
