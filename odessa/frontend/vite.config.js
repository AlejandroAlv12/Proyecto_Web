import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // todo lo que empiece con /api se envía al backend
      '/api': {
        target: 'http://localhost:5050',
        changeOrigin: true
        // rewrite: (p) => p.replace(/^\/api/, '/api') // normalmente no hace falta
      }
    }
  }
})
