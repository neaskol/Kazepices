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
    </section>
  )
}
