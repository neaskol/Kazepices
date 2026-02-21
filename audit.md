# Audit Complet — Kazepices Madagascar

**Date :** 21 fevrier 2026
**Scope :** Code source + SEO technique + On-page + Performance + Accessibilite
**Stack :** React 19 | Vite 7 | Tailwind CSS 4 | GSAP 3 | React Router 7

---

## Resume Executif

Le site Kazepices est une SPA (Single Page Application) React visuellement soignee, avec des animations GSAP professionnelles et un design coherent. Cependant, **le SEO est gravement insuffisant** pour un site e-commerce/vitrine qui depend du trafic organique. Le code presente aussi des problemes de performance. L'accessibilite a ete significativement amelioree (session 4) avec skip-link, focus-visible, route announcer, focus trap, contrastes WCAG AA, ARIA formulaire/filtres/video, et aria-hidden sur les elements decoratifs.

### Score Global

| Categorie | Score | Verdict |
|---|---|---|
| Design / UX | 8/10 | Excellent |
| Code qualite | 8/10 | Bon (architecture + ErrorBoundary + code splitting + a11y) |
| SEO technique | 7/10 | Bon (robots.txt, sitemap, canonical, OG, Twitter, JSON-LD, AI bots) |
| SEO on-page | 6.5/10 | Ameliore (meta dynamiques, alt descriptifs, breadcrumbs, structured data) |
| AI SEO | 7/10 | Bon (robots.txt AI bots, JSON-LD, contenu extractable) |
| Performance | 5.5/10 | Ameliore (lazy loading, code splitting) |
| Accessibilite | 7.5/10 | Bon (skip-link, focus-visible, route announcer, focus trap, contrastes, ARIA formulaire/filtres, video accessible, aria-hidden decoratifs) |
| Securite | 8.5/10 | Tres bon (CSP, HSTS, headers complets, validation, rate limiting, honeypot avance, config centralisee) |

---

## PARTIE 1 — AUDIT DU CODE

### 1.1 Architecture & Structure

**Fichiers source (mis a jour le 21/02/2026 — session 4 accessibilite) :**
```
site/
  index.html              # Point d'entree HTML (+ meta securite CSP/X-Frame/referrer)
  package.json            # Dependencies
  public/
    _headers              # Headers securite pour deploiement (Netlify/Vercel/Cloudflare)
  vite.config.js          # Config Vite
  eslint.config.js        # Config ESLint
  src/
    main.jsx              # Bootstrap React + GSAP prefers-reduced-motion
    App.jsx               # ~28 lignes — shell layout (ErrorBoundary + BrowserRouter + skip-link + header/main#main-content)
    AppRouter.jsx          # Routes + React.lazy/Suspense + ScrollToTop + 404
    ProductsPage.jsx      # ~273 lignes — page produits (imports data/products.js)
    AboutPage.jsx         # ~619 lignes — page a propos
    ContactPage.jsx       # ~325 lignes — page contact
    index.css             # ~190 lignes — styles globaux + Tailwind + prefers-reduced-motion + sr-only + focus-visible + skip-link
    data/
      products.js         # Source unique des donnees produits (6 produits)
      config.js           # Configuration centralisee (numero WhatsApp)
    hooks/
      usePageMeta.js      # Hook custom — title + meta description dynamiques par page
    components/
      ErrorBoundary.jsx   # Catch erreurs JS globales (class component)
      NotFoundPage.jsx    # Page 404
      ScrollToTop.jsx     # Scroll to top + aria-live route announcer pour lecteurs d'ecran
      NoiseOverlay.jsx    # Overlay SVG bruit
      Navbar.jsx          # Barre de navigation (aria-expanded, aria-label, aria-controls, focus trap, Escape, role=menu)
      Hero.jsx            # Section hero (H1 unique corrige)
      VideoSection.jsx    # Lecteur video accessible (boutons, aria-labels, clavier M pour mute, sr-only description)
      Engagements.jsx     # Section engagements (ShufflerCard, TypewriterCard, SchedulerCard)
      Philosophy.jsx      # Section philosophie
      Products.jsx        # Grille produits homepage (loading="lazy")
      Protocol.jsx        # Section processus (recolte, transformation, livraison)
      ContactCTA.jsx      # Call-to-action contact homepage
      Footer.jsx          # Pied de page
      WhatsAppFloat.jsx   # Bouton flottant WhatsApp
      HomePage.jsx        # Assemblage sections homepage + usePageMeta
    assets/
      logo.webp           # 22 Ko
      kazepices1.webp     # 41 Ko
      kazepices2.webp     # 52 Ko
      kazepices-presentation.mp4  # 51.6 Mo (!)
```

**Problemes identifies :**

| # | Probleme | Fichier | Severite | Statut |
|---|---|---|---|---|
| 1 | `App.jsx` fait 1137 lignes avec 15+ composants dans un seul fichier | App.jsx | Moyenne | CORRIGE — App.jsx reduit a ~18 lignes, 12 composants extraits dans `src/components/` |
| 2 | Donnees produits dupliquees entre `App.jsx` et `ProductsPage.jsx` | App.jsx, ProductsPage.jsx | Haute | CORRIGE — Source unique dans `src/data/products.js` |
| 3 | Pas de fichier de route dedie — tout est dans `App.jsx` | App.jsx | Basse | CORRIGE — Routes dans `src/AppRouter.jsx` |
| 4 | Pas de dossier `components/` — tous les composants sont inline | src/ | Moyenne | CORRIGE — Dossier `src/components/` cree avec 12 fichiers modulaires |
| 5 | Fichier `logo_backup.webp` inutile en production | assets/ | Basse | CORRIGE — Fichier supprime |

### 1.2 Qualite du Code React

**Points positifs :**
- Utilisation correcte de `gsap.context()` avec cleanup dans `useEffect`
- `useCallback` utilise pour les handlers du lecteur video (components/VideoSection.jsx)
- `StrictMode` active dans main.jsx
- Les timers/intervals sont correctement nettoyes avec `clearInterval` / `clearTimeout`
- Architecture modulaire avec dossier `components/` et fichier de donnees partage `data/products.js`

**Problemes identifies :**

