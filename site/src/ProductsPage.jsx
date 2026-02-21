import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import usePageMeta from './hooks/usePageMeta'
import { ProductListSchema, BreadcrumbSchema } from './components/StructuredData'
import { ArrowLeft, MessageCircle, Package, Filter, ArrowRight } from 'lucide-react'

import products from './data/products'
import { whatsappUrl } from './data/config'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  { key: 'all', label: 'Tous' },
  { key: 'poudre', label: 'Poudres' },
  { key: 'huile', label: 'Huiles' },
]

export default function ProductsPage() {
  const heroRef = useRef(null)
  const catalogRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [expandedProduct, setExpandedProduct] = useState(null)

  const filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory)

  usePageMeta({
    title: 'Nos Produits — Épices & Huiles Naturelles | Kazépices Madagascar',
    description: 'Catalogue complet Kazépices : curcuma, poivre noir, gingembre, moringa, cannelle en poudre et huile de moringa. 100% naturel, sans produits chimiques.',
    canonicalPath: '/produits',
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
      <ProductListSchema products={products} />
      <BreadcrumbSchema items={[
        { name: 'Accueil', url: 'https://kazepices.com/' },
        { name: 'Produits', url: 'https://kazepices.com/produits' },
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
            Retour à l'accueil
          </Link>

          <h1 className="products-hero-title font-heading font-extrabold text-white text-4xl md:text-6xl tracking-tight leading-[1.1]">
            Nos produits{' '}
            <span className="font-drama italic text-madagascar-light">100% naturels.</span>
          </h1>

          <p className="products-hero-desc font-body text-white/70 text-base md:text-lg mt-6 max-w-xl mx-auto leading-relaxed">
            Chaque produit est cultivé, récolté et conditionné à Madagascar avec un savoir-faire artisanal unique.
            Provenance garantie, qualité sans compromis.
          </p>

          {/* Stats */}
          <div className="products-hero-stats flex flex-wrap items-center justify-center gap-8 mt-10">
            <div className="text-center">
              <p className="font-heading font-extrabold text-white text-2xl md:text-3xl">6</p>
              <p className="font-mono text-xs text-white/60 mt-1">Produits</p>
            </div>
            <div className="w-px h-10 bg-white/15" />
            <div className="text-center">
              <p className="font-heading font-extrabold text-white text-2xl md:text-3xl">100%</p>
              <p className="font-mono text-xs text-white/60 mt-1">Naturel</p>
            </div>
            <div className="w-px h-10 bg-white/15" />
            <div className="text-center">
              <p className="font-heading font-extrabold text-white text-2xl md:text-3xl">0</p>
              <p className="font-mono text-xs text-white/60 mt-1">Produits chimiques</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog section */}
      <section ref={catalogRef} className="py-20 md:py-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">

          {/* Filters */}
          <div className="catalog-filters flex flex-wrap items-center gap-3 mb-12">
            <Filter size={16} className="text-moss" />
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => { setActiveCategory(cat.key); setExpandedProduct(null) }}
                className={`font-heading font-semibold text-sm px-5 py-2.5 transition-all duration-300 ${
                  activeCategory === cat.key
                    ? 'bg-forest text-white'
                    : 'bg-forest/5 text-forest hover:bg-forest/10'
                }`}
                style={{ borderRadius: '2rem' }}
              >
                {cat.label}
              </button>
            ))}
            <span className="font-mono text-xs text-warm-gray ml-auto">
              {filtered.length} produit{filtered.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div
                key={product.name}
                className="product-page-card card-kazepices bg-cream overflow-hidden flex flex-col"
              >
                {/* Product image */}
                <div className={`relative h-56 bg-gradient-to-b ${product.color} to-cream flex items-center justify-center overflow-hidden`}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.alt || product.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <Package size={48} className="text-forest/20" />
                  )}
                  {/* Badge type */}
                  <span
                    className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-forest font-mono text-xs font-medium px-3 py-1"
                    style={{ borderRadius: '1rem' }}
                  >
                    {product.type}
                  </span>
                  {/* Badge formats */}
                  <span
                    className="absolute top-4 right-4 bg-charcoal/70 backdrop-blur-sm text-white font-mono text-xs px-3 py-1"
                    style={{ borderRadius: '1rem' }}
                  >
                    {product.formats}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading font-bold text-forest text-xl">{product.name}</h3>
                  <p className="font-body text-warm-gray text-sm mt-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Expandable details */}
                  {expandedProduct === product.name && (
                    <div className="mt-3 pt-3 border-t border-moss/10">
                      <p className="font-body text-forest/70 text-sm leading-relaxed">
                        {product.details}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="w-2 h-2 bg-moss rounded-full pulse-dot" />
                        <span className="font-mono text-xs text-moss">Provenance : Madagascar</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 bg-moss rounded-full pulse-dot" />
                        <span className="font-mono text-xs text-moss">Démarche responsable</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setExpandedProduct(expandedProduct === product.name ? null : product.name)}
                    className="mt-3 font-heading text-xs font-semibold text-moss hover:text-forest transition-colors text-left"
                  >
                    {expandedProduct === product.name ? '— Moins de détails' : '+ En savoir plus'}
                  </button>

                  <div className="mt-auto pt-4">
                    <a
                      href={whatsappUrl(`Bonjour Kazépices, je souhaite commander du ${product.name} (${product.formats}).`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-magnetic w-full inline-flex items-center justify-center gap-2 bg-forest text-white font-heading font-semibold text-sm px-5 py-3"
                      style={{ borderRadius: '1.5rem' }}
                    >
                      <span className="btn-bg bg-forest-light" style={{ borderRadius: '1.5rem' }} />
                      <span className="relative z-10 flex items-center gap-2">
                        <MessageCircle size={14} />
                        Commander via WhatsApp
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
          <span className="font-mono text-xs text-moss-light tracking-widest uppercase">Besoin d'aide ?</span>
          <h2 className="font-heading font-extrabold text-white text-2xl md:text-4xl mt-3 tracking-tight">
            Une question sur nos{' '}
            <span className="font-drama italic text-madagascar-light">produits ?</span>
          </h2>
          <p className="font-body text-white/70 text-sm md:text-base mt-4 max-w-lg mx-auto leading-relaxed">
            Contactez-nous directement via WhatsApp pour une réponse rapide, ou envoyez-nous un message via notre formulaire.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href={whatsappUrl('Bonjour Kazépices, j\'ai une question sur vos produits.')}
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
            <Link
              to="/contact"
              className="btn-magnetic inline-flex items-center gap-2 border border-white/30 text-white font-heading font-medium px-6 py-3.5 text-sm bg-white/5 backdrop-blur-sm"
              style={{ borderRadius: '2rem' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Nous contacter <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
