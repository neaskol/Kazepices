import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function VideoSection() {
  const sectionRef = useRef(null)

  // YouTube IFrame API initialization would go here for custom controls,
  // For simplicity and immediate performance gain, we use standard iframe with params

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.video-content', { y: 50, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="video" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto video-content">
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-moss tracking-widest uppercase">Notre histoire</span>
          <h2 className="font-heading font-extrabold text-forest text-3xl md:text-5xl mt-3 tracking-tight">
            L'histoire de{' '}
            <span className="font-drama italic text-madagascar">Kazepices.</span>
          </h2>
          <p className="font-body text-warm-gray text-base mt-4 max-w-lg mx-auto leading-relaxed">
            Decouvrez notre parcours, nos valeurs et la passion qui anime chaque produit Kazepices.
          </p>
        </div>

        <div
          className="relative overflow-hidden group bg-charcoal"
          style={{ borderRadius: '2.5rem' }}
        >
          {/* YouTube Embed */}
          <div className="w-full aspect-video relative">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?controls=1&rel=0&modestbranding=1&playsinline=1`}
              title="Vidéo de présentation Kazepices Madagascar"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          <p className="sr-only">
            Lecteur vidéo YouTube intégré montrant la présentation de Kazepices Madagascar. Lecteur externe pour des performances optimales.
          </p>

          {/* Border glow — decorative */}
          <div
            className="absolute inset-0 border-2 border-moss/20 pointer-events-none"
            style={{ borderRadius: '2.5rem' }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
