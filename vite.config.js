import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    host: true,
    allowedHosts: [".ngrok-free.app"], // ✅ Allow external tunneling
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      strategies: "injectManifest", // 👈 Required for custom SW
      injectManifest: {
        swSrc: "public/sw.js",
      },
      manifest: {
        name: 'FCM PWA App',
        short_name: 'FCM PWA',
        description: 'Push notification demo with Firebase and Vite PWA',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png', // place logo.png in /public
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      }
    }),
  ],
});