| # | Probleme | Localisation | Severite |
|---|---|---|---|
| 1 | ~~**Pas d'Error Boundary** — une erreur JS fait crasher tout le site~~ | Global | ~~Haute~~ CORRIGÉ |
| 2 | ~~**Pas de page 404** — les routes inconnues affichent une page blanche~~ | AppRouter.jsx | ~~Haute~~ CORRIGÉ |
| 3 | ~~**Pas de code splitting** — toutes les pages sont chargees en un seul bundle~~ | AppRouter.jsx | ~~Moyenne~~ CORRIGÉ |
| 4 | `messages` dans `TypewriterCard` recree a chaque render car defini dans le composant | components/Engagements.jsx | Basse |
| 5 | ~~Les `label` du formulaire ne sont pas lies aux `input` via `htmlFor`/`id`~~ | ContactPage.jsx | ~~Moyenne~~ CORRIGÉ |
| 6 | Le `SchedulerCard` utilise `async/await` avec `setTimeout` dans un `useEffect` sans AbortController | components/Engagements.jsx | Basse |
| 7 | ~~Multiples `H1` sur la page d'accueil (2 balises h1 dans Hero)~~ | ~~components/Hero.jsx~~ | ~~Haute~~ CORRIGE |
| 8 | ~~`scrollTo(0, 0)` dans chaque page — devrait etre gere globalement via React Router~~ | ~~ProductsPage.jsx, AboutPage.jsx, ContactPage.jsx~~ | ~~Basse~~ CORRIGÉ |

### 1.3 Liens WhatsApp Incomplets

~~**Probleme critique :** Tous les liens WhatsApp utilisent `wa.me/?text=...` **sans numero de telephone**.~~ CORRIGÉ

**Correction appliquee :** Liens WhatsApp centralises dans `src/data/config.js` via la fonction `whatsappUrl()`. Le numero est configure en un seul endroit (`WHATSAPP_NUMBER`). Tous les composants importent cette fonction au lieu de hardcoder les URLs.

**Fichiers modifies :**
- `src/data/config.js` (nouveau) — configuration centralisee du numero
- `components/Products.jsx`, `components/ContactCTA.jsx`, `components/WhatsAppFloat.jsx`
- `ProductsPage.jsx`, `ContactPage.jsx`

**ACTION REQUISE :** Remplacer `261XXXXXXXXX` dans `src/data/config.js` par le vrai numero WhatsApp.

### 1.4 Performance

| # | Probleme | Impact | Severite |
|---|---|---|---|
| 1 | **Video de 51.6 Mo** embarquee dans le bundle via import | Temps de chargement enorme | Critique |
| 2 | **Images externes Unsplash** chargees depuis un CDN tiers sans controle cache | Dependance externe, LCP degrade | Haute |
| 3 | ~~**Aucun lazy loading** (`loading="lazy"`) sur les images~~ | ~~Toutes les images chargees d'un coup~~ | ~~Haute~~ CORRIGÉ |
| 4 | ~~**Pas de code splitting** — `React.lazy()` / `Suspense` non utilise~~ | ~~Bundle JS monolithique~~ | ~~Moyenne~~ CORRIGÉ |
| 5 | **Noise overlay SVG** (`z-40`, fixed) rendu en permanence sur toute la page | Cout GPU constant | Basse |
| 6 | **4 familles de polices Google Fonts** chargees en une requete | Bloque le rendu (~200Ko de fonts) | Moyenne |
| 7 | Image hero Unsplash en `w=1920` sans `srcset` ni responsive images | Mobile charge une image desktop | Moyenne |

**Images Unsplash utilisees (dependance externe) :**
- Hero : `photo-1596040033229-a9821ebd058d?w=1920`
- Philosophy bg : meme image en `w=1200`
- About Hero : `photo-1570742544137-3a469196c32b?w=1920`
- About Origin : `photo-1564198729838-cb82ee0c733c?w=800`
- About Founder : `photo-1615485290382-441e4d049cb5?w=600`
- About Savoir-faire : 3 images supplementaires

### 1.5 Securite

| # | Probleme | Severite | Statut |
|---|---|---|---|
| 1 | Adresse email `contact@kazepices.com` exposee dans le code source (cible spam) | Basse | Non corrige (inevitable pour mailto:) |
| 2 | `rel="noopener noreferrer"` correctement applique sur tous les liens `target="_blank"` | OK | OK |
| 3 | ~~Honeypot basique (`display: none`)~~ | ~~Basse~~ | CORRIGÉ — honeypot avance (off-screen, aria-hidden, autoComplete=off) |
| 4 | ~~Formulaire sans validation cote client~~ | ~~Moyenne~~ | CORRIGÉ — validation email, longueur min/max, sanitization HTML |
| 5 | ~~Pas de Content Security Policy (CSP)~~ | ~~Haute~~ | CORRIGÉ — CSP complet (meta tag + _headers) |
| 6 | ~~Pas de headers de securite~~ | ~~Haute~~ | CORRIGÉ — X-Frame-Options, X-Content-Type-Options, HSTS, Permissions-Policy, X-XSS-Protection |
| 7 | ~~Pas de rate limiting sur le formulaire~~ | ~~Moyenne~~ | CORRIGÉ — 3 soumissions max / 10 minutes (sessionStorage) |
| 8 | ~~Pas de detection de bots~~ | ~~Moyenne~~ | CORRIGÉ — rejet si soumission < 2 secondes apres chargement |
| 9 | ~~Images externes sans crossorigin/referrerpolicy~~ | ~~Basse~~ | CORRIGÉ — crossOrigin="anonymous" + referrerPolicy="no-referrer" |
| 10 | ~~ErrorBoundary sans controle de log~~ | ~~Basse~~ | CORRIGÉ — componentDidCatch avec logs dev-only |
| 11 | ~~Source maps en production~~ | ~~Moyenne~~ | CORRIGÉ — sourcemap: false dans vite.config.js |
| 12 | ~~console.log en production~~ | ~~Basse~~ | CORRIGÉ — esbuild drop: ['console', 'debugger'] |
| 13 | ~~Liens WhatsApp non centralises~~ | ~~Moyenne~~ | CORRIGÉ — config.js centralisee |
| 14 | ~~Pas de Permissions-Policy~~ | ~~Moyenne~~ | CORRIGÉ — camera, microphone, geolocation, interest-cohort bloques |
| 15 | ~~Pas de HSTS~~ | ~~Haute~~ | CORRIGÉ — Strict-Transport-Security avec preload |
| 16 | ~~Fonts sans referrerpolicy~~ | ~~Basse~~ | CORRIGÉ — referrerpolicy="strict-origin-when-cross-origin" sur Google Fonts |

