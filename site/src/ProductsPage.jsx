import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import usePageMeta from './hooks/usePageMeta'
import { useLanguageRouter } from './hooks/useLanguageRouter'
import { ProductListSchema, BreadcrumbSchema } from './components/StructuredData'
import { ArrowLeft, MessageCircle, Package, Filter, ArrowRight } from 'lucide-react'

import products, { pt, productSlug } from './data/products'
import { whatsappUrl } from './data/config'

gsap.registerPlugin(ScrollTrigger)

export default function ProductsPage() {
  const { t } = useTranslation()
  const { lang, routes } = useLanguageRouter()
  const heroRef = useRef(null)
  const catalogRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { key: 'all', label: t('productsPage.filterAll') },
    { key: 'poudre', label: t('productsPage.filterPowders') },
    { key: 'fruit-sec', label: t('productsPage.filterDriedFruits') },
  ]

  const filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory)

  // Language-resolved products for structured data schema
  const schemaProducts = products.map(p => ({
    name: pt(p.name, lang),
    description: pt(p.description, lang),
    image: p.image,
    type: pt(p.type, lang),
  }))

  usePageMeta({
    title: t('productsPage.title'),
    description: t('productsPage.metaDesc'),
    canonicalPath: routes.products,
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })
      tl.fromTo('.products-hero-tag', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
        .fromTo('.products-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.3')
        .fromTo('.products-hero-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .fromTo('.products-hero-stats', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.2')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.catalog-filters', { y: 30, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: 0.6,
        ease: 'power3.out',
      })
    }, catalogRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.product-page-card', { y: 50, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      })
    }, catalogRef)
    return () => ctx.revert()
  }, [activeCategory])

  return (
    <>
      <ProductListSchema products={schemaProducts} />
      <BreadcrumbSchema items={[
        { name: t('footer.home'), url: 'https://kazepices.com/' },
        { name: t('nav.products'), url: `https://kazepices.com${routes.products}` },
      ]} />
      {/* Hero banner */}
      <section
        ref={heroRef}
        className="relative bg-charcoal overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-16 lg:px-24"
      >
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 to-charcoal/95" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Link
            to="/"
            className="products-hero-tag inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/70 text-xs font-mono px-4 py-1.5 mb-8 hover:bg-white/15 transition-colors"
            style={{ borderRadius: '2rem' }}
          >
            <ArrowLeft size={14} />
            {t('common.backHome')}
          </Link>

          <h1 className="products-hero-title font-heading font-extrabold text-white text-4xl md:text-6xl tracking-tight leading-[1.1]">
            {t('productsPage.heading1')}{' '}
            <span className="font-drama italic text-madagascar-light">{t('productsPage.heading2')}</span>
          </h1>

          <p className="products-hero-desc font-body text-white/70 text-base md:text-lg mt-6 max-w-xl mx-auto leading-relaxed">
            {t('productsPage.description')}
          </p>

          {/* Stats */}
          <div className="products-hero-stats flex flex-wrap items-center justify-center gap-8 mt-10">
            <div className="text-center">
              <p className="font-heading font-extrabold text-white text-2xl md:text-3xl">{products.length}</p>
              <p className="font-mono text-xs text-white/60 mt-1">{t('productsPage.statProducts')}</p>
            </div>
            <div className="w-px h-10 bg-white/15" />
            <div className="text-center">
              <p className="font-heading font-extrabold text-white text-2xl md:text-3xl">100%</p>
              <p className="font-mono text-xs text-white/60 mt-1">{t('productsPage.statNatural')}</p>
            </div>
            <div className="w-px h-10 bg-white/15" />
            <div className="text-center">
              <p className="font-heading font-extrabold text-white text-2xl md:text-3xl">0</p>
              <p className="font-mono text-xs text-white/60 mt-1">{t('productsPage.statChemicals')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog section */}
      <section ref={catalogRef} className="py-20 md:py-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">

          {/* Filters */}
          <div className="catalog-filters flex flex-wrap items-center gap-3 mb-12" role="group" aria-label={t('productsPage.filterLabel')}>
            <Filter size={16} className="text-moss" aria-hidden="true" />
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                aria-pressed={activeCategory === cat.key}
                className={`font-heading font-semibold text-sm px-5 py-2.5 transition-all duration-300 ${activeCategory === cat.key
                    ? 'bg-forest text-white'
                    : 'bg-forest/5 text-forest hover:bg-forest/10'
                  }`}
                style={{ borderRadius: '2rem' }}
              >
                {cat.label}
              </button>
            ))}
            <span className="font-mono text-xs text-warm-gray ml-auto" aria-live="polite">
              {filtered.length} {filtered.length > 1 ? t('productsPage.productPlural') : t('productsPage.productSingular')}
            </span>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div
                key={productSlug(product, 'fr')}
                className="product-page-card card-kazepices bg-cream overflow-hidden flex flex-col group"
              >
                {/* Product image — clickable */}
                <Link to={`${routes.products}/${productSlug(product, lang)}`} className="block">
                  <div className={`relative h-56 bg-gradient-to-b ${product.color} to-cream flex items-center justify-center overflow-hidden`}>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={pt(product.alt, lang) || pt(product.name, lang)}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <Package size={48} className="text-forest/20" />
                    )}
                    {/* Badge type */}
                    <span
                      className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-forest font-mono text-xs font-medium px-3 py-1"
                      style={{ borderRadius: '1rem' }}
                    >
                      {pt(product.type, lang)}
                    </span>
                    {/* Badge formats */}
                    <span
                      className="absolute top-4 right-4 bg-charcoal/70 backdrop-blur-sm text-white font-mono text-xs px-3 py-1"
                      style={{ borderRadius: '1rem' }}
                    >
                      {pt(product.formats, lang)}
                    </span>
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-1">
                  <Link to={`${routes.products}/${productSlug(product, lang)}`} className="hover:text-madagascar transition-colors">
                    <h3 className="font-heading font-bold text-forest text-xl group-hover:text-madagascar transition-colors">{pt(product.name, lang)}</h3>
                  </Link>
                  <p className="font-body text-warm-gray text-sm mt-2 leading-relaxed">
                    {pt(product.description, lang)}
                  </p>

                  <Link
                    to={`${routes.products}/${productSlug(product, lang)}`}
                    className="mt-3 inline-flex items-center gap-1 font-heading text-xs font-semibold text-moss hover:text-forest transition-colors"
                  >
                    {t('products.viewProduct')} <ArrowRight size={12} />
                  </Link>

                  <div className="mt-auto pt-4">
                    <a
                      href={whatsappUrl(t('products.whatsappMsgFormats', { name: pt(product.name, lang), formats: pt(product.formats, lang) }))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-magnetic w-full inline-flex items-center justify-center gap-2 bg-forest text-white font-heading font-semibold text-sm px-5 py-3"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="pb-20 md:pb-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto bg-forest section-round p-10 md:p-16 text-center">
          <span className="font-mono text-xs text-moss-light tracking-widest uppercase">{t('productsPage.helpLabel')}</span>
          <h2 className="font-heading font-extrabold text-white text-2xl md:text-4xl mt-3 tracking-tight">
            {t('productsPage.helpHeading1')}{' '}
            <span className="font-drama italic text-madagascar-light">{t('productsPage.helpHeading2')}</span>
          </h2>
          <p className="font-body text-white/70 text-sm md:text-base mt-4 max-w-lg mx-auto leading-relaxed">
            {t('productsPage.helpDesc')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href={whatsappUrl(t('productsPage.helpWhatsAppMsg'))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic inline-flex items-center gap-2 bg-[#25D366] text-white font-heading font-semibold px-7 py-3.5 text-sm"
              style={{ borderRadius: '2rem' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <MessageCircle size={16} />
                {t('productsPage.helpWhatsApp')}
              </span>
            </a>
            <Link
              to={routes.contact}
              className="btn-magnetic inline-flex items-center gap-2 border border-white/30 text-white font-heading font-medium px-6 py-3.5 text-sm bg-white/5 backdrop-blur-sm"
              style={{ borderRadius: '2rem' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('productsPage.helpContact')} <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
