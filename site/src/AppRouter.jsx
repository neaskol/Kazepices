import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import ScrollToTop from './components/ScrollToTop'
import HomePage from './components/HomePage'
import { PageSkeleton } from './components/Skeleton'

const ProductsPage = lazy(() => import('./ProductsPage'))
const ProductDetailPage = lazy(() => import('./ProductDetailPage'))
const AboutPage = lazy(() => import('./AboutPage'))
const ContactPage = lazy(() => import('./ContactPage'))
const NotFoundPage = lazy(() => import('./components/NotFoundPage'))

export default function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* French routes */}
          <Route path="/produits" element={<ProductsPage />} />
          <Route path="/produits/:slug" element={<ProductDetailPage />} />
          <Route path="/a-propos" element={<AboutPage />} />
          {/* English routes */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Shared */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  )
}
