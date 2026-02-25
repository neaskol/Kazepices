import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { findProductBySlug, productSlug } from '../data/products'

const ROUTE_MAP = {
  fr: {
    products: '/produits',
    about: '/a-propos',
    contact: '/contact',
  },
  en: {
    products: '/products',
    about: '/about',
    contact: '/contact',
  },
}

export function useLanguageRouter() {
  const { i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en'

  const routes = ROUTE_MAP[lang]

  const switchLanguage = useCallback((newLang) => {
    const currentPath = location.pathname
    const fromRoutes = ROUTE_MAP[lang]
    const toRoutes = ROUTE_MAP[newLang]

    let newPath = currentPath

    for (const [key, fromPath] of Object.entries(fromRoutes)) {
      if (currentPath === fromPath) {
        newPath = toRoutes[key]
        break
      }
      if (currentPath.startsWith(fromPath + '/')) {
        const slug = currentPath.slice(fromPath.length + 1)
        // Translate product slug to target language
        if (key === 'products') {
          const product = findProductBySlug(slug)
          if (product) {
            newPath = toRoutes[key] + '/' + productSlug(product, newLang)
            break
          }
        }
        newPath = toRoutes[key] + '/' + slug
        break
      }
    }

    i18n.changeLanguage(newLang)
    document.documentElement.lang = newLang
    navigate(newPath, { replace: true })
  }, [i18n, lang, location.pathname, navigate])

  return { lang, routes, switchLanguage }
}

export function useProductPath() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en'
  return ROUTE_MAP[lang].products
}
