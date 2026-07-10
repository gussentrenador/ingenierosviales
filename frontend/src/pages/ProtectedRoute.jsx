import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user } = useAuth()

  if (user === undefined) {
    return <div className="flex min-h-screen items-center justify-center text-slate-500">Verificando sesión…</div>
  }
  if (user === null) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}
