import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react( ),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'], // Adjust as needed
      manifest: {
        name: 'Albaaj App', // Replace with actual app name
        short_name: 'Albaaj', // Replace with actual short name
        description: 'My Awesome Albaaj App description', // Replace with actual description
        theme_color: '#ffffff', // Adjust theme color
        background_color: '#ffffff', // Adjust background color
        icons: [
          {
            src: 'pwa-192x192.png', // Path relative to public directory
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png', // Path relative to public directory
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png', // Maskable icon
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        // Workbox options for generateSW
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      devOptions: {
        enabled: true // Enable PWA in development for testing
      }
    })
  ],
  

  // إضافة دعم ملفات TypeScript
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  
  server: {
    host: true // يسمح لواجهة React بالاستماع من داخل Docker
  }
})
