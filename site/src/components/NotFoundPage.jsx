import { Link } from 'react-router-dom'
import { ArrowLeft, ShoppingBag, Users, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLanguageRouter } from '../hooks/useLanguageRouter'

export default function NotFoundPage() {
  const { t } = useTranslation()
  const { routes } = useLanguageRouter()

  const suggestions = [
    { to: routes.products, icon: ShoppingBag, label: t('notFound.linkProducts') },
    { to: routes.about, icon: Users, label: t('notFound.linkAbout') },
    { to: routes.contact, icon: Mail, label: t('notFound.linkContact') },
  ]

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 text-center py-32">
      <span className="font-mono text-xs text-moss tracking-widest uppercase">{t('notFound.label')}</span>
      <h1 className="font-heading font-extrabold text-forest text-6xl md:text-8xl mt-4">{t('notFound.heading')}</h1>
      <p className="font-body text-warm-gray text-lg mt-4">{t('notFound.message')}</p>

      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 bg-madagascar text-white font-heading font-semibold px-7 py-3.5 text-sm rounded-4xl"
      >
        <ArrowLeft size={16} />
        {t('common.backHome')}
      </Link>

      <div className="mt-14 w-full max-w-lg">
        <p className="font-body text-warm-gray text-sm mb-6">{t('notFound.suggestion')}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {suggestions.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="inline-flex items-center gap-2 bg-forest/5 text-forest font-heading font-semibold text-sm px-5 py-3 rounded-4xl hover:bg-forest/10 transition-colors"
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
