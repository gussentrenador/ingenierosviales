import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined) // undefined = checking, null = logged out

  const checkSession = () =>
    api
      .get('/auth.php?action=me')
      .then((res) => setUser(res.data.user || null))
      .catch(() => setUser(null))

  useEffect(() => {
    checkSession()
  }, [])

  const login = async (username, password) => {
    const res = await api.post('/auth.php?action=login', { username, password })
    setUser(res.data.user)
    return res.data.user
  }

  const logout = async () => {
    await api.post('/auth.php?action=logout')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
