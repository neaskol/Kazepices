import { MessageCircle } from 'lucide-react'
import { whatsappUrl } from '../data/config'

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl('Bonjour Kazépices, je souhaite commander.')}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Contacter via WhatsApp"
    >
      <MessageCircle size={28} color="white" fill="white" />
    </a>
  )
}
