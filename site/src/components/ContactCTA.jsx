import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { Mail, MessageCircle, MapPin, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLanguageRouter } from '../hooks/useLanguageRouter'
import { whatsappUrl } from '../data/config'

gsap.registerPlugin(ScrollTrigger)

export default function ContactCTA() {
  const sectionRef = useRef(null)
  const { t } = useTranslation()
  const { routes } = useLanguageRouter()

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
        <span className="font-mono text-xs text-moss dark:text-moss-light tracking-widest uppercase">{t('contactCTA.sectionLabel')}</span>
        <h2 className="font-heading font-extrabold text-forest dark:text-cream text-3xl md:text-5xl mt-3 tracking-tight">
          {t('contactCTA.heading')}
        </h2>
        <p className="font-drama italic text-madagascar text-2xl md:text-4xl mt-2">
          {t('contactCTA.tagline')}
        </p>
        <p className="font-body text-warm-gray dark:text-white/60 text-base mt-6 max-w-lg mx-auto leading-relaxed">
          {t('contactCTA.description')}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <Link
            to={routes.contact}
            className="btn-magnetic inline-flex items-center gap-2 bg-madagascar text-white font-heading font-semibold px-7 py-3.5 text-sm rounded-4xl"
          >
            <span className="btn-bg bg-madagascar-light rounded-4xl" />
            <span className="relative z-10 flex items-center gap-2">
              <Mail size={16} />
              {t('contactCTA.ctaContact')}
            </span>
          </Link>
          <a
            href={whatsappUrl(t('contactCTA.whatsappMsg'))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic inline-flex items-center gap-2 bg-[#25D366] text-white font-heading font-semibold px-7 py-3.5 text-sm rounded-4xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              <MessageCircle size={16} />
              {t('contactCTA.ctaWhatsApp')}
            </span>
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-warm-gray dark:text-white/60 font-body">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-moss" aria-hidden="true" />
            {t('common.madagascar')}
          </div>
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-moss" aria-hidden="true" />
            {t('common.internationalShipping')}
          </div>
        </div>
      </div>
    </section>
  )
}
