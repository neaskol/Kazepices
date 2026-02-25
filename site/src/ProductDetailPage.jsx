import { useEffect, useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import usePageMeta from './hooks/usePageMeta'
import { BreadcrumbSchema } from './components/StructuredData'
import { ArrowLeft, MessageCircle, Mail, ArrowRight, Leaf, Package } from 'lucide-react'

import products from './data/products'
import { whatsappUrl } from './data/config'

gsap.registerPlugin(ScrollTrigger)

export default function ProductDetailPage() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)
  const heroRef = useRef(null)
  const contentRef = useRef(null)

  usePageMeta({
    title: product
      ? `${product.name} — Épice Naturelle de Madagascar | Kazépices`
      : 'Produit introuvable | Kazépices',
    description: product?.description || '',
    canonicalPath: product ? `/produits/${product.slug}` : '/produits',
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
    return <Navigate to="/produits" replace />
  }

  // Find related products (same category, exclude current)
  const related = products
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3)

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Accueil', url: 'https://kazepices.com/' },
        { name: 'Produits', url: 'https://kazepices.com/produits' },
        { name: product.name, url: `https://kazepices.com/produits/${product.slug}` },
      ]} />

      {/* Hero section with product image */}
      <section ref={heroRef} className="relative min-h-[70vh] md:min-h-[80vh] overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          {product.image ? (
            <img
              src={product.image}
              alt={product.alt || product.name}
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
              to="/produits"
              className="detail-hero-back inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/70 text-xs font-mono px-4 py-1.5 mb-6 hover:bg-white/15 transition-colors"
              style={{ borderRadius: '2rem' }}
            >
              <ArrowLeft size={14} />
              Tous les produits
            </Link>

            <div className="detail-hero-badge flex items-center gap-3 mb-4">
              <span
                className="bg-white/15 backdrop-blur-sm text-white font-mono text-xs font-medium px-3 py-1"
                style={{ borderRadius: '1rem' }}
              >
                {product.type}
              </span>
              <span
                className="bg-white/10 backdrop-blur-sm text-white/70 font-mono text-xs px-3 py-1"
                style={{ borderRadius: '1rem' }}
              >
                {product.formats}
              </span>
            </div>

            <h1 className="detail-hero-title font-heading font-extrabold text-white text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1]">
              {product.name}
              <span className="font-drama italic text-madagascar-light block md:inline md:ml-3">
                de Madagascar.
              </span>
            </h1>

            <p className="detail-hero-desc font-body text-white/80 text-base md:text-lg mt-6 max-w-2xl leading-relaxed">
              {product.longDescription || product.details}
            </p>

            {/* CTA Buttons */}
            <div className="detail-hero-cta flex flex-wrap items-center gap-4 mt-8">
              <a
                href={whatsappUrl(`Bonjour Kazépices, je souhaite acheter du ${product.name} (${product.formats}).`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-magnetic inline-flex items-center gap-2 bg-[#25D366] text-white font-heading font-semibold px-7 py-3.5 text-sm"
                style={{ borderRadius: '2rem' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <MessageCircle size={16} />
                  Acheter sur WhatsApp
                </span>
              </a>
              <Link
                to="/contact"
                className="btn-magnetic inline-flex items-center gap-2 border border-white/30 text-white font-heading font-medium px-6 py-3.5 text-sm bg-white/5 backdrop-blur-sm"
                style={{ borderRadius: '2rem' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Mail size={16} />
                  Contactez-nous
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product details content */}
      <section ref={contentRef} className="py-20 md:py-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">

          {/* Benefits grid */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="detail-benefits grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.benefits.map((benefit) => (
                <div
                  key={benefit.label}
                  className="detail-benefit card-kazepices bg-cream p-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-forest/10 flex items-center justify-center" style={{ borderRadius: '1rem' }}>
                      <Leaf size={18} className="text-forest" />
                    </div>
                    <h3 className="font-heading font-bold text-forest text-lg">{benefit.label}</h3>
                  </div>
                  <p className="font-body text-warm-gray text-sm leading-relaxed">
                    {benefit.text}
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
              <p className="font-drama italic text-forest text-2xl md:text-3xl leading-relaxed max-w-2xl mx-auto">
                {product.closing}
              </p>
            </div>
          )}

          {/* Provenance badge */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-moss rounded-full pulse-dot" />
              <span className="font-mono text-xs text-moss">Provenance : Madagascar</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-moss rounded-full pulse-dot" />
              <span className="font-mono text-xs text-moss">100% Naturel</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-moss rounded-full pulse-dot" />
              <span className="font-mono text-xs text-moss">Sans produits chimiques</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-20 md:pb-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto bg-forest section-round p-10 md:p-16 text-center">
          <span className="font-mono text-xs text-moss-light tracking-widest uppercase">Commander</span>
          <h2 className="font-heading font-extrabold text-white text-2xl md:text-4xl mt-3 tracking-tight">
            Envie de {product.name}{' '}
            <span className="font-drama italic text-madagascar-light">de Madagascar ?</span>
          </h2>
          <p className="font-body text-white/70 text-sm md:text-base mt-4 max-w-lg mx-auto leading-relaxed">
            Commandez directement via WhatsApp pour une réponse rapide, ou contactez-nous pour toute question.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href={whatsappUrl(`Bonjour Kazépices, je souhaite acheter du ${product.name} (${product.formats}).`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic inline-flex items-center gap-2 bg-[#25D366] text-white font-heading font-semibold px-7 py-3.5 text-sm"
              style={{ borderRadius: '2rem' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <MessageCircle size={16} />
                Acheter sur WhatsApp
              </span>
            </a>
            <Link
              to="/contact"
              className="btn-magnetic inline-flex items-center gap-2 border border-white/30 text-white font-heading font-medium px-6 py-3.5 text-sm bg-white/5 backdrop-blur-sm"
              style={{ borderRadius: '2rem' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Mail size={16} />
                Contactez-nous <ArrowRight size={16} />
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
              <span className="font-mono text-xs text-moss tracking-widest uppercase">Découvrir aussi</span>
              <h2 className="font-heading font-extrabold text-forest text-2xl md:text-3xl mt-2 tracking-tight">
                Nos autres produits
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/produits/${p.slug}`}
                  className="card-kazepices bg-cream overflow-hidden flex flex-col group"
                >
                  <div className={`relative h-48 bg-gradient-to-b ${p.color} to-cream flex items-center justify-center overflow-hidden`}>
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.alt || p.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <Package size={48} className="text-forest/20" />
                    )}
                    <span
                      className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-forest font-mono text-xs font-medium px-3 py-1"
                      style={{ borderRadius: '1rem' }}
                    >
                      {p.type}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-forest text-lg group-hover:text-madagascar transition-colors">{p.name}</h3>
                    <p className="font-body text-warm-gray text-sm mt-2 leading-relaxed line-clamp-2">
                      {p.description}
                    </p>
                    <span className="inline-flex items-center gap-1 font-heading text-xs font-semibold text-moss mt-3 group-hover:text-forest transition-colors">
                      Voir le produit <ArrowRight size={12} />
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
