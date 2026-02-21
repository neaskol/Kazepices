import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import usePageMeta from './hooks/usePageMeta'
import { BreadcrumbSchema } from './components/StructuredData'
import { Mail, MessageCircle, MapPin, Globe, Send, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react'

import logoImg from './assets/logo.webp'
import { whatsappUrl } from './data/config'

// Input sanitization: strip HTML tags and trim
function sanitize(str) {
  return str.replace(/<[^>]*>/g, '').trim()
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Rate limiting: max 3 submissions per 10 minutes
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW = 10 * 60 * 1000

function checkRateLimit() {
  const now = Date.now()
  const timestamps = JSON.parse(sessionStorage.getItem('_cf_ts') || '[]')
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW)
  if (recent.length >= RATE_LIMIT_MAX) return false
  recent.push(now)
  sessionStorage.setItem('_cf_ts', JSON.stringify(recent))
  return true
}

export default function ContactPage() {
  const heroRef = useRef(null)
  const formRef = useRef(null)
  const loadTime = useRef(Date.now())
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  usePageMeta({
    title: 'Contactez-Nous — Kazépices Madagascar',
    description: 'Commandez vos épices naturelles de Madagascar via WhatsApp ou notre formulaire de contact. Réponse garantie sous 24h.',
    canonicalPath: '/contact',
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })
      tl.fromTo('.contact-hero-tag', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
        .fromTo('.contact-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.3')
        .fromTo('.contact-hero-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-info-block', { y: 40, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out',
      })
      gsap.fromTo('.contact-form-block', { y: 50, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.75,
        ease: 'power3.out',
      })
    }, formRef)
    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const newErrors = {}
    const name = sanitize(formData.name)
    const email = sanitize(formData.email)
    const message = sanitize(formData.message)

    if (!name || name.length < 2) newErrors.name = 'Le nom doit contenir au moins 2 caractères.'
    if (name.length > 100) newErrors.name = 'Le nom ne doit pas dépasser 100 caractères.'
    if (!email || !isValidEmail(email)) newErrors.email = 'Veuillez entrer une adresse email valide.'
    if (!formData.subject) newErrors.subject = 'Veuillez choisir un sujet.'
    if (!message || message.length < 10) newErrors.message = 'Le message doit contenir au moins 10 caractères.'
    if (message.length > 5000) newErrors.message = 'Le message ne doit pas dépasser 5000 caractères.'

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Bot detection: reject if form submitted in less than 2 seconds
    if (Date.now() - loadTime.current < 2000) return

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    if (!checkRateLimit()) {
      setStatus('rate-limited')
      setTimeout(() => setStatus('idle'), 5000)
      return
    }

    setStatus('submitting')

    try {
      const cleanData = {
        name: sanitize(formData.name),
        email: sanitize(formData.email),
        subject: sanitize(formData.subject),
        message: sanitize(formData.message),
      }

      const response = await fetch('https://formsubmit.co/ajax/contact@kazepices.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...cleanData,
          _honey: '',
          _captcha: 'false',
          _subject: `Kazépices — ${cleanData.subject || 'Nouveau message'}`,
        }),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setErrors({})
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const inputClasses = 'w-full bg-white border border-moss/20 font-body text-charcoal text-sm px-4 py-3.5 outline-none transition-all duration-300 focus:border-forest focus:ring-2 focus:ring-forest/10 placeholder:text-warm-gray/50'
  const inputStyle = { borderRadius: '1rem' }

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Accueil', url: 'https://kazepices.com/' },
        { name: 'Contact', url: 'https://kazepices.com/contact' },
      ]} />
      {/* Hero banner */}
      <section
        ref={heroRef}
        className="relative bg-charcoal overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-16 lg:px-24"
      >
        {/* Background texture */}
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
            className="contact-hero-tag inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/70 text-xs font-mono px-4 py-1.5 mb-8 hover:bg-white/15 transition-colors"
            style={{ borderRadius: '2rem' }}
          >
            <ArrowLeft size={14} />
            Retour à l'accueil
          </Link>

          <h1 className="contact-hero-title font-heading font-extrabold text-white text-4xl md:text-6xl tracking-tight leading-[1.1]">
            Contactez{' '}
            <span className="font-drama italic text-madagascar-light">Kazépices.</span>
          </h1>

          <p className="contact-hero-desc font-body text-white/60 text-base md:text-lg mt-6 max-w-xl mx-auto leading-relaxed">
            Une question, une commande ou un partenariat ? Nous sommes à votre écoute.
            Remplissez le formulaire ci-dessous et nous vous répondrons sous 24 heures.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section ref={formRef} className="py-20 md:py-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Left — Info (2 cols) */}
          <div className="contact-info-block lg:col-span-2">
            <span className="font-mono text-xs text-moss tracking-widest uppercase">Nos coordonnées</span>
            <h2 className="font-heading font-bold text-forest text-2xl md:text-3xl mt-3 tracking-tight">
              Plusieurs façons de nous joindre.
            </h2>

            <div className="flex flex-col gap-6 mt-10">
              <a
                href="mailto:contact@kazepices.com"
                className="flex items-center gap-4 group hover-lift"
              >
                <div className="w-14 h-14 rounded-full bg-forest/10 flex items-center justify-center group-hover:bg-forest/20 transition-colors flex-shrink-0">
                  <Mail size={22} className="text-forest" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-forest text-sm">Email</p>
                  <p className="font-body text-warm-gray text-sm">contact@kazepices.com</p>
                </div>
              </a>

              <a
                href={whatsappUrl('Bonjour Kazépices, je souhaite en savoir plus sur vos produits.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group hover-lift"
              >
                <div className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors flex-shrink-0">
                  <MessageCircle size={22} className="text-[#25D366]" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-forest text-sm">WhatsApp</p>
                  <p className="font-body text-warm-gray text-sm">Réponse rapide garantie</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-madagascar/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} className="text-madagascar" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-forest text-sm">Madagascar</p>
                  <p className="font-body text-warm-gray text-sm">Livraison internationale</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-moss/10 flex items-center justify-center flex-shrink-0">
                  <Globe size={22} className="text-moss" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-forest text-sm">Horaires</p>
                  <p className="font-body text-warm-gray text-sm">Lun – Sam, 8h – 18h (GMT+3)</p>
                </div>
              </div>
            </div>

            {/* Trust signal */}
            <div className="mt-12 p-5 bg-forest/5 border border-forest/10" style={{ borderRadius: '1.5rem' }}>
              <p className="font-body text-forest/80 text-sm leading-relaxed">
                <span className="font-heading font-semibold text-forest">Commande directe ?</span>{' '}
                Pour une commande rapide, écrivez-nous sur WhatsApp avec le nom du produit et la quantité souhaitée. C'est le moyen le plus rapide !
              </p>
            </div>
          </div>

          {/* Right — Form (3 cols) */}
          <div className="contact-form-block lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="card-kazepices bg-cream p-8 md:p-10 flex flex-col gap-6"
            >
              <div>
                <h3 className="font-heading font-bold text-forest text-xl">Envoyez-nous un message</h3>
                <p className="font-body text-warm-gray text-sm mt-1">Tous les champs sont obligatoires.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="font-heading text-xs font-semibold text-forest mb-1.5 block">Nom complet</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    maxLength={100}
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    className={inputClasses}
                    style={inputStyle}
                  />
                  {errors.name && <p className="text-madagascar text-xs mt-1 font-body">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="font-heading text-xs font-semibold text-forest mb-1.5 block">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className={inputClasses}
                    style={inputStyle}
                  />
                  {errors.email && <p className="text-madagascar text-xs mt-1 font-body">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="font-heading text-xs font-semibold text-forest mb-1.5 block">Sujet</label>
                <select
                  id="contact-subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className={`${inputClasses} ${!formData.subject ? 'text-warm-gray/50' : ''}`}
                  style={inputStyle}
                >
                  <option value="" disabled>Choisir un sujet</option>
                  <option value="Commande">Commande</option>
                  <option value="Information produit">Information produit</option>
                  <option value="Partenariat">Partenariat</option>
                  <option value="Autre">Autre</option>
                </select>
                {errors.subject && <p className="text-madagascar text-xs mt-1 font-body">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="contact-message" className="font-heading text-xs font-semibold text-forest mb-1.5 block">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={6}
                  maxLength={5000}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre demande..."
                  className={`${inputClasses} resize-none`}
                  style={inputStyle}
                />
                {errors.message && <p className="text-madagascar text-xs mt-1 font-body">{errors.message}</p>}
              </div>

              {/* Honeypot anti-spam — accessible label for screen readers but visually hidden */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
                <label htmlFor="contact-website">Ne pas remplir</label>
                <input type="text" id="contact-website" name="_honey" tabIndex={-1} autoComplete="off" />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting' || status === 'rate-limited'}
                className="btn-magnetic w-full inline-flex items-center justify-center gap-2 bg-madagascar text-white font-heading font-semibold text-sm px-7 py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ borderRadius: '1.5rem' }}
              >
                <span className="btn-bg bg-madagascar-light" style={{ borderRadius: '1.5rem' }} />
                <span className="relative z-10 flex items-center gap-2">
                  {status === 'submitting' ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Envoyer le message
                    </>
                  )}
                </span>
              </button>

              {/* Success message */}
              {status === 'success' && (
                <div className="flex items-center gap-3 bg-moss/10 text-moss px-5 py-4 font-body text-sm" style={{ borderRadius: '1rem' }}>
                  <CheckCircle size={18} className="flex-shrink-0" />
                  Message envoyé avec succès ! Nous vous répondrons sous 24h.
                </div>
              )}

              {/* Error message */}
              {status === 'error' && (
                <div className="flex items-center gap-3 bg-madagascar/10 text-madagascar px-5 py-4 font-body text-sm" style={{ borderRadius: '1rem' }}>
                  <AlertCircle size={18} className="flex-shrink-0" />
                  Une erreur est survenue. Réessayez ou contactez-nous via WhatsApp.
                </div>
              )}

              {/* Rate limit message */}
              {status === 'rate-limited' && (
                <div className="flex items-center gap-3 bg-madagascar/10 text-madagascar px-5 py-4 font-body text-sm" style={{ borderRadius: '1rem' }}>
                  <AlertCircle size={18} className="flex-shrink-0" />
                  Trop de messages envoyés. Veuillez patienter quelques minutes avant de réessayer.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
