import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'assets/*'],
      manifest: {
        name: 'Tienda Cositas Divinas - Parroquia de la Santa Cruz',
        short_name: 'Cositas Divinas',
        description: 'Catálogo de productos religiosos en apoyo al XII Retiro de Emaús Mujeres',
        theme_color: '#f8f4ea',
        background_color: '#f8f4ea',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        // Cachea todas las imágenes, scripts, fuentes y estilos automáticamente
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg}']
      }
    })
  ]
})