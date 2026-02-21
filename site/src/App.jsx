import { BrowserRouter } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'

import ErrorBoundary from './components/ErrorBoundary'
import NoiseOverlay from './components/NoiseOverlay'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import { OrganizationSchema } from './components/StructuredData'
import AppRouter from './AppRouter'

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <OrganizationSchema />
        <NoiseOverlay />
        <header>
          <Navbar />
        </header>
        <main id="main-content">
          <AppRouter />
        </main>
        <Footer />
        <WhatsAppFloat />
        <SpeedInsights />
      </BrowserRouter>
    </ErrorBoundary>
  )
}
