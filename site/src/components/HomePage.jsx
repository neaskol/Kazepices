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
  usePageMeta({
    title: 'Kazépices Madagascar — Épices Naturelles & Artisanales de Madagascar',
    description: 'Découvrez nos épices 100% naturelles de Madagascar : curcuma, poivre noir, gingembre, moringa, cannelle. Livraison internationale.',
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
