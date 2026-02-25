import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-xs text-moss tracking-widest uppercase">{t('notFound.label')}</span>
      <h1 className="font-heading font-extrabold text-forest text-6xl md:text-8xl mt-4">{t('notFound.heading')}</h1>
      <p className="font-body text-warm-gray text-lg mt-4">{t('notFound.message')}</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 bg-madagascar text-white font-heading font-semibold px-7 py-3.5 text-sm"
        style={{ borderRadius: '2rem' }}
      >
        <ArrowLeft size={16} />
        {t('common.backHome')}
      </Link>
    </div>
  )
}