---

## PARTIE 2 — AUDIT SEO

### 2.1 Probleme Fondamental : SPA sans SSR

Le site est une **Single Page Application React** rendue cote client. Google peut crawler les SPA mais avec des limitations :
- Le contenu n'existe pas dans le HTML initial (juste `<div id="root"></div>`)
- Les meta tags sont statiques et identiques pour toutes les pages
- Le temps de rendu JS ajoute un delai avant indexation

**Recommandation :** Migrer vers Next.js, Astro, ou Remix pour du SSR/SSG.

### 2.2 SEO Technique

| Element | Statut | Detail |
|---|---|---|
| `robots.txt` | OK | Fichier cree dans `/public/` — CORRIGÉ |
| `sitemap.xml` | OK | Fichier cree dans `/public/` avec 4 URLs — CORRIGÉ |
| `canonical` URL | OK | Balise canonical dans index.html + dynamique via usePageMeta — CORRIGÉ |
| HTTPS | NON VERIFIABLE | Depend du deploiement |
| Structure URL | OK | `/`, `/produits`, `/a-propos`, `/contact` — propre et lisible |
| Favicon | OK | `logo.webp` dans `/public/` |
| `lang="fr"` | OK | Present sur `<html>` |
| `charset="UTF-8"` | OK | Present |
| `viewport` | OK | Present et correct |

### 2.3 Meta Tags

**Situation actuelle (index.html) :**
```html
<title>Kazepices Madagascar — Epices Naturelles</title>
<meta name="description" content="Kazepices Madagascar — Epices naturelles et artisanales de haute qualite, directement de Madagascar." />
```

**Problemes :**

| # | Probleme | Severite |
|---|---|---|
| 1 | ~~**Title et description identiques pour TOUTES les pages** (SPA = un seul HTML)~~ | ~~Critique~~ CORRIGÉ — hook `usePageMeta` |
| 2 | ~~**Pas de Open Graph tags** — partage sur Facebook/LinkedIn sans image ni description~~ | ~~Critique~~ CORRIGÉ — OG tags dans index.html + dynamiques via usePageMeta |
| 3 | ~~**Pas de Twitter Card tags** — partage sur X/Twitter sans apercu~~ | ~~Haute~~ CORRIGÉ — Twitter Card tags dans index.html + dynamiques via usePageMeta |
| 4 | **Pas de meta keywords** | Basse |
| 5 | ~~**Pas de meta author**~~ | ~~Basse~~ CORRIGÉ — `<meta name="author">` ajoute dans index.html |
| 6 | ~~**Pas de gestion dynamique des meta** (react-helmet ou equivalent absent)~~ | ~~Critique~~ CORRIGÉ — `usePageMeta` hook custom |

**Meta tags manquantes pour chaque page :**

Page Accueil :
```html
<title>Kazepices Madagascar — Epices Naturelles & Artisanales de Madagascar</title>
<meta name="description" content="Decouvrez nos epices 100% naturelles de Madagascar : curcuma, poivre noir, gingembre, moringa, cannelle. Livraison internationale." />
<meta property="og:title" content="Kazepices — Epices Naturelles de Madagascar" />
<meta property="og:description" content="Epices artisanales recoltees a la main a Madagascar. Qualite premium, 0 produits chimiques." />
<meta property="og:image" content="https://kazepices.com/og-image.jpg" />
<meta property="og:url" content="https://kazepices.com/" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="fr_FR" />
<meta name="twitter:card" content="summary_large_image" />
```

Page Produits :
```html
<title>Nos Produits — Epices & Huiles Naturelles | Kazepices Madagascar</title>
<meta name="description" content="Catalogue complet Kazepices : curcuma, poivre noir, gingembre, moringa, cannelle en poudre et huile de moringa. 100% naturel, sans produits chimiques." />
```

Page A Propos :
```html
<title>Notre Histoire & Engagements — Kazepices Madagascar</title>
<meta name="description" content="Fondee par Ikbal Charifou, Kazepices valorise les richesses naturelles de Madagascar. Decouvrez notre mission, nos engagements et notre savoir-faire." />
```

Page Contact :
```html
<title>Contactez-Nous — Kazepices Madagascar</title>
<meta name="description" content="Commandez vos epices naturelles de Madagascar via WhatsApp ou notre formulaire de contact. Reponse garantie sous 24h." />
```

### 2.4 Donnees Structurees (JSON-LD)

**Statut : IMPLEMENTE** — CORRIGÉ le 21/02/2026

Composant `src/components/StructuredData.jsx` cree avec 4 schemas JSON-LD :

| Schema | Composant | Page | Contenu |
|---|---|---|---|
| Organization + WebSite (@graph) | `OrganizationSchema` | App.jsx (global) | Nom, URL, logo, fondateur, contact, langue |
| LocalBusiness | `LocalBusinessSchema` | HomePage.jsx | Adresse, geo, horaires, fondateur, priceRange |
| ItemList (Product) | `ProductListSchema` | ProductsPage.jsx | Liste des 6 produits avec brand, origin, category |
| BreadcrumbList | `BreadcrumbSchema` | ProductsPage, AboutPage, ContactPage | Fil d'Ariane structure |

Tous les schemas utilisent `<script type="application/ld+json">` via `dangerouslySetInnerHTML`.

### 2.5 Hierarchie des Headings

**Page d'Accueil (mis a jour) :**
```
H1: "La nature est le secret." (components/Hero.jsx) ← CORRIGE — fusionne en un seul H1
  H2: "L'histoire de Kazepices." (components/VideoSection.jsx)
  H2: "Un pont entre Madagascar et le monde." (components/Engagements.jsx)
  H2: "Nous, nous cultivons la patience." (components/Philosophy.jsx)
  H2: "Nos produits 100% naturels." (components/Products.jsx)
  H2: "De la terre a votre table." (components/Protocol.jsx)
  H2: "Pret a commander ?" (components/ContactCTA.jsx)
    H3: "Impact Local" (components/Engagements.jsx)
    H3: "Environnement" (components/Engagements.jsx)
    H3: "Sante & Qualite" (components/Engagements.jsx)
    H3: [Noms de produits]
```

