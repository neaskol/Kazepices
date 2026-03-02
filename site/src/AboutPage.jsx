import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguageRouter } from './hooks/useLanguageRouter'
import usePageMeta from './hooks/usePageMeta'
import { BreadcrumbSchema } from './components/StructuredData'
import { ArrowLeft, ArrowRight, Leaf, Sprout, HandHeart, MapPin, MessageCircle, Quote } from 'lucide-react'

import ikbalImg from './assets/ikbal-charifou.webp'

gsap.registerPlugin(ScrollTrigger)

/* ─── HERO ─── */
function AboutHero() {
  const heroRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })
      tl.fromTo('.about-hero-tag', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
        .fromTo('.about-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.3')
        .fromTo('.about-hero-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative bg-charcoal overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-16 lg:px-24"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-15 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1570742544137-3a469196c32b?w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/85 to-charcoal/95" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <Link
          to="/"
          className="about-hero-tag inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/70 text-xs font-mono px-4 py-1.5 mb-8 hover:bg-white/15 transition-colors rounded-4xl"
        >
          <ArrowLeft size={14} />
          {t('about.heroBackLink', 'Retour à l\'accueil')}
        </Link>

        <h1 className="about-hero-title font-heading font-extrabold text-white text-4xl md:text-6xl tracking-tight leading-[1.1]">
          {t('about.heroHeading1')}{' '}
          <span className="font-drama italic text-madagascar-light">{t('about.heroHeading2')}</span>
        </h1>

        <p className="about-hero-desc font-body text-white/70 text-base md:text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
          {t('about.heroDesc')}
        </p>
      </div>
    </section>
  )
}

