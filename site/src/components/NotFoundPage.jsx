import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-xs text-moss tracking-widest uppercase">Erreur 404</span>
      <h1 className="font-heading font-extrabold text-forest text-6xl md:text-8xl mt-4">404</h1>
      <p className="font-body text-warm-gray text-lg mt-4">Cette page n'existe pas.</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 bg-madagascar text-white font-heading font-semibold px-7 py-3.5 text-sm"
        style={{ borderRadius: '2rem' }}
      >
        <ArrowLeft size={16} />
        Retour à l'accueil
      </Link>
    </div>
  )
}
