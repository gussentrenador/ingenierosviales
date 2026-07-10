import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import api from '../api/client'

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const reload = useCallback(() => {
    setLoading(true)
    return api
      .get('/content.php')
      .then((res) => setContent(res.data.content || {}))
      .catch(() => setError('No se pudo cargar el contenido del sitio.'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  return (
    <ContentContext.Provider value={{ content, loading, error, reload }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent debe usarse dentro de <ContentProvider>')
  return ctx
}