/* ─── ORIGIN STORY ─── */
function OriginStory() {
  const sectionRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.origin-text', { y: 40, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
      gsap.fromTo('.origin-image', { y: 50, opacity: 0, scale: 0.95 }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.origin-image',
          start: 'top 80%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Text */}
        <div>
          <div className="origin-text">
            <span className="font-mono text-xs text-moss dark:text-moss-light tracking-widest uppercase">{t('about.originLabel')}</span>
            <h2 className="font-heading font-extrabold text-forest dark:text-cream text-3xl md:text-4xl mt-3 tracking-tight leading-tight">
              {t('about.originHeading1')}{' '}
              <span className="font-drama italic text-madagascar">{t('about.originHeading2')}</span>
            </h2>
          </div>

          <p className="origin-text font-body text-warm-gray dark:text-white/60 text-base mt-6 leading-relaxed">
            {t('about.originP1')}
          </p>

          <p className="origin-text font-body text-warm-gray dark:text-white/60 text-base mt-4 leading-relaxed">
            {t('about.originP2Start')}<span className="text-forest dark:text-moss-light font-semibold">{t('about.originP2Bold')}</span>{t('about.originP2End')}
          </p>

          <div className="origin-text flex items-center gap-4 mt-8">
            <div className="w-px h-12 bg-madagascar/30" />
            <p className="font-drama italic text-madagascar text-lg md:text-xl leading-relaxed">
              {t('about.originQuote')}
            </p>
          </div>
        </div>

        {/* Right: Image */}
        <div className="origin-image relative">
          <div className="overflow-hidden rounded-5xl">
            <img
              src="https://images.unsplash.com/photo-1564198729838-cb82ee0c733c?w=800&q=85"
              srcSet="
                https://images.unsplash.com/photo-1564198729838-cb82ee0c733c?w=400&q=80 400w,
                https://images.unsplash.com/photo-1564198729838-cb82ee0c733c?w=800&q=85 800w,
                https://images.unsplash.com/photo-1564198729838-cb82ee0c733c?w=1200&q=85 1200w"
              sizes="(max-width: 768px) 100vw, 50vw"
              alt={t('about.originImageAlt')}
              loading="lazy"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
              className="w-full h-[400px] md:h-[480px] object-cover"
            />
          </div>
          {/* Floating badge */}
          <div
            className="absolute -bottom-6 -left-4 md:-left-8 bg-cream dark:bg-charcoal border border-moss/15 px-6 py-4 shadow-lg rounded-3xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-madagascar/10 flex items-center justify-center">
                <MapPin size={18} className="text-madagascar" />
              </div>
              <div>
                <p className="font-heading font-bold text-forest dark:text-moss-light text-sm">{t('about.originBadgeTitle')}</p>
                <p className="font-mono text-xs text-warm-gray dark:text-white/65">{t('about.originBadgeDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FOUNDER ─── */
function Founder() {
  const sectionRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.founder-content', { y: 50, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-28 md:py-36 px-6 md:px-16 lg:px-24 bg-forest section-round mx-4 md:mx-8 overflow-hidden">
      {/* Subtle background */}
      <div
        className="absolute inset-0 opacity-8 bg-cover bg-center rounded-[inherit]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=1200&q=80')`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left: image area */}
          <div className="founder-content lg:col-span-2 flex justify-center order-2 lg:order-1">
            <div className="relative">
              <div
                className="w-72 md:w-80 bg-white/10 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center overflow-hidden rounded-5xl"
              >
                <img
                  src={ikbalImg}
                  alt={t('about.founderImageAlt')}
                  loading="lazy"
                  className="w-full object-cover"
                />
              </div>
              {/* Decorative ring */}
              <div
                className="absolute -inset-3 border border-white/10 pointer-events-none rounded-6xl"
              />
            </div>
          </div>

          {/* Right: text */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="founder-content">
              <span className="font-mono text-xs text-moss-light tracking-widest uppercase">{t('about.founderLabel')}</span>
              <h2 className="font-heading font-extrabold text-white text-3xl md:text-4xl mt-3 tracking-tight leading-tight">
                {t('about.founderHeading1')}
                <span className="font-drama italic text-madagascar-light">{t('about.founderHeading2')}</span>
              </h2>
            </div>

            <p className="founder-content font-body text-white/70 text-base mt-6 leading-relaxed">
              {t('about.founderDesc')}
            </p>

            <div className="founder-content mt-8 flex items-start gap-4 bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-3xl">
              <Quote size={24} className="text-madagascar-light flex-shrink-0 mt-1" />
              <p className="font-drama italic text-white/80 text-lg leading-relaxed">
                {t('about.founderQuote')}
              </p>
            </div>

            <p className="founder-content font-mono text-xs text-white/60 mt-6">
              {t('about.founderAttribution')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── BRIDGE TO THE WORLD ─── */
function BridgeSection() {
  const sectionRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.bridge-line', { y: 50, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-28 md:py-36 px-6 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        <p className="bridge-line font-mono text-xs text-moss dark:text-moss-light tracking-widest uppercase">{t('about.bridgeLabel')}</p>

        <h2 className="bridge-line font-drama italic text-forest dark:text-cream text-4xl md:text-6xl lg:text-7xl mt-6 leading-[1.1]">
          {t('about.bridgeHeading1')}{' '}
          <span className="text-madagascar">{t('about.bridgeHeading2')}</span>
        </h2>

        <p className="bridge-line font-body text-warm-gray dark:text-white/60 text-base md:text-lg mt-8 max-w-2xl mx-auto leading-relaxed">
          {t('about.bridgeDesc')}
        </p>

        {/* Visual bridge — decorative element */}
        <div className="bridge-line flex items-center justify-center gap-6 mt-12">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-moss rounded-full pulse-dot" />
            <span className="font-mono text-xs text-moss dark:text-moss-light">{t('about.bridgeFrom')}</span>
          </div>
          <div className="w-32 md:w-48 h-px bg-gradient-to-r from-moss via-madagascar to-forest" />
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-forest dark:text-moss-light">{t('about.bridgeTo')}</span>
            <div className="w-3 h-3 bg-forest dark:bg-moss-light rounded-full pulse-dot" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── CTA BOTTOM ─── */
function AboutCTA() {
  const sectionRef = useRef(null)
  const { t } = useTranslation()
  const { routes } = useLanguageRouter()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-cta-content', { y: 40, opacity: 0 }, {
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
    <section ref={sectionRef} className="pb-20 md:pb-28 px-6 md:px-16 lg:px-24">
      <div className="about-cta-content max-w-4xl mx-auto bg-forest section-round p-10 md:p-16 text-center">
        <span className="font-mono text-xs text-moss-light tracking-widest uppercase">{t('about.ctaLabel')}</span>
        <h2 className="font-heading font-extrabold text-white text-2xl md:text-4xl mt-3 tracking-tight">
          {t('about.ctaHeading1')}
          <span className="font-drama italic text-madagascar-light">{t('about.ctaHeading2')}</span>
        </h2>
        <p className="font-body text-white/70 text-sm md:text-base mt-4 max-w-lg mx-auto leading-relaxed">
          {t('about.ctaDesc')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link
            to={routes.products}
            className="btn-magnetic inline-flex items-center gap-2 bg-madagascar text-white font-heading font-semibold px-7 py-3.5 text-sm rounded-4xl"
          >
            <span className="btn-bg bg-madagascar-light rounded-4xl" />
            <span className="relative z-10 flex items-center gap-2">
              {t('about.ctaProducts')} <ArrowRight size={16} />
            </span>
          </Link>
          <Link
            to={routes.contact}
            className="btn-magnetic inline-flex items-center gap-2 border border-white/30 text-white font-heading font-medium px-6 py-3.5 text-sm bg-white/5 backdrop-blur-sm rounded-4xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              <MessageCircle size={16} />
              {t('about.ctaContact')}
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─── MAIN PAGE ─── */
export default function AboutPage() {
  const { t } = useTranslation()
  const { routes } = useLanguageRouter()

  usePageMeta({
    title: t('about.title'),
    description: t('about.metaDesc'),
    canonicalPath: routes.about,
  })

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Accueil', url: 'https://kazepices.com/' },
        { name: 'À propos', url: 'https://kazepices.com/a-propos' },
      ]} />
      <AboutHero />
      <OriginStory />
      <Founder />
      <BridgeSection />
      <AboutCTA />
    </>
  )
}
