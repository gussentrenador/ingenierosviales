import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Nosotros from '../components/Nosotros'
import Servicios from '../components/Servicios'
import Proyectos from '../components/Proyectos'
import Contacto from '../components/Contacto'
import Footer from '../components/Footer'
import { useContent } from '../context/ContentContext'

export default function Landing() {
  const { loading, error } = useContent()

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-slate-500">Cargando…</div>
  }

  return (
    <div className="min-h-screen bg-white">
      {error && (
        <div className="bg-amber-100 px-4 py-2 text-center text-sm text-amber-800">{error}</div>
      )}
      <Navbar />
      <Hero />
      <Nosotros />
      <Servicios />
      <Proyectos />
      <Contacto />
      <Footer />
    </div>
  )
}
