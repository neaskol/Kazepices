import { BrowserRouter } from 'react-router-dom'

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
        <OrganizationSchema />
        <NoiseOverlay />
        <header>
          <Navbar />
        </header>
        <main>
          <AppRouter />
        </main>
        <Footer />
        <WhatsAppFloat />
      </BrowserRouter>
    </ErrorBoundary>
  )
}
