import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Philosophy() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.philo-line', { y: 50, opacity: 0 }, {
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
    <section id="philosophie" ref={sectionRef} className="relative py-32 md:py-40 px-6 md:px-16 lg:px-24 bg-charcoal overflow-hidden section-round mx-4 md:mx-8">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&q=80')`,
          borderRadius: 'inherit',
        }}
      />
      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="philo-line font-body text-white/50 text-lg md:text-xl leading-relaxed">
          La plupart des marques d'épices se concentrent sur :
          <span className="text-white/70"> le volume, l'industrialisation, le rendement.</span>
        </p>
        <h2 className="philo-line font-drama italic text-white text-4xl md:text-6xl lg:text-7xl mt-8 leading-[1.1]">
          Nous, nous cultivons la{' '}
          <span className="text-madagascar-light">patience.</span>
        </h2>
        <p className="philo-line font-body text-white/60 text-base md:text-lg mt-8 max-w-2xl leading-relaxed">
          Chaque épice Kazépices est récoltée à la main, séchée naturellement et conditionnée avec soin à Madagascar.
          Pas de raccourcis. Pas de compromis. Juste la terre, le soleil et le savoir-faire artisanal transmis de génération en génération.
        </p>
      </div>
    </section>
  )
}