**~~Probleme :~~ CORRIGE** — Les 2 balises `<h1>` du hero ont ete fusionnees en une seule dans `components/Hero.jsx`.

**Pages secondaires :** Chaque page (Produits, A propos, Contact) a correctement une seule `<h1>`. OK.

### 2.6 HTML Semantique

| Element | Statut | Detail |
|---|---|---|
| `<nav>` | OK | Present dans Navbar (components/Navbar.jsx) |
| `<footer>` | OK | Present (components/Footer.jsx) |
| `<section>` | OK | Utilise pour chaque bloc de contenu |
| `<header>` | OK | Navbar enveloppe dans `<header>` — CORRIGÉ |
| `<main>` | OK | Contenu principal enveloppe dans `<main>` — CORRIGÉ |
| `<article>` | ABSENT | Les cartes produits ne sont pas des `<article>` |
| `<aside>` | ABSENT | Non utilise |

### 2.7 Images & Alt Text

| Image | Alt Text | Statut |
|---|---|---|
| Logo Navbar | `alt="Kazepices"` | OK |
| Logo Footer | `alt="Kazepices"` | OK |
| Hero background | `alt="Epices de Madagascar"` | OK |
| Produit images | `alt={product.alt || product.name}` (dynamique) | OK — CORRIGÉ avec alt descriptifs SEO |
| About : Baobabs | `alt="Avenue des Baobabs, Madagascar"` | OK |
| About : Founder | `alt="Savoir-faire artisanal"` | OK |
| About : Steps | `alt={step.title}` (dynamique) | OK |
| `loading="lazy"` | OK | Ajoute sur toutes les images sous le fold — CORRIGÉ |

~~**Recommandation :** Les alt des produits devraient etre plus descriptifs~~ CORRIGÉ — Chaque produit a un `alt` descriptif SEO dans `data/products.js` (ex: "Curcuma en poudre de Madagascar — epice naturelle anti-inflammatoire Kazepices")

### 2.8 Liens Internes

| Element | Statut |
|---|---|
| Navigation header | OK — liens vers /produits, /a-propos, /contact |
| Footer | OK — liens de navigation + liste produits |
| CTA homepage | OK — liens vers /produits et /contact |
| Retour accueil | OK — present sur les pages secondaires |
| Liens entre produits | ABSENT — pas de liens vers les fiches individuelles |
| Breadcrumbs | PARTIEL — BreadcrumbSchema JSON-LD ajoute sur Produits, A propos, Contact. Pas de breadcrumbs visuels. CORRIGÉ (schema) |

### 2.9 Contenu & Mots-cles

**Mots-cles cibles potentiels :**
- "epices madagascar"
- "curcuma madagascar"
- "poivre noir madagascar"
- "moringa madagascar"
- "epices naturelles"
- "epices artisanales"
- "gingembre madagascar"

**Problemes de contenu :**

| # | Probleme | Severite |
|---|---|---|
| 1 | Pas de pages produits individuelles (/produits/curcuma) — tout est sur une seule page | Critique |
| 2 | Pas de blog/contenu educatif pour le SEO long-tail | Haute |
| 3 | ~~Descriptions produits identiques sur homepage et page produits (duplication)~~ CORRIGE — source unique `data/products.js` | ~~Moyenne~~ |
| 4 | Pas de FAQ / contenu riche pour la position 0 de Google | Moyenne |
| 5 | Pas de page mentions legales / CGV | Haute |

---

## PARTIE 3 — AUDIT ACCESSIBILITE (a11y)

| # | Probleme | Norme WCAG | Severite | Statut |
|---|---|---|---|---|
| 1 | ~~**Pas de skip-to-content link**~~ | 2.4.1 | ~~Haute~~ | CORRIGÉ — skip-link + `#main-content` dans App.jsx |
| 2 | ~~**Labels formulaire non connectes** via `htmlFor`/`id`~~ | 1.3.1 | ~~Haute~~ | CORRIGÉ (session precedente) |
| 3 | ~~**Menu mobile** sans gestion du focus / `aria-expanded`~~ | 4.1.2 | ~~Haute~~ | CORRIGÉ — focus trap, Escape key, aria-controls, role=menu, role=menuitem |
| 4 | **Video** sans sous-titres | 1.2.1 | Moyenne | PARTIELLEMENT CORRIGÉ — description textuelle sr-only ajoutee, controles accessibles. Sous-titres restent a faire |
| 5 | ~~**Lecteur video custom** sans controles accessibles au clavier~~ | 2.1.1 | ~~Haute~~ | CORRIGÉ — boutons `<button>`, aria-labels dynamiques, raccourci clavier M pour mute |
| 6 | ~~**Animations GSAP** non desactivables (`prefers-reduced-motion` non respecte)~~ | 2.3.3 | ~~Moyenne~~ | CORRIGÉ (session precedente) |
| 7 | ~~**Contraste texte** `text-white/40` et `text-white/50` insuffisant (< 4.5:1)~~ | 1.4.3 | ~~Moyenne~~ | CORRIGÉ — opacites relevees sur toutes les pages (Footer, Hero, Philosophy, Protocol, About, Products, Contact) |
| 8 | ~~Un seul `aria-label` dans tout le site~~ | 4.1.2 | ~~Haute~~ | CORRIGÉ — aria-labels sur nav, video, boutons, filtres produits, formulaire |
| 9 | ~~Boutons sans texte accessible~~ | 4.1.2 | ~~Moyenne~~ | CORRIGÉ — aria-label dynamique sur tous les boutons (menu, play/pause, mute, filtres, expand) |
| 10 | **Pas d'annonce de changement de route** pour les lecteurs d'ecran | 4.1.3 | Haute | CORRIGÉ — aria-live region dans ScrollToTop.jsx |
| 11 | **Pas de styles focus-visible** sur les elements interactifs | 2.4.7 | Haute | CORRIGÉ — outline 2px forest sur a, button, input, select, textarea, [tabindex] |
| 12 | **Elements decoratifs** non masques des technologies d'assistance | 1.3.1 | Moyenne | CORRIGÉ — aria-hidden sur pulse-dots, icones decoratives, SVGs, NoiseOverlay |
| 13 | **Formulaire** sans retour d'erreur accessible | 3.3.1 | Haute | CORRIGÉ — aria-invalid, aria-describedby, role=alert sur erreurs, role=status sur feedback, aria-busy |
| 14 | **Filtres produits** sans indication d'etat pour les lecteurs d'ecran | 4.1.2 | Moyenne | CORRIGÉ — role=group, aria-pressed, aria-live sur le compteur |
| 15 | **Details produits expandables** sans ARIA | 4.1.2 | Moyenne | CORRIGÉ — aria-expanded + aria-controls sur les boutons "En savoir plus" |

