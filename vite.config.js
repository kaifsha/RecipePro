import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    hmr: {
      overlay: false
    }
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['axios', 'react-router-dom'],
  },
})
