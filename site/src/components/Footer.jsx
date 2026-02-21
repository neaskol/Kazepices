import { Link } from 'react-router-dom'

import logoImg from '../assets/logo.webp'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white px-6 md:px-16 lg:px-24 py-16 md:py-20 mx-4 md:mx-8 mb-4" style={{ borderRadius: '3rem' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <img src={logoImg} alt="Kazépices" className="h-12 w-auto mb-4" />
            <p className="font-body text-white/50 text-sm leading-relaxed max-w-sm">
              Épices naturelles et artisanales de Madagascar. Un pont entre la richesse de la terre malgache et le monde.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 text-white/80">Navigation</h4>
            <div className="flex flex-col gap-2">
              <a
                href="/#hero"
                className="font-body text-white/40 text-sm hover:text-white/70 hover-lift transition-colors"
              >
                Accueil
              </a>
              <Link
                to="/produits"
                className="font-body text-white/40 text-sm hover:text-white/70 hover-lift transition-colors"
              >
                Produits
              </Link>
              <Link
                to="/a-propos"
                className="font-body text-white/40 text-sm hover:text-white/70 hover-lift transition-colors"
              >
                À propos
              </Link>
              <Link
                to="/contact"
                className="font-body text-white/40 text-sm hover:text-white/70 hover-lift transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 text-white/80">Produits</h4>
            <div className="flex flex-col gap-2">
              {['Curcuma', 'Poivre Noir', 'Gingembre', 'Moringa', 'Cannelle', 'Huile de Moringa'].map((p) => (
                <span key={p} className="font-body text-white/40 text-sm">{p}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-white/30">
            &copy; {new Date().getFullYear()} Kazépices Madagascar. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-moss-light rounded-full pulse-dot" />
            <span className="font-mono text-xs text-white/40">Système opérationnel</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
