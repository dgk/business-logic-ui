import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/business-logic': {
        target: 'https://django-business-logic-demo.dev.dgk.su',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: ['node_modules/**', 'dist/**', 'cypress/**', 'old/**', 'old-v1/**', 'old-v2/**'],
  },
})
