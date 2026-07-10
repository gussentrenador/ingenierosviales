import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
})

export function assetUrl(path) {
  if (!path) return null
  if (/^https?:\/\//.test(path)) return path
  return `${API_BASE}/${path.replace(/^\/+/, '')}`
}

export default api
