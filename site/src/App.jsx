import { BrowserRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import ErrorBoundary from './components/ErrorBoundary'
import NoiseOverlay from './components/NoiseOverlay'
import Navbar from './components/Navbar'
import LeftControls from './components/LeftControls'
import Footer from './components/Footer'
import { OrganizationSchema } from './components/StructuredData'
import AppRouter from './AppRouter'
import { ThemeProvider } from './context/ThemeContext'

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
        <LeftControls />
      </header>
      <main id="main-content">
        <AppRouter />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
