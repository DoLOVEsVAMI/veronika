import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/montserrat/cyrillic-400.css'
import '@fontsource/montserrat/cyrillic-500.css'
import '@fontsource/montserrat/cyrillic-600.css'
import '@fontsource/montserrat/cyrillic-700.css'
import '@fontsource/montserrat/cyrillic-800.css'
import App from './app/App'
import './styles/globals.css'
import './styles/animations.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
