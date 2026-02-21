import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'

import logoImg from '../assets/logo.webp'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
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

  return (
    <nav
      ref={navRef}
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
            alt="Kazépices"
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
            À propos
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
            Nos produits <ArrowRight size={14} />
          </span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          className={`md:hidden ${scrolled || !isHome ? 'text-forest' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-moss/20 pt-4">
          <Link
            to="/a-propos"
            onClick={() => setMenuOpen(false)}
            className={`text-sm font-medium font-heading ${
              scrolled || !isHome ? 'text-forest' : 'text-white'
            }`}
          >
            À propos
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className={`text-sm font-medium font-heading ${
              scrolled || !isHome ? 'text-forest' : 'text-white'
            }`}
          >
            Contact
          </Link>
          <Link
            to="/produits"
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
