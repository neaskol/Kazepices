import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Protocol() {
  const sectionRef = useRef(null)

  const steps = [
    {
      num: '01',
      title: 'Récolte',
      description: "Nos épices sont récoltées à la main par des agriculteurs malgaches passionnés, au moment optimal de maturité.",
    },
    {
      num: '02',
      title: 'Transformation',
      description: "Séchage naturel, broyage artisanal et contrôle qualité rigoureux dans nos ateliers à Madagascar.",
    },
    {
      num: '03',
      title: 'Livraison',
      description: "Emballées avec soin dans des conditionnements esthétiques et professionnels, prêtes à sublimer vos recettes.",
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.protocol-title', { y: 40, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
      gsap.fromTo('.protocol-card', { y: 60, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.protocol-cards',
          start: 'top 80%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-forest-light section-round mx-4 md:mx-8">
      <div className="max-w-6xl mx-auto">
        <div className="protocol-title mb-16">
          <span className="font-mono text-xs text-moss-light tracking-widest uppercase">Notre processus</span>
          <h2 className="font-heading font-extrabold text-white text-3xl md:text-5xl mt-3 tracking-tight">
            De la terre{' '}
            <span className="font-drama italic text-madagascar-light">à votre table.</span>
          </h2>
        </div>

        <div className="protocol-cards grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="protocol-card bg-white/10 backdrop-blur-sm border border-white/10 p-8 flex flex-col"
              style={{ borderRadius: '2rem' }}
            >
              <span className="font-mono text-madagascar-light text-sm">{step.num}</span>
              <h3 className="font-heading font-bold text-white text-2xl mt-3">{step.title}</h3>
              <p className="font-body text-white/70 text-sm mt-3 leading-relaxed">{step.description}</p>

              {/* Decorative SVG animation */}
              <div className="mt-auto pt-6">
                {step.num === '01' && (
                  <svg viewBox="0 0 120 40" className="w-full h-10 opacity-30" aria-hidden="true">
                    <circle cx="20" cy="20" r="8" fill="none" stroke="#D42B1E" strokeWidth="1">
                      <animate attributeName="r" values="6;12;6" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="60" cy="20" r="6" fill="none" stroke="#D42B1E" strokeWidth="1">
                      <animate attributeName="r" values="4;10;4" dur="3s" begin="0.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="1;0.3;1" dur="3s" begin="0.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="100" cy="20" r="5" fill="none" stroke="#D42B1E" strokeWidth="1">
                      <animate attributeName="r" values="3;9;3" dur="3s" begin="1s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="1;0.3;1" dur="3s" begin="1s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                )}
                {step.num === '02' && (
                  <svg viewBox="0 0 120 40" className="w-full h-10 opacity-30" aria-hidden="true">
                    <line x1="0" y1="20" x2="120" y2="20" stroke="#4A6741" strokeWidth="0.5" />
                    <rect x="0" y="18" width="4" height="4" fill="#D42B1E">
                      <animate attributeName="x" values="0;116;0" dur="4s" repeatCount="indefinite" />
                    </rect>
                    {[...Array(12)].map((_, i) => (
                      <circle key={i} cx={i * 10 + 5} cy="20" r="1.5" fill="#5C7D53" opacity="0.4" />
                    ))}
                  </svg>
                )}
                {step.num === '03' && (
                  <svg viewBox="0 0 120 40" className="w-full h-10 opacity-30" aria-hidden="true">
                    <path
                      d="M0,20 Q15,5 30,20 Q45,35 60,20 Q75,5 90,20 Q105,35 120,20"
                      fill="none"
                      stroke="#D42B1E"
                      strokeWidth="1.5"
                      strokeDasharray="200"
                      strokeDashoffset="200"
                    >
                      <animate attributeName="stroke-dashoffset" values="200;0;200" dur="5s" repeatCount="indefinite" />
                    </path>
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
