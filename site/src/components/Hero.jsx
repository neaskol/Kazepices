import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import kazImage from '../../../assets/kaz.webp'
import kazMadaImage from '../../../assets/kazMada.webp'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section id="hero" className="relative h-dvh min-h-[600px] overflow-hidden">
      <img
        src={kazMadaImage}
        fetchPriority="high"
        alt={t('hero.imageAlt')}
        className="absolute inset-0 w-full h-full object-cover md:hidden"
      />
      <img
        src={kazImage}
        fetchPriority="high"
        alt={t('hero.imageAlt')}
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
      />
      <a href="#video" className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 text-white text-xs font-mono whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:text-white/90 transition-colors">
        <ChevronDown size={14} className="animate-bounce" />
        {t('hero.scroll')}
      </a>
    </section>
  )
}
