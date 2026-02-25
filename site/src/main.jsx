import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gsap } from 'gsap'
import i18n from './i18n'
import './index.css'
import App from './App.jsx'

document.documentElement.lang = i18n.language?.startsWith('fr') ? 'fr' : 'en'

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.defaults({ duration: 0, ease: 'none' })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
