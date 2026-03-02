import { useTranslation } from 'react-i18next'
import usePageMeta from '../hooks/usePageMeta'
import { LocalBusinessSchema } from './StructuredData'

import Hero from './Hero'
import VideoSection from './VideoSection'
import Products from './Products'
import Protocol from './Protocol'
import ContactCTA from './ContactCTA'

export default function HomePage() {
  const { t } = useTranslation()

  usePageMeta({
    title: t('homeMeta.title'),
    description: t('homeMeta.description'),
    canonicalPath: '/',
  })

  return (
    <>
      <LocalBusinessSchema />
      <Hero />
      <VideoSection />
      <Products />
      <Protocol />
      <ContactCTA />
    </>
  )
}