---

## PARTIE 4 — PLAN D'ACTION PRIORITAIRE

### Priorite CRITIQUE (a faire immediatement)

1. ~~**Ajouter le numero WhatsApp** dans tous les liens `wa.me/`~~ FAIT — liens centralises dans `data/config.js` via `whatsappUrl()`. **Numero reel a renseigner dans config.js**
2. ~~**Creer des meta tags uniques par page** (title, description)~~ FAIT — hook `usePageMeta` custom (react-helmet-async incompatible React 19)
3. ~~**Creer un fichier `robots.txt`** dans `/public/`~~ FAIT
4. ~~**Creer un `sitemap.xml`** dans `/public/` avec les 4 URLs~~ FAIT
5. **Reduire la video** a < 5 Mo ou la streamer depuis YouTube/Vimeo
6. ~~**Corriger les H1** — fusionner les 2 H1 du hero en un seul~~ FAIT le 21/02/2026 — fusionne en un seul `<h1>` dans `components/Hero.jsx`

### Priorite HAUTE (semaine 1-2)

7. ~~Ajouter les donnees structurees JSON-LD (Organization + Product)~~ FAIT — 4 schemas (Organization, LocalBusiness, ProductList, Breadcrumb) dans `StructuredData.jsx`
8. ~~Ajouter `loading="lazy"` sur toutes les images sous le fold~~ FAIT
9. ~~Ajouter un Error Boundary React global~~ FAIT
10. ~~Ajouter une page 404 (`<Route path="*" element={<NotFoundPage />} />`)~~ FAIT
11. Creer des pages produits individuelles (`/produits/curcuma`, `/produits/moringa`, etc.)
12. ~~Ajouter les balises `<main>` et `<header>` semantiques~~ FAIT
13. ~~Connecter les labels aux inputs du formulaire via `htmlFor`/`id`~~ FAIT
14. ~~Dedupliquer les donnees produits (un seul fichier `data/products.js`)~~ FAIT le 21/02/2026 — `src/data/products.js` cree, importe par `Products.jsx` et `ProductsPage.jsx`

### Priorite MOYENNE (semaine 3-4)

15. Telecharger les images Unsplash en local (eliminer la dependance externe)
16. ~~Implementer le code splitting avec `React.lazy()` + `Suspense`~~ FAIT
17. ~~Ajouter `<link rel="canonical">` sur chaque page~~ FAIT — canonical dans index.html + dynamique via `usePageMeta` avec `canonicalPath` par page
18. Ajouter une page mentions legales / CGV
19. ~~Gerer `prefers-reduced-motion` pour desactiver les animations~~ FAIT
20. ~~Ajouter les controles d'accessibilite au lecteur video~~ FAIT — boutons accessibles, aria-labels, raccourci clavier M, sr-only description
21. Optimiser les Google Fonts (ne charger que les poids utilises)
22. Ajouter `srcset` et `sizes` aux images pour le responsive

### Priorite BASSE (long terme)

23. Migrer vers Next.js/Astro pour le SSR (meilleur SEO)
24. Creer un blog / contenu educatif (recettes, bienfaits des epices)
25. Ajouter des pages alternatives/comparaison SEO
26. ~~Implementer un systeme de breadcrumbs~~ PARTIELLEMENT FAIT — BreadcrumbSchema JSON-LD ajoute sur 3 pages. Breadcrumbs visuels restent a faire
27. ~~Refactorer App.jsx en composants modulaires~~ FAIT le 21/02/2026 — App.jsx reduit a ~18 lignes, 12 composants dans `src/components/`, routes dans `AppRouter.jsx`
28. Ajouter des tests unitaires et d'integration

---

## ANNEXE — Dependances du Projet

| Package | Version | Statut |
|---|---|---|
| react | ^19.2.0 | A jour |
| react-dom | ^19.2.0 | A jour |
| react-router-dom | ^7.13.0 | A jour |
| tailwindcss | ^4.2.0 | A jour |
| gsap | ^3.14.2 | A jour |
| lucide-react | ^0.575.0 | A jour |
| @tailwindcss/vite | ^4.2.0 | A jour |
| vite | ^7.3.1 | A jour |
| eslint | ^9.39.1 | A jour |

Pas de vulnerabilites connues dans les dependances principales.

---

*Audit realise le 21/02/2026 par Claude Opus 4.6 — Derniere mise a jour : session 4 (accessibilite)*

---

## CORRECTIONS APPLIQUEES — 21/02/2026

