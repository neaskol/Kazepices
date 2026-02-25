import { useTranslation } from 'react-i18next'
import usePageMeta from '../hooks/usePageMeta'
import { LocalBusinessSchema } from './StructuredData'

import Hero from './Hero'
import Engagements from './Engagements'
import VideoSection from './VideoSection'
import Philosophy from './Philosophy'
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
      <Engagements />
      <VideoSection />
      <Philosophy />
      <Products />
      <Protocol />
      <ContactCTA />
    </>
  )
}
