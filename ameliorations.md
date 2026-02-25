# Audit UI/UX - Kazepices | Ameliorations

**Note globale : A-**
**Date : 25 fevrier 2026**

---

## Priorite haute (1-6)

### 1. Footer : produits cliquables
**Fichier :** `site/src/components/Footer.jsx`
**Probleme :** Les noms de produits dans le footer sont des `<span>` statiques, non cliquables.
**Solution :** Remplacer par des `<Link>` vers les pages produit individuelles, en utilisant les donnees dynamiques de `products.js`.
**Impact :** Navigation, SEO, UX

### 2. Fil d'Ariane visuel (breadcrumbs)
**Fichiers :** `site/src/ProductDetailPage.jsx`, `site/src/ProductsPage.jsx`
**Probleme :** Les breadcrumbs existent uniquement en JSON-LD (donnees structurees) mais ne sont pas affiches visuellement.
**Solution :** Ajouter un composant breadcrumb visuel : Accueil > Produits > [Nom du produit]
**Impact :** Navigation, UX, orientation utilisateur

### 3. Produits lies par categorie
**Fichier :** `site/src/ProductDetailPage.jsx` (lignes 78-80)
**Probleme :** Les produits "lies" sont juste les 3 premiers produits, sans filtrage par categorie.
**Solution :** Filtrer par `product.category` avant de selectionner les 3 produits.
**Impact :** UX, pertinence du contenu

### 4. ErrorBoundary bilingue
**Fichier :** `site/src/components/ErrorBoundary.jsx`
**Probleme :** Message d'erreur code en dur en francais uniquement.
**Solution :** Utiliser i18next pour traduire les messages d'erreur.
**Impact :** Accessibilite, i18n

### 5. Gestion produit introuvable
**Fichier :** `site/src/ProductDetailPage.jsx` (lignes 73-75)
**Probleme :** Redirection silencieuse vers la page produits si le slug est invalide. L'utilisateur ne comprend pas pourquoi.
**Solution :** Afficher une page 404 produit avec message explicatif et suggestions.
**Impact :** UX, communication erreur

### 6. Page 404 amelioree
**Fichier :** `site/src/components/NotFoundPage.jsx`
**Probleme :** Page 404 trop minimaliste (seul CTA = retour accueil).
**Solution :** Ajouter suggestions de pages populaires (Produits, A propos, Contact), animation, et liens utiles.
**Impact :** UX, retention utilisateur

---

## Priorite moyenne (7-13)

### 7. Consolider les borderRadius inline
**Fichiers :** 40+ instances dans les composants
**Probleme :** `style={{ borderRadius: '2rem' }}` repete partout au lieu d'utiliser des classes Tailwind.
**Solution :** Creer des classes utilitaires Tailwind (`rounded-2xl`, `rounded-3xl`) ou des classes CSS personnalisees.
**Impact :** Maintenabilite, DRY

### 8. Dimensions d'images pour eviter le CLS
**Fichiers :** `ProductsPage.jsx`, `Products.jsx`, `ProductDetailPage.jsx`
**Probleme :** Images sans attributs `width`/`height`, risque de Cumulative Layout Shift.
**Solution :** Ajouter `width` et `height` explicites sur les balises `<img>`.
**Impact :** Performance, Core Web Vitals

### 9. Loading skeleton
**Fichiers :** `AppRouter.jsx`, composants avec images
**Probleme :** Pas de skeleton screens pendant le chargement des images et pages.
**Solution :** Ajouter des placeholders animes (shimmer/skeleton) pour les cartes produit et images.
**Impact :** UX percue, performance percue

### 10. Filtres persistants dans l'URL
**Fichier :** `site/src/ProductsPage.jsx`
**Probleme :** L'etat du filtre de categorie se perd au rechargement de la page.
**Solution :** Sauvegarder la categorie active dans les query params (`?category=poudre`).
**Impact :** UX, partageabilite des liens

### 11. Recherche produits
**Fichier :** `site/src/ProductsPage.jsx`
**Probleme :** Pas de fonctionnalite de recherche parmi les produits.
**Solution :** Ajouter un champ de recherche filtrant par nom, type, description.
**Impact :** UX, decouverte de produits

