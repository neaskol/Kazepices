import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link, useSearchParams } from 'react-router-dom'
import usePageMeta from './hooks/usePageMeta'
import { useLanguageRouter } from './hooks/useLanguageRouter'
import { ProductListSchema, BreadcrumbSchema } from './components/StructuredData'
import { ArrowLeft, Package, Filter, ArrowRight, ChevronRight, Search, X } from 'lucide-react'

import products, { pt, productSlug } from './data/products'

gsap.registerPlugin(ScrollTrigger)

export default function ProductsPage() {
  const { t } = useTranslation()
  const { lang, routes } = useLanguageRouter()
  const heroRef = useRef(null)
  const catalogRef = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const validCategories = ['all', 'poudre', 'fruit-sec']
  const paramCategory = searchParams.get('category')
  const activeCategory = validCategories.includes(paramCategory) ? paramCategory : 'all'

  const searchQuery = searchParams.get('q') || ''

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([k, v]) => {
      if (!v || v === 'all') next.delete(k)
      else next.set(k, v)
    })
    setSearchParams(next, { replace: true })
  }

  const setActiveCategory = (key) => updateParams({ category: key })
  const setSearchQuery = (q) => updateParams({ q })

  const categories = [
    { key: 'all', label: t('productsPage.filterAll') },
    { key: 'poudre', label: t('productsPage.filterPowders') },
    { key: 'fruit-sec', label: t('productsPage.filterDriedFruits') },
  ]

  const filtered = products.filter((p) => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      const name = pt(p.name, lang).toLowerCase()
      const type = pt(p.type, lang).toLowerCase()
      const desc = pt(p.description, lang).toLowerCase()
      if (!name.includes(q) && !type.includes(q) && !desc.includes(q)) return false
    }
    return true
  })

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
            className="products-hero-tag inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/70 text-xs font-mono px-4 py-1.5 mb-8 hover:bg-white/15 transition-colors rounded-4xl"
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

          {/* Visual breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-1.5 font-mono text-xs text-warm-gray dark:text-white/50">
              <li>
                <Link to="/" className="hover:text-forest transition-colors">{t('footer.home')}</Link>
              </li>
              <li aria-hidden="true"><ChevronRight size={12} /></li>
              <li aria-current="page" className="text-forest dark:text-moss-light font-medium">{t('nav.products')}</li>
            </ol>
          </nav>

          {/* Search */}
          <div className="catalog-filters relative mb-6">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray/50 dark:text-white/40 pointer-events-none" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('productsPage.searchPlaceholder')}
              aria-label={t('productsPage.searchLabel')}
              className="w-full bg-white dark:bg-charcoal dark:text-cream border border-moss/20 dark:border-white/10 font-body text-charcoal text-sm pl-10 pr-10 py-3 outline-none transition-all duration-300 focus:border-forest dark:focus:border-moss-light focus:ring-2 focus:ring-forest/10 dark:focus:ring-moss-light/10 placeholder:text-warm-gray/50 dark:placeholder:text-white/40 rounded-2xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray/50 dark:text-white/50 hover:text-forest dark:hover:text-moss-light transition-colors"
                aria-label={t('productsPage.searchClear')}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-12" role="group" aria-label={t('productsPage.filterLabel')}>
            <Filter size={16} className="text-moss dark:text-moss-light" aria-hidden="true" />
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                aria-pressed={activeCategory === cat.key}
                className={`font-heading font-semibold text-sm px-5 py-2.5 transition-all duration-300 ${activeCategory === cat.key
                  ? 'bg-forest text-white'
                  : 'bg-forest/5 dark:bg-white/5 text-forest dark:text-cream hover:bg-forest/10'
                  } rounded-4xl`}
              >
                {cat.label}
              </button>
            ))}
            <span className="font-mono text-xs text-warm-gray dark:text-white/50 ml-auto" aria-live="polite">
              {filtered.length} {filtered.length > 1 ? t('productsPage.productPlural') : t('productsPage.productSingular')}
            </span>
          </div>

          {/* Product grid */}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Search size={40} className="mx-auto text-forest/20 mb-4" />
              <p className="font-heading font-semibold text-forest dark:text-cream text-lg">{t('productsPage.noResults')}</p>
              <p className="font-body text-warm-gray dark:text-white/60 text-sm mt-2">{t('productsPage.noResultsHint')}</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div
                key={productSlug(product, 'fr')}
                className="product-page-card card-kazepices bg-cream dark:bg-[#282828] overflow-hidden flex flex-col group"
              >
                {/* Product image — clickable */}
                <Link to={`${routes.products}/${productSlug(product, lang)}`} className="block">
                  <div className={`relative h-56 bg-gradient-to-b ${product.color} to-cream flex items-center justify-center overflow-hidden skeleton-shimmer`}>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={pt(product.alt, lang) || pt(product.name, lang)}
                        loading="lazy"
                        width={600}
                        height={448}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <Package size={48} className="text-forest/20" />
                    )}
                    {/* Badge type */}
                    <span
                      className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-forest dark:text-forest font-mono text-xs font-medium px-3 py-1 rounded-2xl"
                    >
                      {pt(product.type, lang)}
                    </span>
                    {/* Badge formats */}
                    <span
                      className="absolute top-4 right-4 bg-charcoal/70 backdrop-blur-sm text-white font-mono text-xs px-3 py-1 rounded-2xl"
                    >
                      {pt(product.formats, lang)}
                    </span>
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-1">
                  <Link to={`${routes.products}/${productSlug(product, lang)}`} className="hover:text-madagascar transition-colors">
                    <h3 className="font-heading font-bold text-forest dark:text-cream text-xl group-hover:text-madagascar transition-colors">{pt(product.name, lang)}</h3>
                  </Link>
                  <p className="font-body text-warm-gray dark:text-white/60 text-sm mt-2 leading-relaxed">
                    {pt(product.description, lang)}
                  </p>

                  <Link
                    to={`${routes.products}/${productSlug(product, lang)}`}
                    className="mt-3 inline-flex items-center gap-1 font-heading text-xs font-semibold text-moss dark:text-moss-light hover:text-forest dark:hover:text-cream transition-colors"
                  >
                    {t('products.viewProduct')} <ArrowRight size={12} />
                  </Link>

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
            <Link
              to={routes.contact}
              className="btn-magnetic inline-flex items-center gap-2 bg-madagascar text-white font-heading font-semibold px-7 py-3.5 text-sm rounded-4xl"
            >
              <span className="btn-bg bg-madagascar-light rounded-4xl" />
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
