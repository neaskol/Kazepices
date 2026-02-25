import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { Package, MessageCircle, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLanguageRouter } from '../hooks/useLanguageRouter'

import products from '../data/products'
import { pt } from '../data/products'
import { whatsappUrl } from '../data/config'

gsap.registerPlugin(ScrollTrigger)

export default function Products() {
  const sectionRef = useRef(null)
  const { t } = useTranslation()
  const { lang, routes } = useLanguageRouter()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.product-title', { y: 40, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
      gsap.fromTo('.product-card', { y: 50, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.product-grid',
          start: 'top 80%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="produits" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="product-title mb-16">
          <span className="font-mono text-xs text-moss tracking-widest uppercase">{t('products.sectionLabel')}</span>
          <h2 className="font-heading font-extrabold text-forest text-3xl md:text-5xl mt-3 tracking-tight">
            {t('products.heading1')}{' '}
            <span className="font-drama italic text-madagascar">{t('products.heading2')}</span>
          </h2>
          <p className="font-body text-warm-gray text-base mt-4 max-w-xl">
            {t('products.description')}
          </p>
        </div>

        <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.slug}
              className="product-card card-kazepices bg-cream overflow-hidden flex flex-col group"
            >
              <Link to={`${routes.products}/${product.slug}`} className="block">
                <div className={`relative h-48 bg-gradient-to-b ${product.color} to-cream flex items-center justify-center overflow-hidden`}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={pt(product.alt, lang)}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <Package size={48} className="text-forest/20" aria-hidden="true" />
                  )}
                </div>
              </Link>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-moss">{pt(product.type, lang)}</span>
                  <span className="font-mono text-xs text-warm-gray">{pt(product.formats, lang)}</span>
                </div>
                <Link to={`${routes.products}/${product.slug}`}>
                  <h3 className="font-heading font-bold text-forest text-lg group-hover:text-madagascar transition-colors">{pt(product.name, lang)}</h3>
                </Link>
                <p className="font-body text-warm-gray text-sm mt-2 leading-relaxed flex-1">
                  {pt(product.description, lang)}
                </p>
                <Link
                  to={`${routes.products}/${product.slug}`}
                  className="mt-3 inline-flex items-center gap-1 font-heading text-xs font-semibold text-moss hover:text-forest transition-colors"
                >
                  {t('products.viewProduct')} <ArrowRight size={12} />
                </Link>
                <a
                  href={whatsappUrl(t('products.whatsappMsg', { name: pt(product.name, lang) }))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magnetic mt-4 inline-flex items-center justify-center gap-2 bg-forest text-white font-heading font-semibold text-sm px-5 py-3"
                  style={{ borderRadius: '1.5rem' }}
                >
                  <span className="btn-bg bg-forest-light" style={{ borderRadius: '1.5rem' }} />
                  <span className="relative z-10 flex items-center gap-2">
                    <MessageCircle size={14} />
                    {t('products.orderWhatsApp')}
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