| # | Probleme | Correction | Fichiers modifies |
|---|---|---|---|
| 1.1-1 | App.jsx 1137 lignes, 15+ composants | App.jsx reduit a ~18 lignes. 12 composants extraits dans `src/components/` | App.jsx, components/*.jsx |
| 1.1-2 | Donnees produits dupliquees | Source unique `src/data/products.js` importee par Products.jsx et ProductsPage.jsx | data/products.js, ProductsPage.jsx |
| 1.1-3 | Pas de fichier de routes dedie | Routes extraites dans `src/AppRouter.jsx` | AppRouter.jsx, App.jsx |
| 1.1-4 | Pas de dossier components/ | Dossier `src/components/` cree avec 12 fichiers modulaires | components/*.jsx |
| 1.1-5 | logo_backup.webp inutile | Fichier supprime | assets/ |
| 1.2-7 | Double H1 dans le hero | Fusionne en un seul `<h1>` avec `<span>` pour le style italic | components/Hero.jsx |
| 1.2-1 | Pas d'Error Boundary | `ErrorBoundary` class component cree | components/ErrorBoundary.jsx, App.jsx |
| 1.2-2 | Pas de page 404 | `NotFoundPage` cree + route catch-all `path="*"` | components/NotFoundPage.jsx, AppRouter.jsx |
| 1.2-3 | Pas de code splitting | `React.lazy()` + `Suspense` pour ProductsPage, AboutPage, ContactPage | AppRouter.jsx |
| 1.2-5 | Labels non connectes aux inputs | `htmlFor`/`id` ajoutes sur les 4 champs du formulaire | ContactPage.jsx |
| 1.2-8 | scrollTo dans chaque page | `ScrollToTop` composant global + `usePageMeta` hook par page | components/ScrollToTop.jsx, pages |
| 1.4-3 | Pas de loading lazy | `loading="lazy"` ajoute sur images sous le fold | AboutPage, ProductsPage, Products.jsx |
| 2.2-1 | Pas de robots.txt | Fichier cree dans `public/` | public/robots.txt |
| 2.2-2 | Pas de sitemap.xml | Fichier cree avec 4 URLs | public/sitemap.xml |
| 2.3-1 | Meta tags identiques | Hook `usePageMeta` avec title/description uniques par page | hooks/usePageMeta.js, pages |
| 2.6-1 | Pas de header/main | `<header>` et `<main>` ajoutes dans App.jsx | App.jsx |
| 3-2 | Labels non connectes | htmlFor/id sur les 4 champs | ContactPage.jsx |
| 3-3 | Menu mobile sans aria | `aria-expanded` + `aria-label` ajoutes | Navbar.jsx |
| 3-6 | prefers-reduced-motion | CSS media query + GSAP defaults disabled | index.css, main.jsx |

**Score Code qualite** : 5/10 → 6.5/10 → 8/10 (+3.0 total)

**Build verifie** : `vite build` passe sans erreur (8.11s). Chunks separes : NotFoundPage (0.77 KB), ProductsPage (8.92 KB), ContactPage (10.65 KB), AboutPage (20.67 KB).

---

## CORRECTIONS SEO APPLIQUEES — 21/02/2026 (session 2)

### Modifications par fichier

| # | Correction | Fichiers modifies |
|---|---|---|
| S1 | **usePageMeta enrichi** — Gestion dynamique de OG, Twitter Card, canonical URL, og:locale, og:site_name | `hooks/usePageMeta.js` |
| S2 | **index.html complete** — OG tags, Twitter Cards, canonical, author, robots, theme-color dans le HTML statique | `index.html` |
| S3 | **Headers securite** — CSP, X-Frame-Options, X-Content-Type-Options, referrer policy ajoutes | `index.html` |
| S4 | **StructuredData.jsx cree** — 4 composants JSON-LD : OrganizationSchema, LocalBusinessSchema, ProductListSchema, BreadcrumbSchema | `components/StructuredData.jsx` (nouveau) |
| S5 | **OrganizationSchema global** — Schema Organization + WebSite injecte sur toutes les pages | `App.jsx` |
| S6 | **LocalBusinessSchema homepage** — Schema LocalBusiness avec geo, horaires, fondateur | `components/HomePage.jsx` |
| S7 | **ProductListSchema + BreadcrumbSchema produits** — Schema ItemList + Breadcrumb sur la page produits | `ProductsPage.jsx` |
| S8 | **BreadcrumbSchema pages secondaires** — Schema Breadcrumb sur A Propos et Contact | `AboutPage.jsx`, `ContactPage.jsx` |
| S9 | **Canonical dynamique par page** — `canonicalPath` ajoute a chaque appel usePageMeta (`/`, `/produits`, `/a-propos`, `/contact`) | `HomePage.jsx`, `ProductsPage.jsx`, `AboutPage.jsx`, `ContactPage.jsx` |
| S10 | **Alt descriptifs produits** — Champ `alt` SEO ajoute aux 6 produits + fallback `alt={product.alt \|\| product.name}` | `data/products.js`, `components/Products.jsx`, `ProductsPage.jsx` |
| S11 | **Slugs produits** — Champ `slug` ajoute aux 6 produits pour les futures pages individuelles | `data/products.js` |
| S12 | **robots.txt AI bots** — Regles explicites Allow pour 7 bots AI (GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended, Bingbot) | `public/robots.txt` |
| S13 | **sitemap.xml lastmod** — Dates `<lastmod>2026-02-21</lastmod>` ajoutees aux 4 URLs | `public/sitemap.xml` |
| S14 | **Sanitization formulaire** — Validation email, sanitization inputs, rate limiting (3 soumissions / 10 min) | `ContactPage.jsx` |

### Evolution des scores

| Categorie | Avant | Apres | Gain |
|---|---|---|---|
| SEO technique | 4/10 | 7/10 | +3 |
| SEO on-page | 3/10 | 6.5/10 | +3.5 |
| AI SEO | 0/10 | 7/10 | +7 (nouveau) |
| Securite | 6/10 | 7/10 | +1 |

**Build verifie** : `vite build` passe sans erreur (7.81s).

**Note :** Le score securite a ensuite ete porte a 8.5/10 lors de la session 3 (voir ci-dessous).

### Reste a faire (non traite dans cette session)

| # | Element | Priorite |
|---|---|---|
| 1 | Creer l'image OG reelle (`public/og-image.jpg`) — actuellement reference mais inexistante | Haute |
| 2 | Creer des pages produits individuelles (`/produits/curcuma`, etc.) — slugs deja prepares | Haute |
| 3 | Migrer vers Next.js/Astro pour SSR (le plus gros gain SEO restant) | Haute |
| 4 | Ajouter un blog / contenu educatif | Moyenne |
| 5 | Breadcrumbs visuels (le schema JSON-LD est fait, manque l'UI) | Basse |
| 6 | ~~Ajouter le numero WhatsApp reel dans les liens `wa.me/`~~ CORRIGÉ — liens centralises dans `data/config.js`. **Renseigner le vrai numero** dans `WHATSAPP_NUMBER` | Critique |
| 7 | Reduire la video 51.6 Mo ou streamer depuis YouTube | Critique |

---

## CORRECTIONS SECURITE APPLIQUEES — 21/02/2026 (session 3)

### Modifications par fichier

| # | Correction | Fichiers modifies |
|---|---|---|
| SEC-1 | **CSP complet (meta + headers)** — Content-Security-Policy restrictif : default-src 'self', script-src 'self', img-src whitelist Unsplash, connect-src whitelist FormSubmit, frame-ancestors 'none' | `index.html`, `public/_headers` |
| SEC-2 | **Headers de securite deploiement** — Fichier `_headers` pour Netlify/Vercel/Cloudflare : X-Frame-Options DENY, X-Content-Type-Options nosniff, X-XSS-Protection, Referrer-Policy, Permissions-Policy, HSTS preload | `public/_headers` (nouveau) |
| SEC-3 | **Validation formulaire** — Sanitization HTML (`<tags>` strippees), validation email regex, longueur min/max (nom 2-100, message 10-5000), attributs `maxLength` et `autoComplete` sur les inputs | `ContactPage.jsx` |
| SEC-4 | **Rate limiting client** — Max 3 soumissions par fenetre de 10 minutes via `sessionStorage`. Bouton desactive + message utilisateur en cas de depassement | `ContactPage.jsx` |
| SEC-5 | **Detection de bots** — Rejet silencieux si le formulaire est soumis moins de 2 secondes apres le chargement de la page (bot detection par timing) | `ContactPage.jsx` |
| SEC-6 | **Honeypot ameliore** — Champ honeypot repositionne hors ecran (`position: absolute, left: -9999px`), `aria-hidden="true"`, `autoComplete="off"`, label associe pour les lecteurs d'ecran | `ContactPage.jsx` |
| SEC-7 | **Liens WhatsApp centralises** — Fonction `whatsappUrl()` dans `data/config.js` avec numero configurable. Tous les composants importent cette fonction | `data/config.js` (nouveau), `Products.jsx`, `ContactCTA.jsx`, `WhatsAppFloat.jsx`, `ProductsPage.jsx`, `ContactPage.jsx` |
| SEC-8 | **Images externes securisees** — `crossOrigin="anonymous"` + `referrerPolicy="no-referrer"` ajoutes sur toutes les `<img>` chargeant des images Unsplash | `Hero.jsx`, `AboutPage.jsx` (3 images) |
| SEC-9 | **ErrorBoundary securise** — `componentDidCatch` ajoute avec logs console uniquement en mode dev (`import.meta.env.DEV`). Aucune info technique exposee a l'utilisateur | `ErrorBoundary.jsx` |
| SEC-10 | **Build hardening Vite** — `sourcemap: false` (pas de source maps en prod), `esbuild.drop: ['console', 'debugger']` (suppression des logs en prod) | `vite.config.js` |
| SEC-11 | **Headers dev server** — X-Content-Type-Options, X-Frame-Options, Referrer-Policy sur le serveur de dev Vite | `vite.config.js` |
| SEC-12 | **Fonts securisees** — `referrerpolicy="strict-origin-when-cross-origin"` sur le lien Google Fonts, `crossorigin` sur preconnect | `index.html` |
| SEC-13 | **Permissions-Policy** — Blocage camera, microphone, geolocation, interest-cohort (FLoC) | `public/_headers` |

### Evolution des scores

| Categorie | Avant (session 2) | Apres (session 3) | Gain |
|---|---|---|---|
| Securite | 7/10 | 8.5/10 | +1.5 |

### Detail du score securite 8.5/10

| Element | Score | Detail |
|---|---|---|
| Headers HTTP | 10/10 | CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-XSS-Protection |
| Protection formulaire | 9/10 | Validation, sanitization, rate limiting, bot detection, honeypot avance |
| Ressources externes | 8/10 | crossOrigin + referrerPolicy sur images, CSP whitelist domaines |
| Build & Deploiement | 9/10 | Pas de source maps, console droppee, _headers pour deploiement |
| Gestion des erreurs | 8/10 | ErrorBoundary avec logs dev-only, pas d'info technique exposee |
| Configuration | 8/10 | Liens WhatsApp centralises, pas de secrets hardcodes |
| Points restants | -1.5 | Email expose dans le code (inevitable), pas de CAPTCHA server-side, rate limiting client-side contournable |

**Build verifie** : `vite build` passe sans erreur (11.38s).

### Reste a faire (securite)

| # | Element | Priorite |
|---|---|---|
| 1 | **Renseigner le vrai numero WhatsApp** dans `src/data/config.js` (`WHATSAPP_NUMBER`) | Critique |
| 2 | Ajouter un CAPTCHA cote serveur (reCAPTCHA, hCaptcha, Turnstile) pour le formulaire | Moyenne |
| 3 | Obfusquer l'email contact (base64 ou JS decode au clic) pour limiter le scraping | Basse |
| 4 | Ajouter Subresource Integrity (SRI) si des scripts CDN sont ajoutes a l'avenir | Basse |
| 5 | Mettre en place un WAF (Web Application Firewall) si deploye sur Cloudflare/Vercel | Basse |

---

## CORRECTIONS ACCESSIBILITE APPLIQUEES — 21/02/2026 (session 4)

### Modifications par fichier

| # | Correction | Fichiers modifies |
|---|---|---|
| A11Y-1 | **CSS Foundations** — Classe `.sr-only` (contenu invisible sauf lecteurs d'ecran), styles `:focus-visible` (outline 2px forest) sur tous les elements interactifs, classe `.skip-link` | `index.css` |
| A11Y-2 | **Skip-to-content link** — Lien "Aller au contenu principal" en premiere position, `id="main-content"` sur `<main>` | `App.jsx` |
| A11Y-3 | **NoiseOverlay + Spinner** — `aria-hidden="true"` sur le SVG decoratif NoiseOverlay. Spinner de chargement : `role="status"`, `aria-label`, texte sr-only | `NoiseOverlay.jsx`, `AppRouter.jsx` |
| A11Y-4 | **Route announcer** — ScrollToTop reecrit avec `aria-live="polite"` region qui annonce le titre de page apres chaque navigation SPA | `ScrollToTop.jsx` |
| A11Y-5 | **Navbar accessible** — `aria-label="Menu principal"` sur `<nav>`, `aria-controls="mobile-menu"` sur le toggle, `id="mobile-menu"` + `role="menu"` sur le menu, `role="menuitem"` sur les liens, `aria-hidden="true"` sur les icones decoratives, fermeture Escape avec retour focus, focus trap cyclique | `Navbar.jsx` |
| A11Y-6 | **Contraste Footer** — `text-white/50`→`/70`, `text-white/40`→`/70` (liens nav), `hover:text-white/70`→`/90`, `text-white/30`→`/60` (copyright), `text-white/40`→`/60` (status), `text-white/40`→`/70` (produits) | `Footer.jsx` |
| A11Y-7 | **Contraste Hero/Philosophy/Protocol** — Hero: `text-white/40`→`/60` (scroll hint). Philosophy: `text-white/50`→`/70`, `text-white/60`→`/70`. Protocol: `text-white/60`→`/70` | `Hero.jsx`, `Philosophy.jsx`, `Protocol.jsx` |
| A11Y-8 | **Contraste AboutPage** — 7 corrections : hero desc `/60`→`/70`, founder desc `/60`→`/70`, attribution `/40`→`/60`, engagements subtitle `/50`→`/70`, pillar desc `/50`→`/70`, stat labels `/40`→`/60`, CTA desc `/60`→`/70` | `AboutPage.jsx` |
| A11Y-9 | **Contraste ProductsPage + ContactPage** — ProductsPage: stats labels `/40`→`/60`, hero desc `/60`→`/70`, CTA desc `/60`→`/70`. ContactPage: hero desc `/60`→`/70` | `ProductsPage.jsx`, `ContactPage.jsx` |
| A11Y-10 | **VideoSection accessible** — `<div onClick>` remplace par `<button>` pour play/pause, aria-labels dynamiques ("Mettre en pause"/"Lire la video"), aria-labels dynamiques mute ("Couper le son"/"Activer le son"), raccourci clavier M pour mute, `aria-label` sur `<video>`, description sr-only, `aria-hidden` sur icones decoratives et border glow | `VideoSection.jsx` |
| A11Y-11 | **Formulaire contact accessible** — `aria-busy` sur `<form>` pendant soumission, `aria-invalid` + `aria-describedby` sur les 4 champs (name, email, subject, message), `id` + `role="alert"` sur les messages d'erreur, `role="status"` sur les messages de feedback (succes, erreur, rate-limit) | `ContactPage.jsx` |
| A11Y-12 | **Filtres produits accessibles** — `role="group"` + `aria-label` sur le conteneur de filtres, `aria-hidden` sur l'icone Filter decorative, `aria-pressed` sur les boutons de categorie, `aria-live="polite"` sur le compteur de resultats, `aria-expanded` + `aria-controls` sur les boutons "En savoir plus" | `ProductsPage.jsx` |
| A11Y-13 | **Elements decoratifs aria-hidden** — `aria-hidden="true"` ajoute sur : pulse-dots (Engagements, Footer), icone Package fallback (Products), icones MapPin/Globe (ContactCTA), 3 SVGs decoratifs (Protocol) | `Engagements.jsx`, `Products.jsx`, `ContactCTA.jsx`, `Protocol.jsx`, `Footer.jsx` |

### Evolution des scores

| Categorie | Avant (session 3) | Apres (session 4) | Gain |
|---|---|---|---|
| Accessibilite | 5/10 | 7.5/10 | +2.5 |

### Detail du score accessibilite 7.5/10

| Element | Score | Detail |
|---|---|---|
| Navigation clavier | 9/10 | Skip-link, focus-visible, focus trap menu, Escape key, raccourci M video |
| Lecteur d'ecran | 8/10 | aria-labels, role=menu/menuitem/group/alert/status, aria-live route announcer, sr-only descriptions |
| Contraste | 8/10 | Toutes les opacites text-white relevees vers WCAG AA 4.5:1 |
| Formulaire | 9/10 | aria-invalid, aria-describedby, role=alert, aria-busy, labels connectes |
| Elements decoratifs | 9/10 | aria-hidden sur NoiseOverlay, pulse-dots, icones, SVGs decoratifs |
| Video | 6/10 | Controles accessibles et description sr-only, mais pas de sous-titres/captions |
| Points restants | -2.5 | Pas de sous-titres video (1.2.1), SPA sans SSR (contenu invisible au chargement initial), pas de tests a11y automatises |

**Build verifie** : `vite build` passe sans erreur (4.50s). Zero nouveau warning ESLint introduit.

### Commits (branche `feature/accessibility`)

```
6ccbd0e a11y: remove redundant route-change useEffect in Navbar
ecced6b a11y: add aria-hidden to decorative elements across components
a347a23 a11y: add ARIA attributes to contact form and product filters
e315e8b a11y: rewrite VideoSection with accessible controls and keyboard support
5d84cbc a11y: fix color contrast ratios across all pages for WCAG AA compliance
3103b57 a11y: navbar aria-label, focus trap, Escape key, aria-controls
491db3a a11y: announce route changes to screen readers via aria-live
b8539bd a11y: hide decorative noise overlay, make loading spinner accessible
cbe09f2 a11y: add skip-to-content link and main-content landmark id
4166c5d a11y: add sr-only utility, focus-visible styles, and skip-link class
```

### Reste a faire (accessibilite)

| # | Element | Priorite |
|---|---|---|
| 1 | Ajouter des sous-titres/captions a la video de presentation (WCAG 1.2.1) | Haute |
| 2 | Migrer vers SSR (Next.js/Astro) pour que le contenu soit accessible au chargement initial | Haute |
| 3 | Ajouter des tests a11y automatises (axe-core, jest-axe, ou Lighthouse CI) | Moyenne |
| 4 | Ajouter des breadcrumbs visuels (le schema JSON-LD est deja en place) | Basse |
| 5 | Tester avec un vrai lecteur d'ecran (VoiceOver, NVDA) pour validation manuelle | Moyenne |
