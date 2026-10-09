import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// When running in Docker, VITE_BACKEND_URL=http://backend:5000 (Compose service name).
// When running locally (bare metal), falls back to localhost:5000.
const backendUrl = process.env.VITE_BACKEND_URL || 'http://localhost:5000';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    // Bind to all interfaces so Docker port-forwarding works
    host: true,
    port: 5173,
    proxy: {
      // REST API
      '/api': {
        target: backendUrl,
        changeOrigin: true,
      },
      // Socket.IO (real-time auction bidding)
      '/socket.io': {
        target: backendUrl,
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
