import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Локально сайт работает из корня. GitHub Actions автоматически передаёт
  // --base=/имя-репозитория/ при production-сборке для Pages.
  base: '/',
})
