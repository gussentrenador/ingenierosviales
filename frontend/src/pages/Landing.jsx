import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import Nosotros from '../components/Nosotros'
import WhyUs from '../components/WhyUs'
import Servicios from '../components/Servicios'
import Proyectos from '../components/Proyectos'
import Clientes from '../components/Clientes'
import Equipo from '../components/Equipo'
import Contacto from '../components/Contacto'
import Footer from '../components/Footer'
import MaintenancePage from '../components/MaintenancePage'
import { useContent } from '../context/ContentContext'
import { parseSectionOrder } from '../components/admin/SectionOrderEditor'

const SECTION_COMPONENTS = {
  stats: StatsBar,
  nosotros: Nosotros,
  whyus: WhyUs,
  servicios: Servicios,
  proyectos: Proyectos,
  clientes: Clientes,
  equipo: Equipo,
  contacto: Contacto,
}

export default function Landing() {
  const { content, loading, error } = useContent()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        Cargando…
      </div>
    )
  }

  if (content.maintenance_mode === '1') {
    return <MaintenancePage />
  }

  const order = parseSectionOrder(content.section_order_json)

  return (
    <div className="min-h-screen bg-white">
      {error && (
        <div className="bg-amber-100 px-4 py-2 text-center text-sm text-amber-800">{error}</div>
      )}
      <Navbar />
      <Hero />
      {order.map((key, i) => {
        const Component = SECTION_COMPONENTS[key]
        if (!Component) return null
        return <Component key={key} overlapHero={key === 'stats' && i === 0} />
      })}
      {content.show_footer !== '0' && <Footer />}
    </div>
  )
}