### 12. Compteur de caracteres (formulaire)
**Fichier :** `site/src/ContactPage.jsx`
**Probleme :** Le champ message a une limite de 5000 caracteres sans indicateur visuel.
**Solution :** Ajouter un compteur de caracteres restants sous le textarea.
**Impact :** UX formulaire

### 13. Liens sociaux dans le footer
**Fichier :** `site/src/components/Footer.jsx`
**Probleme :** Pas de liens vers les reseaux sociaux.
**Solution :** Ajouter une section avec icones Instagram, LinkedIn, Facebook, etc.
**Impact :** Engagement, presence sociale

---

## Priorite basse (14-20)

### 14. Mode sombre
**Fichier :** `site/src/index.css` + composants
**Probleme :** Pas de support dark mode.
**Solution :** Implementer un toggle clair/sombre avec variables CSS et classes `dark:` Tailwind.
**Impact :** Confort visuel, modernite

### 15. Styles d'impression
**Fichier :** `site/src/index.css`
**Probleme :** Pas de regles `@media print`.
**Solution :** Ajouter des styles pour masquer la navigation, le bouton WhatsApp, et optimiser les couleurs.
**Impact :** Impression, accessibilite

### 16. Fallback WhatsApp
**Fichiers :** Composants avec CTA WhatsApp
**Probleme :** Pas de fallback si WhatsApp n'est pas installe.
**Solution :** Detecter la disponibilite et proposer un email alternatif.
**Impact :** UX, accessibilite

### 17. Inscription newsletter
**Fichier :** `site/src/components/Footer.jsx`
**Probleme :** Pas de formulaire d'inscription newsletter.
**Solution :** Ajouter un champ email d'inscription dans le footer.
**Impact :** Marketing, engagement

### 18. Section FAQ
**Probleme :** Aucune page FAQ pour les questions frequentes.
**Solution :** Creer une page FAQ avec accordion pour les questions courantes (livraison, qualite, origine).
**Impact :** SEO, support client

### 19. Temoignages clients
**Fichier :** `site/src/AboutPage.jsx`
**Probleme :** Pas de section temoignages ou avis clients.
**Solution :** Ajouter une section avec citations de clients ou partenaires.
**Impact :** Confiance, preuve sociale

### 20. Navigation prev/next produit
**Fichier :** `site/src/ProductDetailPage.jsx`
**Probleme :** Pas de navigation entre produits (precedent/suivant).
**Solution :** Ajouter des fleches de navigation vers le produit precedent et suivant.
**Impact :** UX, decouverte produits

---

## Scores par section

| Section | Score | Points forts | Points faibles |
|---------|-------|-------------|----------------|
| **Navigation (Navbar)** | 9/10 | Focus trap, ARIA, scroll-responsive | Pas d'indicateur de page active |
| **Hero** | 8.5/10 | srcSet responsive, animations GSAP | Pas d'etat de chargement image |
| **Produits (accueil)** | 8/10 | Lazy loading, WhatsApp integration | Pas de prix, images sans dimensions |
| **Page Produits** | 8/10 | Filtres avec ARIA, grid responsive | Pas de tri, recherche, persistence |
| **Detail Produit** | 7.5/10 | Hero immersif, CTA multiples | Produits lies non filtres, pas de breadcrumb visuel |
| **Contact** | 9.5/10 | Validation, honeypot, rate limit | Pas de compteur caracteres |
| **A propos** | 9/10 | Storytelling, 7 sections, fondateur | Pas de temoignages, liens internes |
| **Footer** | 6.5/10 | Grid responsive, navigation | Produits non cliquables, pas de social |
| **Page 404** | 5/10 | Minimaliste, bilingue | Trop basique, pas de suggestions |
| **CSS/Responsive** | 8/10 | Mobile-first, a11y, reduced-motion | Inline borderRadius, pas de dark mode |
| **Accessibilite** | 8.5/10 | Skip link, ARIA, focus-visible | Contrastes texte/70 a verifier |
| **Performance** | 8/10 | Lazy loading, WebP, code splitting | Pas de width/height images, pas de srcSet partout |
