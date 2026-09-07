import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Rothian Data was authored standalone with an `@/` alias onto its own src.
    // Scoped to `@data/` here so it cannot collide with the main site or the
    // other brands as they move in.
    alias: { '@data': path.resolve(import.meta.dirname, './src/brands/data') },
  },
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
