import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'

import logoImg from '../assets/logo.webp'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

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

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

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

  return (
    <nav
      ref={navRef}
      aria-label="Menu principal"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        scrolled || !isHome
          ? 'bg-cream/85 backdrop-blur-xl border border-moss/20 shadow-lg'
          : 'bg-charcoal/40 backdrop-blur-md border border-white/15'
      }`}
      style={{ borderRadius: '3rem', padding: '0.6rem 1.5rem', maxWidth: '90vw' }}
    >
      <div className="flex items-center gap-6">
        <Link to="/" className="flex-shrink-0">
          <img
            src={logoImg}
            alt="Kazepices — Accueil"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/a-propos"
            className={`text-sm font-medium font-heading hover-lift transition-colors ${
              scrolled || !isHome ? 'text-forest' : 'text-white'
            }`}
          >
            A propos
          </Link>
          <Link
            to="/contact"
            className={`text-sm font-medium font-heading hover-lift transition-colors ${
              scrolled || !isHome ? 'text-forest' : 'text-white'
            }`}
          >
            Contact
          </Link>
        </div>

        <Link
          to="/produits"
          className="hidden md:inline-flex btn-magnetic items-center gap-2 bg-madagascar text-white text-sm font-semibold font-heading px-5 py-2.5"
          style={{ borderRadius: '2rem' }}
        >
          <span className="btn-bg bg-madagascar-light" style={{ borderRadius: '2rem' }} />
          <span className="relative z-10 flex items-center gap-2">
            Nos produits <ArrowRight size={14} aria-hidden="true" />
          </span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          ref={toggleRef}
          className={`md:hidden ${scrolled || !isHome ? 'text-forest' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
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
            to="/a-propos"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className={`text-sm font-medium font-heading ${
              scrolled || !isHome ? 'text-forest' : 'text-white'
            }`}
          >
            A propos
          </Link>
          <Link
            to="/contact"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className={`text-sm font-medium font-heading ${
              scrolled || !isHome ? 'text-forest' : 'text-white'
            }`}
          >
            Contact
          </Link>
          <Link
            to="/produits"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className="btn-magnetic bg-madagascar text-white text-sm font-semibold font-heading px-5 py-2.5 text-center"
            style={{ borderRadius: '2rem' }}
          >
            Nos produits
          </Link>
        </div>
      )}
    </nav>
  )
}
