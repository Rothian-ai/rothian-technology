import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (/framer-motion|lenis/.test(id)) return 'vendor-motion'
            if (/react|scheduler/.test(id)) return 'vendor-react'
          }
        },
      },
    },
  },
})
