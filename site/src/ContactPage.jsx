import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import usePageMeta from './hooks/usePageMeta'
import { useLanguageRouter } from './hooks/useLanguageRouter'
import { BreadcrumbSchema } from './components/StructuredData'
import { Mail, MapPin, Globe, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { CONTACT_INFO } from './config/contact'

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
  const { t } = useTranslation()
  const { lang, routes } = useLanguageRouter()
  const formRef = useRef(null)
  const loadTime = useRef(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  // Initialize loadTime inside useEffect to prevent purely hook errors during render
  useEffect(() => {
    loadTime.current = Date.now()
  }, [])

  usePageMeta({
    title: t('contact.title'),
    description: t('contact.metaDesc'),
    canonicalPath: '/contact',
  })

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

    if (!name || name.length < 2) newErrors.name = t('contact.errorNameMin')
    if (name.length > 100) newErrors.name = t('contact.errorNameMax')
    if (!email || !isValidEmail(email)) newErrors.email = t('contact.errorEmail')
    if (!formData.subject) newErrors.subject = t('contact.errorSubject')
    if (!message || message.length < 10) newErrors.message = t('contact.errorMessageMin')
    if (message.length > 5000) newErrors.message = t('contact.errorMessageMax')

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

  const inputClasses = 'w-full bg-white dark:bg-charcoal dark:text-cream border border-moss/20 dark:border-white/10 font-body text-charcoal text-sm px-4 py-3.5 outline-none transition-all duration-300 focus:border-forest dark:focus:border-moss-light focus:ring-2 focus:ring-forest/10 dark:focus:ring-moss-light/10 placeholder:text-warm-gray/50 dark:placeholder:text-white/40 rounded-2xl'

  return (
    <>
      <BreadcrumbSchema items={[
        { name: t('common.home'), url: 'https://kazepices.com/' },
        { name: t('contact.breadcrumb'), url: 'https://kazepices.com/contact' },
      ]} />

      {/* Form section */}
      <section ref={formRef} className="pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Left — Info (2 cols) */}
          <div className="contact-info-block lg:col-span-2">
            <span className="font-mono text-xs text-moss dark:text-moss-light tracking-widest uppercase">{t('contact.infoLabel')}</span>
            <h2 className="font-heading font-bold text-forest dark:text-cream text-2xl md:text-3xl mt-3 tracking-tight">
              {t('contact.infoHeading')}
            </h2>

            <div className="flex flex-col gap-6 mt-10">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-4 group hover-lift"
              >
                <div className="w-14 h-14 rounded-full bg-forest/10 dark:bg-forest/20 flex items-center justify-center group-hover:bg-forest/20 dark:group-hover:bg-forest/30 transition-colors flex-shrink-0">
                  <Mail size={22} className="text-forest dark:text-moss-light" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-forest dark:text-cream text-sm">{t('contact.infoEmail')}</p>
                  <p className="font-body text-warm-gray dark:text-white/70 text-sm">{CONTACT_INFO.email}</p>
                </div>
              </a>

              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-4 group hover-lift"
              >
                <div className="w-14 h-14 rounded-full bg-madagascar/10 dark:bg-madagascar/20 flex items-center justify-center group-hover:bg-madagascar/20 dark:group-hover:bg-madagascar/30 transition-colors flex-shrink-0">
                  <Mail size={22} className="text-madagascar dark:text-madagascar" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-forest dark:text-cream text-sm">{t('contact.infoPhone')}</p>
                  <p className="font-body text-warm-gray dark:text-white/70 text-sm">{CONTACT_INFO.phoneDisplay}</p>
                </div>
              </a>

              <a
                href={CONTACT_INFO.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group hover-lift"
              >
                <div className="w-14 h-14 rounded-full bg-moss/10 dark:bg-moss/20 flex items-center justify-center group-hover:bg-moss/20 dark:group-hover:bg-moss/30 transition-colors flex-shrink-0">
                  <Globe size={22} className="text-moss dark:text-moss-light" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-forest dark:text-cream text-sm">{t('contact.infoWebsite')}</p>
                  <p className="font-body text-warm-gray dark:text-white/70 text-sm">{CONTACT_INFO.website}</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-forest/10 dark:bg-forest/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} className="text-forest dark:text-moss-light" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-forest dark:text-cream text-sm">{t('contact.infoContact')}</p>
                  <p className="font-body text-warm-gray dark:text-white/70 text-sm">{CONTACT_INFO.contactPerson}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form (3 cols) */}
          <div className="contact-form-block lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              aria-busy={status === 'submitting'}
              className="card-kazepices bg-cream dark:bg-[#282828] p-8 md:p-10 flex flex-col gap-6"
            >
              <div>
                <h3 className="font-heading font-bold text-forest dark:text-cream text-xl">{t('contact.formHeading')}</h3>
                <p className="font-body text-warm-gray dark:text-white/70 text-sm mt-1">{t('contact.formRequired')}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="font-heading text-xs font-semibold text-forest dark:text-moss-light mb-1.5 block">{t('contact.labelName')}</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    maxLength={100}
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact.placeholderName')}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'error-name' : undefined}
                    className={inputClasses}

                  />
                  {errors.name && <p id="error-name" role="alert" className="text-madagascar text-xs mt-1 font-body">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="font-heading text-xs font-semibold text-forest dark:text-moss-light mb-1.5 block">{t('contact.labelEmail')}</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact.placeholderEmail')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    className={inputClasses}

                  />
                  {errors.email && <p id="error-email" role="alert" className="text-madagascar text-xs mt-1 font-body">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="font-heading text-xs font-semibold text-forest dark:text-moss-light mb-1.5 block">{t('contact.labelSubject')}</label>
                <select
                  id="contact-subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'error-subject' : undefined}
                  className={`${inputClasses} ${!formData.subject ? 'text-warm-gray/50 dark:text-white/40' : ''}`}

                >
                  <option value="" disabled>{t('contact.subjectDefault')}</option>
                  <option value="Commande">{t('contact.subjectOrder')}</option>
                  <option value="Information produit">{t('contact.subjectInfo')}</option>
                  <option value="Partenariat">{t('contact.subjectPartnership')}</option>
                  <option value="Autre">{t('contact.subjectOther')}</option>
                </select>
                {errors.subject && <p id="error-subject" role="alert" className="text-madagascar text-xs mt-1 font-body">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="contact-message" className="font-heading text-xs font-semibold text-forest dark:text-moss-light mb-1.5 block">{t('contact.labelMessage')}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={6}
                  maxLength={5000}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact.placeholderMessage')}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'error-message' : undefined}
                  className={`${inputClasses} resize-none`}

                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message ? <p id="error-message" role="alert" className="text-madagascar text-xs font-body">{errors.message}</p> : <span />}
                  <span className={`font-mono text-xs ${formData.message.length > 4500 ? 'text-madagascar' : 'text-warm-gray/50 dark:text-white/50'}`} aria-live="polite">
                    {formData.message.length} / 5000
                  </span>
                </div>
              </div>

              {/* Honeypot anti-spam — accessible label for screen readers but visually hidden */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
                <label htmlFor="contact-website">{t('contact.honeypot')}</label>
                <input type="text" id="contact-website" name="_honey" tabIndex={-1} autoComplete="off" />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting' || status === 'rate-limited'}
                className="btn-magnetic w-full inline-flex items-center justify-center gap-2 bg-madagascar text-white font-heading font-semibold text-sm px-7 py-4 disabled:opacity-60 disabled:cursor-not-allowed rounded-3xl"
              >
                <span className="btn-bg bg-madagascar-light rounded-3xl" />
                <span className="relative z-10 flex items-center gap-2">
                  {status === 'submitting' ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                      </svg>
                      {t('contact.submitSending')}
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {t('contact.submitSend')}
                    </>
                  )}
                </span>
              </button>

              {/* Success message */}
              {status === 'success' && (
                <div role="status" className="flex items-center gap-3 bg-moss/10 dark:bg-moss/20 text-moss dark:text-moss-light px-5 py-4 font-body text-sm rounded-2xl">
                  <CheckCircle size={18} className="flex-shrink-0" />
                  {t('contact.successMsg')}
                </div>
              )}

              {/* Error message */}
              {status === 'error' && (
                <div role="status" className="flex items-center gap-3 bg-madagascar/10 text-madagascar px-5 py-4 font-body text-sm rounded-2xl">
                  <AlertCircle size={18} className="flex-shrink-0" />
                  {t('contact.errorMsg')}
                </div>
              )}

              {/* Rate limit message */}
              {status === 'rate-limited' && (
                <div role="status" className="flex items-center gap-3 bg-madagascar/10 text-madagascar px-5 py-4 font-body text-sm rounded-2xl">
                  <AlertCircle size={18} className="flex-shrink-0" />
                  {t('contact.rateLimitMsg')}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
