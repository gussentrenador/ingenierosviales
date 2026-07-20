import { useReveal } from '../hooks/useReveal'

// Envuelve cualquier contenido y lo anima al entrar en el viewport.
// direction: 'up' (default) | 'left' | 'right'
export default function Reveal({ children, direction = 'up', delay = 0, className = '' }) {
  const [ref, visible] = useReveal()
  const directionClass = direction === 'left' ? 'reveal-left' : direction === 'right' ? 'reveal-right' : ''

  return (
    <div
      ref={ref}
      className={`reveal ${directionClass} ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}
