import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe, Leaf, Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger)

/* Card 1: Diagnostic Shuffler */
function ShufflerCard() {
  const { t } = useTranslation()
  const [cards, setCards] = useState([
    { labelKey: 'engagements.card1Item1', icon: '\u{1F33E}', color: 'bg-moss/10 text-moss' },
    { labelKey: 'engagements.card1Item2', icon: '\u{1F91D}', color: 'bg-forest/10 text-forest' },
    { labelKey: 'engagements.card1Item3', icon: '\u{1F3D8}\uFE0F', color: 'bg-madagascar/10 text-madagascar' },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="card-kazepices bg-cream dark:bg-[#282828] p-8 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-moss/10 flex items-center justify-center">
          <Globe size={20} className="text-moss dark:text-moss-light" />
        </div>
        <span className="font-mono text-xs text-warm-gray dark:text-white/50">01</span>
      </div>
      <h3 className="font-heading font-bold text-forest dark:text-cream text-xl mt-3">{t('engagements.card1Title')}</h3>
      <p className="font-body text-warm-gray dark:text-white/60 text-sm mt-2 leading-relaxed">
        {t('engagements.card1Desc')}
      </p>
      <div className="relative mt-6 flex-1 min-h-[180px]">
        {cards.map((card, i) => (
          <div
            key={card.labelKey}
            className={`absolute left-0 right-0 ${card.color} px-4 py-3 font-heading font-medium text-sm flex items-center gap-3 transition-all duration-500 rounded-2xl`}
            style={{
              top: `${i * 48}px`,
              zIndex: 3 - i,
              opacity: 1 - i * 0.25,
              transform: `scale(${1 - i * 0.04})`,
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <span className="text-lg">{card.icon}</span>
            {t(card.labelKey)}
          </div>
        ))}
      </div>
    </div>
  )
}

/* Card 2: Telemetry Typewriter */
function TypewriterCard() {
  const { t } = useTranslation()
  const TYPEWRITER_MESSAGES = [
    t('engagements.card2Msg1'),
    t('engagements.card2Msg2'),
    t('engagements.card2Msg3'),
    t('engagements.card2Msg4'),
    t('engagements.card2Msg5'),
  ]

  const [currentMsg, setCurrentMsg] = useState(0)
  const [text, setText] = useState('')
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (charIndex < TYPEWRITER_MESSAGES[currentMsg].length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + TYPEWRITER_MESSAGES[currentMsg][charIndex])
        setCharIndex((prev) => prev + 1)
      }, 35)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setCurrentMsg((prev) => (prev + 1) % TYPEWRITER_MESSAGES.length)
        setText('')
        setCharIndex(0)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [charIndex, currentMsg, TYPEWRITER_MESSAGES])

  return (
    <div className="card-kazepices bg-cream dark:bg-[#282828] p-8 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-moss/10 flex items-center justify-center">
          <Leaf size={20} className="text-moss dark:text-moss-light" />
        </div>
        <span className="font-mono text-xs text-warm-gray dark:text-white/50">02</span>
      </div>
      <h3 className="font-heading font-bold text-forest dark:text-cream text-xl mt-3">{t('engagements.card2Title')}</h3>
      <p className="font-body text-warm-gray dark:text-white/60 text-sm mt-2 leading-relaxed">
        {t('engagements.card2Desc')}
      </p>
      <div className="mt-6 flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 bg-moss rounded-full pulse-dot" aria-hidden="true" />
          <span className="font-mono text-xs text-moss dark:text-moss-light">{t('engagements.card2Live')}</span>
        </div>
        <div className="bg-forest/5 dark:bg-white/5 p-4 font-mono text-xs text-forest dark:text-moss-light leading-relaxed rounded-2xl" style={{ minHeight: '80px' }}>
          {text}
          <span className="blink-cursor text-madagascar">{'\u258A'}</span>
        </div>
      </div>
    </div>
  )
}

