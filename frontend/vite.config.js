import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        // En local, backend/ se sirve como si fuera la raíz (equivale a public_html/api en cPanel)
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
