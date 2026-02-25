import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useLanguageRouter } from '../hooks/useLanguageRouter'
import { useTheme } from '../context/ThemeContext'

export default function LeftControls() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { lang, switchLanguage } = useLanguageRouter()
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isLight = scrolled || !isHome

  return (
    <div className="fixed top-4 left-4 md:left-8 z-50 flex flex-col gap-2">
      {/* Language toggle */}
      <div
        className={`flex flex-col gap-1 p-2 rounded-3xl transition-all duration-500 ${
          isLight
            ? isDark
              ? 'bg-charcoal/90 backdrop-blur-xl border border-white/10 shadow-lg'
              : 'bg-cream/85 backdrop-blur-xl border border-moss/20 shadow-lg'
            : 'bg-charcoal/40 backdrop-blur-md border border-white/15'
        }`}
      >
        <button
          onClick={() => switchLanguage('fr')}
          aria-label="Français"
          className={`text-xs font-heading font-semibold w-8 h-8 rounded-full transition-colors flex items-center justify-center ${
            lang === 'fr'
              ? (isLight
                ? isDark ? 'bg-white/20 text-white' : 'bg-forest text-white'
                : 'bg-white/20 text-white')
              : (isLight
                ? isDark ? 'text-white/50 hover:text-white' : 'text-forest/50 hover:text-forest'
                : 'text-white/50 hover:text-white')
          }`}
        >
          FR
        </button>
        <button
          onClick={() => switchLanguage('en')}
          aria-label="English"
          className={`text-xs font-heading font-semibold w-8 h-8 rounded-full transition-colors flex items-center justify-center ${
            lang === 'en'
              ? (isLight
                ? isDark ? 'bg-white/20 text-white' : 'bg-forest text-white'
                : 'bg-white/20 text-white')
              : (isLight
                ? isDark ? 'text-white/50 hover:text-white' : 'text-forest/50 hover:text-forest'
                : 'text-white/50 hover:text-white')
          }`}
        >
          EN
        </button>
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
        className={`w-12 h-12 rounded-full transition-all duration-500 hover:scale-110 flex items-center justify-center ${
          isLight
            ? isDark
              ? 'bg-charcoal/90 backdrop-blur-xl border border-white/10 shadow-lg text-white/70 hover:text-white'
              : 'bg-cream/85 backdrop-blur-xl border border-moss/20 shadow-lg text-forest/70 hover:text-forest'
            : 'bg-charcoal/40 backdrop-blur-md border border-white/15 text-white/70 hover:text-white'
        }`}
      >
        {isDark
          ? <Sun size={18} aria-hidden="true" />
          : <Moon size={18} aria-hidden="true" />
        }
      </button>
    </div>
  )
}