/* Card 3: Scheduler */
function SchedulerCard() {
  const { t } = useTranslation()
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
  const [activeDay, setActiveDay] = useState(-1)
  const [cursorPos, setCursorPos] = useState({ x: -20, y: 20 })
  const [clicking, setClicking] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    let cancelled = false
    const sequence = async () => {
      if (cancelled) return
      const dayIndex = Math.floor(Math.random() * 7)
      setCursorPos({ x: dayIndex * 42 + 20, y: 20 })
      await new Promise((r) => setTimeout(r, 800))
      if (cancelled) return
      setClicking(true)
      await new Promise((r) => setTimeout(r, 200))
      if (cancelled) return
      setClicking(false)
      setActiveDay(dayIndex)
      await new Promise((r) => setTimeout(r, 600))
      if (cancelled) return
      setCursorPos({ x: 160, y: 70 })
      await new Promise((r) => setTimeout(r, 500))
      if (cancelled) return
      setClicking(true)
      await new Promise((r) => setTimeout(r, 200))
      if (cancelled) return
      setClicking(false)
      setSaved(true)
      await new Promise((r) => setTimeout(r, 1500))
      if (cancelled) return
      setSaved(false)
      setActiveDay(-1)
    }
    const interval = setInterval(sequence, 5000)
    sequence()
    return () => { cancelled = true; clearInterval(interval) }
  }, [])

  return (
    <div className="card-kazepices bg-cream dark:bg-[#282828] p-8 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-moss/10 flex items-center justify-center">
          <Heart size={20} className="text-moss dark:text-moss-light" />
        </div>
        <span className="font-mono text-xs text-warm-gray dark:text-white/50">03</span>
      </div>
      <h3 className="font-heading font-bold text-forest dark:text-cream text-xl mt-3">{t('engagements.card3Title')}</h3>
      <p className="font-body text-warm-gray dark:text-white/60 text-sm mt-2 leading-relaxed">
        {t('engagements.card3Desc')}
      </p>
      <div className="mt-6 flex-1 relative">
        <div className="bg-forest/5 dark:bg-white/5 p-4 rounded-2xl">
          <div className="flex gap-1 mb-3">
            {days.map((day, i) => (
              <div
                key={i}
                className={`w-9 h-9 flex items-center justify-center text-xs font-heading font-semibold transition-all duration-300 rounded-xl ${activeDay === i
                  ? 'bg-madagascar text-white'
                  : 'bg-cream dark:bg-white/10 text-forest dark:text-cream'
                  }`}
                style={{
                  transform: activeDay === i ? 'scale(0.95)' : 'scale(1)',
                }}
              >
                {day}
              </div>
            ))}
          </div>
          <button
            className={`font-heading text-xs font-semibold px-4 py-2 transition-all duration-300 ${saved ? 'bg-moss text-white' : 'bg-forest/10 text-forest'
              } rounded-2xl`}
          >
            {saved ? t('engagements.scheduled') : t('engagements.schedule')}
          </button>
        </div>
        <div
          className="absolute pointer-events-none transition-all duration-700 ease-out"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            transform: clicking ? 'scale(0.8)' : 'scale(1)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 3l14 9-6 2-4 7-4-18z" fill="#1B3A2A" stroke="#fff" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function Engagements() {
  const sectionRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.engagement-title', { y: 40, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
      gsap.fromTo('.engagement-card', { y: 60, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.engagement-cards',
          start: 'top 80%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="engagements" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="engagement-title mb-16">
          <span className="font-mono text-xs text-moss dark:text-moss-light tracking-widest uppercase">{t('engagements.sectionLabel')}</span>
          <h2 className="font-heading font-extrabold text-forest dark:text-cream text-3xl md:text-5xl mt-3 tracking-tight">
            {t('engagements.heading1')}<br />
            <span className="font-drama italic text-madagascar">{t('engagements.heading2')}</span>
          </h2>
        </div>
        <div className="engagement-cards grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="engagement-card"><ShufflerCard /></div>
          <div className="engagement-card"><TypewriterCard /></div>
          <div className="engagement-card"><SchedulerCard /></div>
        </div>
      </div>
    </section>
  )
}
