// IMPORTANT: Replace 261XXXXXXXXX with the real Kazépices WhatsApp number
export const WHATSAPP_NUMBER = '261XXXXXXXXX'

export function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
