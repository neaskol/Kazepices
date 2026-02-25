import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import usePageMeta from './hooks/usePageMeta'
import { useLanguageRouter } from './hooks/useLanguageRouter'
import { BreadcrumbSchema } from './components/StructuredData'
import { ArrowLeft, MessageCircle, Mail, ArrowRight, Leaf, Package, ChevronRight } from 'lucide-react'

import products, { pt, productSlug, findProductBySlug } from './data/products'
import { whatsappUrl } from './data/config'
import { Search } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function ProductDetailPage() {
  const { t } = useTranslation()
  const { lang, routes } = useLanguageRouter()
  const { slug } = useParams()
  const product = findProductBySlug(slug)
  const heroRef = useRef(null)
  const contentRef = useRef(null)

  usePageMeta({
    title: product
      ? t('productDetail.titleFound', { name: pt(product.name, lang) })
      : t('productDetail.titleNotFound'),
    description: product ? pt(product.description, lang) : '',
    canonicalPath: product ? `${routes.products}/${productSlug(product, lang)}` : routes.products,
  })

  useEffect(() => {
    if (!product) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })
      tl.fromTo('.detail-hero-back', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
        .fromTo('.detail-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3')
        .fromTo('.detail-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.3')
        .fromTo('.detail-hero-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .fromTo('.detail-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.2')
    }, heroRef)
    return () => ctx.revert()
  }, [product])

  useEffect(() => {
    if (!product) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.detail-benefit', { y: 40, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.detail-benefits',
          start: 'top 80%',
        },
      })
      gsap.fromTo('.detail-closing', { y: 30, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.detail-closing',
          start: 'top 85%',
        },
      })
    }, contentRef)
    return () => ctx.revert()
  }, [product])

  if (!product) {
    const suggestions = products.slice(0, 3)
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center px-6 py-32 text-center">
        <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mb-6">
          <Search size={28} className="text-forest/40" />
        </div>
        <span className="font-mono text-xs text-moss dark:text-moss-light tracking-widest uppercase">{t('productNotFound.label')}</span>
        <h1 className="font-heading font-extrabold text-forest dark:text-cream text-3xl md:text-4xl mt-3 tracking-tight">
          {t('productNotFound.heading')}
        </h1>
        <p className="font-body text-warm-gray dark:text-white/60 text-base mt-3 max-w-md">
          {t('productNotFound.message')}
        </p>
        <Link
          to={routes.products}
          className="mt-8 inline-flex items-center gap-2 bg-madagascar text-white font-heading font-semibold px-7 py-3.5 text-sm rounded-4xl"
        >
          <ArrowLeft size={16} />
          {t('productNotFound.browseCta')}
        </Link>

        {suggestions.length > 0 && (
          <div className="mt-16 w-full max-w-4xl">
            <h2 className="font-heading font-bold text-forest dark:text-cream text-lg mb-6">
              {t('productNotFound.suggestionsHeading')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suggestions.map((p) => (
                <Link
                  key={productSlug(p, 'fr')}
                  to={`${routes.products}/${productSlug(p, lang)}`}
                  className="card-kazepices bg-cream dark:bg-[#282828] overflow-hidden flex flex-col group text-left"
                >
                  <div className={`relative h-40 bg-gradient-to-b ${p.color} to-cream flex items-center justify-center overflow-hidden`}>
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={pt(p.alt, lang) || pt(p.name, lang)}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        width={400}
                        height={160}
                      />
                    ) : (
                      <Package size={48} className="text-forest/20" />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-forest dark:text-cream group-hover:text-madagascar transition-colors">{pt(p.name, lang)}</h3>
                    <span className="inline-flex items-center gap-1 font-heading text-xs font-semibold text-moss dark:text-moss-light mt-2 group-hover:text-forest dark:group-hover:text-cream transition-colors">
                      {t('products.viewProduct')} <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Find related products (same category, exclude current)
  const sameCategory = products
    .filter((p) => p.category === product.category && productSlug(p, 'fr') !== productSlug(product, 'fr'))
  const related = sameCategory.length > 0
    ? sameCategory.slice(0, 3)
    : products.filter((p) => productSlug(p, 'fr') !== productSlug(product, 'fr')).slice(0, 3)

  return (
    <>
      <BreadcrumbSchema items={[
        { name: t('footer.home'), url: 'https://kazepices.com/' },
        { name: t('nav.products'), url: `https://kazepices.com${routes.products}` },
        { name: pt(product.name, lang), url: `https://kazepices.com${routes.products}/${productSlug(product, lang)}` },
      ]} />

      {/* Hero section with product image */}
      <section ref={heroRef} className="relative min-h-[70vh] md:min-h-[80vh] overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          {product.image ? (
            <img
              src={product.image}
              alt={pt(product.alt, lang) || pt(product.name, lang)}
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-b ${product.color} to-cream`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
        </div>

        <div className="relative z-10 flex flex-col justify-end min-h-[70vh] md:min-h-[80vh] px-6 md:px-16 lg:px-24 pb-16 md:pb-24 pt-32">
          <div className="max-w-4xl">
            <Link
              to={routes.products}
              className="detail-hero-back inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/70 text-xs font-mono px-4 py-1.5 mb-6 hover:bg-white/15 transition-colors rounded-4xl"
            >
              <ArrowLeft size={14} />
              {t('productDetail.allProducts')}
            </Link>

            <div className="detail-hero-badge flex items-center gap-3 mb-4">
              <span
                className="bg-white/15 backdrop-blur-sm text-white font-mono text-xs font-medium px-3 py-1 rounded-2xl"
              >
                {pt(product.type, lang)}
              </span>
              <span
                className="bg-white/10 backdrop-blur-sm text-white/70 font-mono text-xs px-3 py-1 rounded-2xl"
              >
                {pt(product.formats, lang)}
              </span>
            </div>

            <h1 className="detail-hero-title font-heading font-extrabold text-white text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1]">
              {pt(product.name, lang)}
              <span className="font-drama italic text-madagascar-light block md:inline md:ml-3">
                {t('productDetail.fromMadagascar')}
              </span>
            </h1>

            <p className="detail-hero-desc font-body text-white/80 text-base md:text-lg mt-6 max-w-2xl leading-relaxed">
              {pt(product.longDescription, lang) || pt(product.details, lang)}
            </p>

            {/* CTA Buttons */}
            <div className="detail-hero-cta flex flex-wrap items-center gap-4 mt-8">
              <a
                href={whatsappUrl(t('productDetail.buyWhatsAppMsg', { name: pt(product.name, lang), formats: pt(product.formats, lang) }))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-magnetic inline-flex items-center gap-2 bg-[#25D366] text-white font-heading font-semibold px-7 py-3.5 text-sm rounded-4xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <MessageCircle size={16} />
                  {t('productDetail.buyWhatsApp')}
                </span>
              </a>
              <Link
                to={routes.contact}
                className="btn-magnetic inline-flex items-center gap-2 border border-white/30 text-white font-heading font-medium px-6 py-3.5 text-sm bg-white/5 backdrop-blur-sm rounded-4xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Mail size={16} />
                  {t('productDetail.contactUs')}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product details content */}
      <section ref={contentRef} className="py-20 md:py-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">

          {/* Visual breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-1.5 font-mono text-xs text-warm-gray dark:text-white/50">
              <li>
                <Link to="/" className="hover:text-forest dark:hover:text-moss-light transition-colors">{t('footer.home')}</Link>
              </li>
              <li aria-hidden="true"><ChevronRight size={12} /></li>
              <li>
                <Link to={routes.products} className="hover:text-forest dark:hover:text-moss-light transition-colors">{t('nav.products')}</Link>
              </li>
              <li aria-hidden="true"><ChevronRight size={12} /></li>
              <li aria-current="page" className="text-forest dark:text-moss-light font-medium">{pt(product.name, lang)}</li>
            </ol>
          </nav>

          {/* Benefits grid */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="detail-benefits grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="detail-benefit card-kazepices bg-cream dark:bg-[#282828] p-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-forest/10 dark:bg-moss/20 flex items-center justify-center rounded-2xl">
                      <Leaf size={18} className="text-forest dark:text-moss-light" />
                    </div>
                    <h3 className="font-heading font-bold text-forest dark:text-cream text-lg">{pt(benefit.label, lang)}</h3>
                  </div>
                  <p className="font-body text-warm-gray dark:text-white/70 text-sm leading-relaxed">
                    {pt(benefit.text, lang)}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Closing statement */}
          {product.closing && (
            <div className="detail-closing mt-16 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-8 h-px bg-moss/30" />
                <span className="w-2 h-2 bg-moss rounded-full pulse-dot" />
                <span className="w-8 h-px bg-moss/30" />
              </div>
              <p className="font-drama italic text-forest dark:text-cream text-2xl md:text-3xl leading-relaxed max-w-2xl mx-auto">
                {pt(product.closing, lang)}
              </p>
            </div>
          )}

          {/* Provenance badge */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-moss rounded-full pulse-dot" />
              <span className="font-mono text-xs text-moss dark:text-moss-light">{t('common.provenance')}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-moss rounded-full pulse-dot" />
              <span className="font-mono text-xs text-moss dark:text-moss-light">{t('common.natural')}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-moss rounded-full pulse-dot" />
              <span className="font-mono text-xs text-moss dark:text-moss-light">{t('common.noChemicals')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-20 md:pb-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto bg-forest section-round p-10 md:p-16 text-center">
          <span className="font-mono text-xs text-moss-light tracking-widest uppercase">{t('productDetail.orderLabel')}</span>
          <h2 className="font-heading font-extrabold text-white text-2xl md:text-4xl mt-3 tracking-tight">
            {t('productDetail.orderHeading', { name: pt(product.name, lang) })}{' '}
            <span className="font-drama italic text-madagascar-light">{t('productDetail.fromMadagascar')}</span>
          </h2>
          <p className="font-body text-white/70 text-sm md:text-base mt-4 max-w-lg mx-auto leading-relaxed">
            {t('productDetail.orderDesc')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href={whatsappUrl(t('productDetail.buyWhatsAppMsg', { name: pt(product.name, lang), formats: pt(product.formats, lang) }))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic inline-flex items-center gap-2 bg-[#25D366] text-white font-heading font-semibold px-7 py-3.5 text-sm rounded-4xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                <MessageCircle size={16} />
                {t('productDetail.buyWhatsApp')}
              </span>
            </a>
            <Link
              to={routes.contact}
              className="btn-magnetic inline-flex items-center gap-2 border border-white/30 text-white font-heading font-medium px-6 py-3.5 text-sm bg-white/5 backdrop-blur-sm rounded-4xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Mail size={16} />
                {t('productDetail.contactUs')} <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="pb-20 md:pb-28 px-6 md:px-16 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <span className="font-mono text-xs text-moss dark:text-moss-light tracking-widest uppercase">{t('productDetail.discoverLabel')}</span>
              <h2 className="font-heading font-extrabold text-forest dark:text-cream text-2xl md:text-3xl mt-2 tracking-tight">
                {t('productDetail.otherProducts')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={productSlug(p, 'fr')}
                  to={`${routes.products}/${productSlug(p, lang)}`}
                  className="card-kazepices bg-cream dark:bg-[#282828] overflow-hidden flex flex-col group"
                >
                  <div className={`relative h-48 bg-gradient-to-b ${p.color} to-cream flex items-center justify-center overflow-hidden`}>
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={pt(p.alt, lang) || pt(p.name, lang)}
                        loading="lazy"
                        width={600}
                        height={384}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <Package size={48} className="text-forest/20" />
                    )}
                    <span
                      className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-forest font-mono text-xs font-medium px-3 py-1 rounded-2xl"
                    >
                      {pt(p.type, lang)}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-forest dark:text-cream text-lg group-hover:text-madagascar transition-colors">{pt(p.name, lang)}</h3>
                    <p className="font-body text-warm-gray dark:text-white/60 text-sm mt-2 leading-relaxed line-clamp-2">
                      {pt(p.description, lang)}
                    </p>
                    <span className="inline-flex items-center gap-1 font-heading text-xs font-semibold text-moss dark:text-moss-light mt-3 group-hover:text-forest dark:group-hover:text-cream transition-colors">
                      {t('products.viewProduct')} <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
