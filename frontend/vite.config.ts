import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE_PATH || `/https://algorithm-visualizer-emzo-7ibojy0gd-shannxnxs-projects.vercel.app` //for deployment
})
