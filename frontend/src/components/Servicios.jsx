import { useContent } from '../context/ContentContext'

export default function Servicios() {
  const { content } = useContent()

  const services = [1, 2, 3].map((n) => ({
    title: content[`service_${n}_title`] || `Servicio ${n}`,
    text: content[`service_${n}_text`] || 'Descripción del servicio.',
  }))

  return (
    <section id="servicios" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold text-slate-900">Nuestros servicios</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {services.map((s, i) => (
            <div key={i} className="rounded-lg bg-white p-8 text-center shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-3 text-slate-600">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
