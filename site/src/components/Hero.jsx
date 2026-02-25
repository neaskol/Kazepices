import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLanguageRouter } from '../hooks/useLanguageRouter'

export default function Hero() {
  const heroRef = useRef(null)
  const { t } = useTranslation()
  const { routes } = useLanguageRouter()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8 })
      tl.fromTo('.hero-tag', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
        .fromTo('.hero-line-1', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .fromTo('.hero-line-2', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .fromTo('.hero-desc', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .fromTo('.hero-cta', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.2')
        .fromTo('.hero-scroll', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.1')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={heroRef} className="relative h-dvh min-h-[600px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1920&q=90"
        srcSet="
          https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=640&q=80 640w,
          https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1024&q=85 1024w,
          https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1920&q=90 1920w"
        sizes="100vw"
        fetchPriority="high"
        alt={t('hero.imageAlt')}
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover -scale-x-100"
      />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-16 md:pb-24 max-w-5xl">
        <div className="hero-tag inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/80 text-xs font-mono px-4 py-1.5 mb-6 w-fit rounded-4xl">
          <span className="w-2 h-2 bg-moss-light rounded-full pulse-dot" />
          {t('hero.tag')}
        </div>
        <h1 className="hero-line-1 font-heading font-extrabold text-white text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]">
          {t('hero.headline1')}{' '}
          <span className="hero-line-2 font-drama italic text-madagascar-light text-5xl md:text-7xl lg:text-[5.5rem]">
            {t('hero.headline2')}
          </span>
        </h1>
        <p className="hero-desc text-white/70 font-body text-base md:text-lg max-w-xl mt-6 leading-relaxed">
          {t('hero.description')}
        </p>
        <div className="hero-cta flex flex-wrap items-center gap-4 mt-8">
          <Link
            to={routes.products}
            className="btn-magnetic inline-flex items-center gap-2 bg-madagascar text-white font-heading font-semibold px-7 py-3.5 text-sm rounded-4xl"
          >
            <span className="btn-bg bg-madagascar-light rounded-4xl" />
            <span className="relative z-10 flex items-center gap-2">
              {t('hero.ctaProducts')} <ArrowRight size={16} />
            </span>
          </Link>
          <a
            href="#video"
            className="btn-magnetic inline-flex items-center gap-2 border border-white/30 text-white font-heading font-medium px-6 py-3.5 text-sm bg-white/5 backdrop-blur-sm rounded-4xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Play size={16} />
              {t('hero.ctaStory')}
            </span>
          </a>
        </div>
        <a href="#engagements" className="hero-scroll flex items-center gap-2 text-white/60 text-xs font-mono mt-12 hover-lift">
          <ChevronDown size={14} className="animate-bounce" />
          {t('hero.scroll')}
        </a>
      </div>
    </section>
  )
}
