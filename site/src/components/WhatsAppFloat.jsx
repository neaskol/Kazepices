import { MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { whatsappUrl } from '../data/config'

export default function WhatsAppFloat() {
  const { t } = useTranslation()
  return (
    <a
      href={whatsappUrl(t('whatsappFloat.message'))}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label={t('whatsappFloat.label')}
    >
      <MessageCircle size={28} color="white" fill="white" />
    </a>
  )
}
