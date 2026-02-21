import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Package, MessageCircle } from 'lucide-react'

import products from '../data/products'
import { whatsappUrl } from '../data/config'

gsap.registerPlugin(ScrollTrigger)

export default function Products() {
  const sectionRef = useRef(null)

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
          <span className="font-mono text-xs text-moss tracking-widest uppercase">Catalogue</span>
          <h2 className="font-heading font-extrabold text-forest text-3xl md:text-5xl mt-3 tracking-tight">
            Nos produits{' '}
            <span className="font-drama italic text-madagascar">100% naturels.</span>
          </h2>
          <p className="font-body text-warm-gray text-base mt-4 max-w-xl">
            Chaque produit est cultivé, récolté et conditionné à Madagascar avec un savoir-faire artisanal unique.
          </p>
        </div>

        <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.name}
              className="product-card card-kazepices bg-cream overflow-hidden flex flex-col"
            >
              {/* Product image or gradient */}
              <div className={`relative h-48 bg-gradient-to-b ${product.color} to-cream flex items-center justify-center overflow-hidden`}>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.alt || product.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Package size={48} className="text-forest/20" aria-hidden="true" />
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-moss">{product.type}</span>
                  <span className="font-mono text-xs text-warm-gray">{product.formats}</span>
                </div>
                <h3 className="font-heading font-bold text-forest text-lg">{product.name}</h3>
                <p className="font-body text-warm-gray text-sm mt-2 leading-relaxed flex-1">
                  {product.description}
                </p>
                <a
                  href={whatsappUrl(`Bonjour Kazépices, je souhaite commander du ${product.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magnetic mt-4 inline-flex items-center justify-center gap-2 bg-forest text-white font-heading font-semibold text-sm px-5 py-3"
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
          ))}
        </div>
      </div>
    </section>
  )
}
