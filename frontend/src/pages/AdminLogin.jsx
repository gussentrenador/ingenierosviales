import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await login(username, password)
      navigate('/admin')
    } catch {
      setError('Usuario o contraseña incorrectos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-lg bg-white p-8 shadow">
        <h1 className="text-xl font-bold text-slate-900">Panel de administración</h1>
        <p className="mt-1 text-sm text-slate-500">Inicia sesión para editar el sitio.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Usuario</label>
            <input
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Contraseña</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-md bg-sky-500 px-4 py-2 font-semibold text-white hover:bg-sky-400 disabled:opacity-60 transition-colors"
        >
          {loading ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}
