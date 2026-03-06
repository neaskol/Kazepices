import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLanguageRouter } from '../hooks/useLanguageRouter'
import { useTheme } from '../context/ThemeContext'

import logoImg from '../assets/logo.webp'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { t } = useTranslation()
  const { routes, lang, switchLanguage } = useLanguageRouter()
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current, {
        y: -40,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      })
    })
    return () => ctx.revert()
  }, [])

  // Escape key closes mobile menu
  useEffect(() => {
    if (!menuOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  // Focus trap inside mobile menu
  useEffect(() => {
    if (!menuOpen || !menuRef.current) return
    const menu = menuRef.current
    const focusableEls = menu.querySelectorAll('a, button')
    if (focusableEls.length === 0) return
    const firstEl = focusableEls[0]
    const lastEl = focusableEls[focusableEls.length - 1]

    const trapFocus = (e) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault()
          lastEl.focus()
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault()
          firstEl.focus()
        }
      }
    }
    menu.addEventListener('keydown', trapFocus)
    firstEl.focus()
    return () => menu.removeEventListener('keydown', trapFocus)
  }, [menuOpen])

  const linkColor = scrolled || !isHome
    ? isDark ? 'text-white' : 'text-forest'
    : 'text-white'

  const navBg = scrolled || !isHome
    ? isDark
      ? 'bg-charcoal/90 backdrop-blur-xl border border-white/10 shadow-lg'
      : 'bg-cream/85 backdrop-blur-xl border border-moss/20 shadow-lg'
    : 'bg-charcoal/40 backdrop-blur-md border border-white/15'

  return (
    <nav
      ref={navRef}
      aria-label={t('nav.mainMenu')}
      className={`fixed ${scrolled || !isHome ? 'top-4' : 'top-16'} left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out rounded-6xl ${navBg}`}
      style={{ padding: '0.6rem 1.2rem', maxWidth: 'calc(100vw - 2rem)' }}
    >
      <div className="flex items-center gap-3 md:gap-6">
        <Link to="/" className="flex-shrink-0">
          <img
            src={logoImg}
            alt={t('nav.logoAlt')}
            className="h-8 md:h-10 w-auto"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to={routes.about}
            className={`text-sm font-medium font-heading hover-lift transition-colors ${linkColor}`}
          >
            {t('nav.about')}
          </Link>
          <Link
            to={routes.contact}
            className={`text-sm font-medium font-heading hover-lift transition-colors ${linkColor}`}
          >
            {t('nav.contact')}
          </Link>
        </div>

        <Link
          to={routes.products}
          className="hidden md:inline-flex btn-magnetic items-center gap-2 bg-madagascar text-white text-sm font-semibold font-heading px-5 py-2.5 rounded-4xl"
        >
          <span className="btn-bg bg-madagascar-light rounded-4xl" />
          <span className="relative z-10 flex items-center gap-2">
            {t('nav.products')} <ArrowRight size={14} aria-hidden="true" />
          </span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          ref={toggleRef}
          className={`md:hidden ${linkColor}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
        >
          {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="menu"
          className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-moss/20 pt-4"
        >
          <Link
            to={routes.about}
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className={`text-sm font-medium font-heading ${linkColor}`}
          >
            {t('nav.about')}
          </Link>
          <Link
            to={routes.contact}
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className={`text-sm font-medium font-heading ${linkColor}`}
          >
            {t('nav.contact')}
          </Link>

          {/* Mobile language + theme toggles */}
          <div className="flex items-center justify-between gap-4 pt-3 border-t border-moss/20">
            <div className="flex items-center gap-1">
              <button
                onClick={() => switchLanguage('fr')}
                className={`text-xs font-heading font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  lang === 'fr'
                    ? isDark ? 'bg-white/20 text-white' : 'bg-forest text-white'
                    : isDark ? 'text-white/50 hover:text-white' : 'text-forest/50 hover:text-forest'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => switchLanguage('en')}
                className={`text-xs font-heading font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  lang === 'en'
                    ? isDark ? 'bg-white/20 text-white' : 'bg-forest text-white'
                    : isDark ? 'text-white/50 hover:text-white' : 'text-forest/50 hover:text-forest'
                }`}
              >
                EN
              </button>
            </div>
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDark
                  ? 'text-white/70 hover:text-white hover:bg-white/10'
                  : 'text-forest/70 hover:text-forest hover:bg-forest/10'
              }`}
            >
              {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            </button>
          </div>

          <Link
            to={routes.products}
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className="btn-magnetic bg-madagascar text-white text-sm font-semibold font-heading px-5 py-2.5 text-center rounded-4xl"
          >
            {t('nav.products')}
          </Link>
        </div>
      )}
    </nav>
  )
}
