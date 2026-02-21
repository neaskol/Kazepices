import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import ScrollToTop from './components/ScrollToTop'
import HomePage from './components/HomePage'

const ProductsPage = lazy(() => import('./ProductsPage'))
const AboutPage = lazy(() => import('./AboutPage'))
const ContactPage = lazy(() => import('./ContactPage'))
const NotFoundPage = lazy(() => import('./components/NotFoundPage'))

function LoadingSpinner() {
  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-madagascar border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produits" element={<ProductsPage />} />
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  )
}
