import { useEffect } from 'react'

const BASE_URL = 'https://kazepices.com'
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`
const SITE_NAME = 'Kazepices Madagascar'

function setMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}

export default function usePageMeta({
  title,
  description,
  ogImage = DEFAULT_OG_IMAGE,
  canonicalPath = '/',
  ogType = 'website',
}) {
  useEffect(() => {
    document.title = title

    const canonicalUrl = `${BASE_URL}${canonicalPath}`

    // Meta description
    setMeta('name', 'description', description)

    // Open Graph
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:image', ogImage)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:type', ogType)
    setMeta('property', 'og:locale', 'fr_FR')
    setMeta('property', 'og:site_name', SITE_NAME)

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', ogImage)

    // Canonical
    setCanonical(canonicalUrl)
  }, [title, description, ogImage, canonicalPath, ogType])
}
