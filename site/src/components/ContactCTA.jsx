import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { Mail, MessageCircle, MapPin, Globe } from 'lucide-react'
import { whatsappUrl } from '../data/config'

gsap.registerPlugin(ScrollTrigger)

export default function ContactCTA() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-cta-content', { y: 40, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto text-center contact-cta-content">
        <span className="font-mono text-xs text-moss tracking-widest uppercase">Contact</span>
        <h2 className="font-heading font-extrabold text-forest text-3xl md:text-5xl mt-3 tracking-tight">
          Prêt à commander ?
        </h2>
        <p className="font-drama italic text-madagascar text-2xl md:text-4xl mt-2">
          Parlons épices.
        </p>
        <p className="font-body text-warm-gray text-base mt-6 max-w-lg mx-auto leading-relaxed">
          Commandez directement via WhatsApp ou envoyez-nous un message via notre formulaire de contact. Nous répondons dans les 24 heures.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <Link
            to="/contact"
            className="btn-magnetic inline-flex items-center gap-2 bg-madagascar text-white font-heading font-semibold px-7 py-3.5 text-sm"
            style={{ borderRadius: '2rem' }}
          >
            <span className="btn-bg bg-madagascar-light" style={{ borderRadius: '2rem' }} />
            <span className="relative z-10 flex items-center gap-2">
              <Mail size={16} />
              Nous écrire
            </span>
          </Link>
          <a
            href={whatsappUrl('Bonjour Kazépices, je souhaite en savoir plus sur vos produits.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic inline-flex items-center gap-2 bg-[#25D366] text-white font-heading font-semibold px-7 py-3.5 text-sm"
            style={{ borderRadius: '2rem' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <MessageCircle size={16} />
              WhatsApp
            </span>
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-warm-gray font-body">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-moss" />
            Madagascar
          </div>
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-moss" />
            Livraison internationale
          </div>
        </div>
      </div>
    </section>
  )
}
