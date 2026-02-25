import { BrowserRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import ErrorBoundary from './components/ErrorBoundary'
import NoiseOverlay from './components/NoiseOverlay'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import { OrganizationSchema } from './components/StructuredData'
import AppRouter from './AppRouter'

function AppContent() {
  const { t } = useTranslation()
  return (
    <>
      <a href="#main-content" className="skip-link">
        {t('common.skipLink')}
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
    </>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  )
}
