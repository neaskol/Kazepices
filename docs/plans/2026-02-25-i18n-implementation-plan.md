# Kazepices Bilingual (FR/EN) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add full English translation with automatic browser language detection and translated URLs to the Kazepices website.

**Architecture:** react-i18next with browser language detection. Translations in JSON files, bilingual product data in products.js. Dual route sets (FR/EN URLs) in AppRouter. Language selector in Navbar. English is the default fallback.

**Tech Stack:** i18next, react-i18next, i18next-browser-languagedetector, React 19, React Router 7, Vite 7

---

### Task 1: Install i18n dependencies

**Files:**
- Modify: `site/package.json`

**Step 1: Install packages**

Run: `cd /Users/neaskol/Downloads/AGENTIC\ WORKFLOW/Kazepices/site && npm install i18next react-i18next i18next-browser-languagedetector`

Expected: 3 packages added to dependencies in package.json

**Step 2: Verify installation**

Run: `cd /Users/neaskol/Downloads/AGENTIC\ WORKFLOW/Kazepices/site && node -e "require('i18next'); require('react-i18next'); require('i18next-browser-languagedetector'); console.log('OK')"`

Expected: "OK"

**Step 3: Commit**

```bash
git add site/package.json site/package-lock.json
git commit -m "feat: install i18n dependencies (i18next, react-i18next, browser-languagedetector)"
```

---

### Task 2: Create i18n configuration and French translation file

**Files:**
- Create: `site/src/i18n/index.js`
- Create: `site/src/i18n/locales/fr.json`

**Step 1: Create i18n config**

Create `site/src/i18n/index.js`:

```js
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import fr from './locales/fr.json'
import en from './locales/en.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'kazepices-lang',
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
```

**Step 2: Create French translation file**

Create `site/src/i18n/locales/fr.json` containing ALL French text extracted from every component. The JSON structure uses namespaced keys organized by component/section:

```json
{
  "common": {
    "loading": "Chargement en cours...",
    "loadingPage": "Chargement de la page",
    "skipLink": "Aller au contenu principal",
    "madagascar": "Madagascar",
    "natural": "100% Naturel",
    "noChemicals": "Sans produits chimiques",
    "internationalShipping": "Livraison internationale",
    "backHome": "Retour à l'accueil",
    "provenance": "Provenance : Madagascar",
    "systemOperational": "Système opérationnel"
  },
  "nav": {
    "about": "A propos",
    "contact": "Contact",
    "products": "Nos produits",
    "openMenu": "Ouvrir le menu",
    "closeMenu": "Fermer le menu",
    "logoAlt": "Kazepices — Accueil",
    "mainMenu": "Menu principal"
  },
  "hero": {
    "tag": "MADAGASCAR — ÉPICES NATURELLES",
    "headline1": "La nature est le",
    "headline2": "secret.",
    "description": "Fondée par Ikbal Chariffou, Kazépices Madagascar incarne une vision simple : offrir des produits naturels de haute qualité, tout en respectant l'homme et l'environnement.",
    "ctaProducts": "Découvrir nos produits",
    "ctaStory": "Notre histoire",
    "scroll": "DÉFILER POUR DÉCOUVRIR",
    "imageAlt": "Épices de Madagascar"
  },
  "engagements": {
    "sectionLabel": "Nos engagements",
    "heading1": "Un pont entre Madagascar",
    "heading2": "et le monde.",
    "card1Title": "Impact Local",
    "card1Desc": "Création d'emplois et travail direct avec les agriculteurs malgaches.",
    "card1Item1": "Agriculture locale",
    "card1Item2": "Emplois créés",
    "card1Item3": "Communautés soutenues",
    "card2Title": "Environnement",
    "card2Desc": "Protection de la biodiversité et valorisation durable des ressources.",
    "card2Live": "Éco-impact en direct",
    "card2Msg1": "> Biodiversité préservée à Madagascar...",
    "card2Msg2": "> Empreinte carbone réduite de 40%...",
    "card2Msg3": "> Zéro produits chimiques utilisés...",
    "card2Msg4": "> Emballages recyclables et bio...",
    "card2Msg5": "> Reforestation : 200 arbres plantés...",
    "card3Title": "Santé & Qualité",
    "card3Desc": "Savoir-faire artisanal et vertus naturelles des plantes malgaches.",
    "scheduled": "Planifié !",
    "schedule": "Planifier"
  },
  "video": {
    "sectionLabel": "Notre histoire",
    "heading1": "L'histoire de",
    "heading2": "Kazepices.",
    "description": "Decouvrez notre parcours, nos valeurs et la passion qui anime chaque produit Kazepices.",
    "muteLabel": "Activer le son",
    "unmuteLabel": "Couper le son",
    "clickForSound": "Cliquez pour le son",
    "soundActive": "Son actif",
    "srDescription": "Lecteur video montrant la presentation de Kazepices Madagascar."
  },
  "philosophy": {
    "line1": "La plupart des marques d'épices se concentrent sur :",
    "line1b": " le volume, l'industrialisation, le rendement.",
    "heading1": "Nous, nous cultivons la",
    "heading2": "patience.",
    "paragraph": "Chaque épice Kazépices est récoltée à la main, séchée naturellement et conditionnée avec soin à Madagascar. Pas de raccourcis. Pas de compromis. Juste la terre, le soleil et le savoir-faire artisanal transmis de génération en génération."
  },
  "protocol": {
    "sectionLabel": "Notre processus",
    "heading1": "De la terre",
    "heading2": "à votre table.",
    "step1Title": "Récolte",
    "step1Desc": "Nos épices sont récoltées à la main par des agriculteurs malgaches passionnés, au moment optimal de maturité.",
    "step2Title": "Transformation",
    "step2Desc": "Séchage naturel, broyage artisanal et contrôle qualité rigoureux dans nos ateliers à Madagascar.",
    "step3Title": "Livraison",
    "step3Desc": "Emballées avec soin dans des conditionnements esthétiques et professionnels, prêtes à sublimer vos recettes."
  },
  "products": {
    "sectionLabel": "Catalogue",
    "heading1": "Nos produits",
    "heading2": "100% naturels.",
    "description": "Chaque produit est cultivé, récolté et conditionné à Madagascar avec un savoir-faire artisanal unique.",
    "viewProduct": "Voir le produit",
    "orderWhatsApp": "Commander via WhatsApp",
    "whatsappMsg": "Bonjour Kazépices, je souhaite commander du {{name}}.",
    "whatsappMsgFormats": "Bonjour Kazépices, je souhaite commander du {{name}} ({{formats}})."
  },
  "productsPage": {
    "title": "Nos Produits — Épices & Huiles Naturelles | Kazépices Madagascar",
    "metaDesc": "Catalogue complet Kazépices : curcuma, poivre noir, gingembre, moringa, cannelle en poudre et huile de moringa. 100% naturel, sans produits chimiques.",
    "heading1": "Nos produits",
    "heading2": "100% naturels.",
    "description": "Chaque produit est cultivé, récolté et conditionné à Madagascar avec un savoir-faire artisanal unique. Provenance garantie, qualité sans compromis.",
    "statProducts": "Produits",
    "statNatural": "Naturel",
    "statChemicals": "Produits chimiques",
    "filterLabel": "Filtrer par categorie",
    "filterAll": "Tous",
    "filterPowders": "Poudres",
    "filterDriedFruits": "Fruits secs",
    "productSingular": "produit",
    "productPlural": "produits",
    "helpLabel": "Besoin d'aide ?",
    "helpHeading1": "Une question sur nos",
    "helpHeading2": "produits ?",
    "helpDesc": "Contactez-nous directement via WhatsApp pour une réponse rapide, ou envoyez-nous un message via notre formulaire.",
    "helpWhatsApp": "WhatsApp",
    "helpContact": "Nous contacter",
    "helpWhatsAppMsg": "Bonjour Kazépices, j'ai une question sur vos produits."
  },
  "productDetail": {
    "allProducts": "Tous les produits",
    "fromMadagascar": "de Madagascar.",
    "buyWhatsApp": "Acheter sur WhatsApp",
    "contactUs": "Contactez-nous",
    "orderLabel": "Commander",
    "orderHeading": "Envie de {{name}}",
    "orderDesc": "Commandez directement via WhatsApp pour une réponse rapide, ou contactez-nous pour toute question.",
    "discoverLabel": "Découvrir aussi",
    "otherProducts": "Nos autres produits",
    "buyWhatsAppMsg": "Bonjour Kazépices, je souhaite acheter du {{name}} ({{formats}}).",
    "titleFound": "{{name}} — Épice Naturelle de Madagascar | Kazépices",
    "titleNotFound": "Produit introuvable | Kazépices"
  },
  "about": {
    "title": "Notre Histoire & Engagements — Kazépices Madagascar",
    "metaDesc": "Fondée par Ikbal Charifou, Kazépices valorise les richesses naturelles de Madagascar. Découvrez notre mission, nos engagements et notre savoir-faire.",
    "heroHeading1": "Notre histoire &",
    "heroHeading2": "nos engagements.",
    "heroDesc": "Née au coeur de Madagascar, Kazépices est bien plus qu'une marque d'épices. C'est une mission : offrir des produits naturels d'exception, tout en respectant l'homme et l'environnement.",
    "originLabel": "Notre origine",
    "originHeading1": "Une île, une vision,",
    "originHeading2": "une passion.",
    "originP1": "Et si le secret d'une meilleure santé se trouvait au coeur de l'une des îles les plus riches de la planète ? C'est de cette conviction qu'est née Kazépices Madagascar — une marque qui a fait de cette idée une véritable mission.",
    "originP2Start": "Au coeur de Kazépices, il y a cette mission claire et nette :",
    "originP2Bold": "offrir des produits naturels de haute qualité",
    "originP2End": ", tout en respectant l'homme et l'environnement. La marque nous prouve qu'on peut parfaitement avoir les deux : des produits exceptionnels cultivés dans le plus grand respect de ceux qui les font pousser et de la terre qui les nourrit.",
    "originQuote": "« À Madagascar, une île riche en ressources naturelles, est née une marque engagée. »",
    "originImageAlt": "Avenue des Baobabs, Madagascar",
    "originBadgeTitle": "Madagascar",
    "originBadgeDesc": "Biodiversité unique au monde",
    "founderLabel": "Le fondateur",
    "founderHeading1": "La passion d'",
    "founderHeading2": "Ikbal Charifou.",
    "founderDesc": "Derrière chaque belle initiative, il y a toujours une histoire humaine, une passion. Ikbal Charifou n'est pas qu'un entrepreneur — c'est avant tout un passionné. Intimement convaincu que la nature recèle des trésors pour notre bien-être, son engagement est de nous rendre ces trésors accessibles de la manière la plus pure et la plus juste possible.",
    "founderQuote": "La nature nous offre ses trésors. Notre mission est de les rendre accessibles de la manière la plus pure et la plus juste possible.",
    "founderAttribution": "— Ikbal Charifou, Fondateur de Kazépices Madagascar",
    "founderImageAlt": "Ikbal Charifou — Fondateur de Kazépices Madagascar",
    "savoirLabel": "Notre savoir-faire",
    "savoirHeading1": "La terre et",
    "savoirHeading2": "les mains.",
    "savoirDesc": "Un cercle vertueux où tout le monde est gagnant — de la terre de Madagascar à votre table.",
    "savoirStep1": "Culture Locale",
    "savoirStep1Desc": "Tout est cultivé par des agriculteurs locaux, soutenant directement les communautés sur place. Nos partenaires perpétuent un savoir-faire transmis de génération en génération.",
    "savoirStep2": "Récolte Artisanale",
    "savoirStep2Desc": "La récolte est faite de manière artisanale, ce qui préserve la qualité et les traditions. Chaque épice est cueillie au moment optimal de maturité, à la main.",
    "savoirStep3": "Éco-responsable",
    "savoirStep3Desc": "Produit dans le respect de l'environnement, chaque étape est pensée pour minimiser l'impact écologique. Zéro produits chimiques, séchage naturel au soleil.",
    "pillarsLabel": "Nos 4 piliers",
    "pillarsHeading1": "Des engagements",
    "pillarsHeading2": "concrets.",
    "pillarsDesc": "Ces quatre piliers ne sont pas juste des mots — c'est un engagement total et cohérent qui guide chacune de nos actions.",
    "pillar1Title": "Impact Local",
    "pillar1Desc": "Création d'emplois et travail direct avec les agriculteurs malgaches. Nous soutenons les communautés locales et participons au développement économique de Madagascar.",
    "pillar1Stat": "100+",
    "pillar1StatLabel": "Agriculteurs partenaires",
    "pillar2Title": "Environnement",
    "pillar2Desc": "Protection de la biodiversité et valorisation durable des ressources naturelles. Zéro produits chimiques, emballages recyclables et reforestation active.",
    "pillar2Stat": "0",
    "pillar2StatLabel": "Produits chimiques",
    "pillar3Title": "Santé",
    "pillar3Desc": "Promotion des vertus naturelles des plantes malgaches. Chaque produit est sélectionné pour ses bienfaits sur la santé et le bien-être au quotidien.",
    "pillar3Stat": "100%",
    "pillar3StatLabel": "Naturel & pur",
    "pillar4Title": "Qualité",
    "pillar4Desc": "Savoir-faire artisanal et emballage esthétique et professionnel. Reconnu à Paris pour l'excellence de nos produits et notre attention aux détails.",
    "pillar4Stat": "Paris",
    "pillar4StatLabel": "Reconnu à l'international",
    "bridgeLabel": "Un pont vers le monde",
    "bridgeHeading1": "« C'est plus qu'une marque.",
    "bridgeHeading2": "C'est un pont entre Madagascar et le monde. »",
    "bridgeDesc": "Kazépices connecte les richesses d'une terre, le travail de ses habitants et les consommateurs du monde entier en quête de sens et de bien-être. De Madagascar à Paris, notre histoire continue de s'écrire — une invitation à se reconnecter à l'essentiel et à faire confiance à la nature.",
    "bridgeFrom": "Madagascar",
    "bridgeTo": "Le monde",
    "ctaLabel": "Découvrir",
    "ctaHeading1": "Prêt à goûter à l'",
    "ctaHeading2": "excellence malgache ?",
    "ctaDesc": "Découvrez nos produits 100% naturels ou contactez-nous pour en savoir plus sur notre démarche.",
    "ctaProducts": "Nos produits",
    "ctaContact": "Nous contacter"
  },
  "contact": {
    "title": "Contactez-Nous — Kazépices Madagascar",
    "metaDesc": "Commandez vos épices naturelles de Madagascar via WhatsApp ou notre formulaire de contact. Réponse garantie sous 24h.",
    "heroHeading1": "Contactez",
    "heroHeading2": "Kazépices.",
    "heroDesc": "Une question, une commande ou un partenariat ? Nous sommes à votre écoute. Remplissez le formulaire ci-dessous et nous vous répondrons sous 24 heures.",
    "infoLabel": "Nos coordonnées",
    "infoHeading": "Plusieurs façons de nous joindre.",
    "infoEmail": "Email",
    "infoWhatsApp": "WhatsApp",
    "infoWhatsAppDesc": "Réponse rapide garantie",
    "infoLocation": "Madagascar",
    "infoLocationDesc": "Livraison internationale",
    "infoHours": "Horaires",
    "infoHoursDesc": "Lun – Sam, 8h – 18h (GMT+3)",
    "directOrder": "Commande directe ?",
    "directOrderDesc": "Pour une commande rapide, écrivez-nous sur WhatsApp avec le nom du produit et la quantité souhaitée. C'est le moyen le plus rapide !",
    "formHeading": "Envoyez-nous un message",
    "formRequired": "Tous les champs sont obligatoires.",
    "labelName": "Nom complet",
    "labelEmail": "Email",
    "labelSubject": "Sujet",
    "labelMessage": "Message",
    "placeholderName": "Votre nom",
    "placeholderEmail": "votre@email.com",
    "placeholderMessage": "Décrivez votre demande...",
    "subjectDefault": "Choisir un sujet",
    "subjectOrder": "Commande",
    "subjectInfo": "Information produit",
    "subjectPartnership": "Partenariat",
    "subjectOther": "Autre",
    "submitSending": "Envoi en cours...",
    "submitSend": "Envoyer le message",
    "successMsg": "Message envoyé avec succès ! Nous vous répondrons sous 24h.",
    "errorMsg": "Une erreur est survenue. Réessayez ou contactez-nous via WhatsApp.",
    "rateLimitMsg": "Trop de messages envoyés. Veuillez patienter quelques minutes avant de réessayer.",
    "honeypot": "Ne pas remplir",
    "errorNameMin": "Le nom doit contenir au moins 2 caractères.",
    "errorNameMax": "Le nom ne doit pas dépasser 100 caractères.",
    "errorEmail": "Veuillez entrer une adresse email valide.",
    "errorSubject": "Veuillez choisir un sujet.",
    "errorMessageMin": "Le message doit contenir au moins 10 caractères.",
    "errorMessageMax": "Le message ne doit pas dépasser 5000 caractères.",
    "whatsappMsg": "Bonjour Kazépices, je souhaite en savoir plus sur vos produits."
  },
  "contactCTA": {
    "sectionLabel": "Contact",
    "heading": "Prêt à commander ?",
    "tagline": "Parlons épices.",
    "description": "Commandez directement via WhatsApp ou envoyez-nous un message via notre formulaire de contact. Nous répondons dans les 24 heures.",
    "ctaContact": "Nous écrire",
    "ctaWhatsApp": "WhatsApp",
    "whatsappMsg": "Bonjour Kazépices, je souhaite en savoir plus sur vos produits."
  },
  "whatsappFloat": {
    "label": "Contacter via WhatsApp",
    "message": "Bonjour Kazépices, je souhaite commander."
  },
  "footer": {
    "logoAlt": "Kazépices",
    "description": "Épices naturelles et artisanales de Madagascar. Un pont entre la richesse de la terre malgache et le monde.",
    "navHeading": "Navigation",
    "home": "Accueil",
    "productsHeading": "Produits",
    "copyright": "© {{year}} Kazépices Madagascar. Tous droits réservés."
  },
  "notFound": {
    "label": "Erreur 404",
    "heading": "404",
    "message": "Cette page n'existe pas."
  },
  "homeMeta": {
    "title": "Kazépices Madagascar — Épices Naturelles & Artisanales de Madagascar",
    "description": "Découvrez nos épices 100% naturelles de Madagascar : curcuma, poivre noir, gingembre, moringa, cannelle. Livraison internationale."
  }
}
```

**Step 3: Commit**

```bash
git add site/src/i18n/
git commit -m "feat: create i18n config and French translation file"
```

---

### Task 3: Create English translation file

**Files:**
- Create: `site/src/i18n/locales/en.json`

**Step 1: Create English translations**

Create `site/src/i18n/locales/en.json` with the same key structure as fr.json but with English text. All values must be accurate English translations of the French originals.

Key examples (same structure, all keys translated):
- `"hero.headline1"` → `"Nature is the"`
- `"hero.headline2"` → `"secret."`
- `"hero.ctaProducts"` → `"Discover our products"`
- `"nav.about"` → `"About"`
- `"nav.products"` → `"Our products"`
- `"products.orderWhatsApp"` → `"Order via WhatsApp"`
- `"philosophy.heading1"` → `"We cultivate"`
- `"philosophy.heading2"` → `"patience."`

The WhatsApp messages in English should be:
- `"products.whatsappMsg"` → `"Hello Kazépices, I would like to order {{name}}."`
- `"contact.whatsappMsg"` → `"Hello Kazépices, I would like to learn more about your products."`

Product-related English benefit labels:
- `"Valeur nutritionnelle"` → `"Nutritional value"`
- `"Bienfaits santé"` → `"Health benefits"`
- `"Usages"` → `"Uses"`
- `"Engagement environnemental"` → `"Environmental commitment"`

**Step 2: Commit**

```bash
git add site/src/i18n/locales/en.json
git commit -m "feat: add English translation file"
```

---

### Task 4: Restructure products.js for bilingual data

**Files:**
- Modify: `site/src/data/products.js:1-132`

**Step 1: Restructure all product text fields to bilingual objects**

Every text field (name, type, formats, description, details, longDescription, benefits, closing, alt) becomes `{ fr: "...", en: "..." }`. The `slug`, `image`, `color`, `category` fields stay unchanged.

Example for one product:
```js
{
  name: { fr: 'Moringa', en: 'Moringa' },
  slug: 'moringa',
  type: { fr: 'Poudre', en: 'Powder' },
  formats: { fr: '100g, 200g', en: '100g, 200g' },
  description: {
    fr: "L'arbre miracle de Madagascar. Riche en vitamines, minéraux et antioxydants naturels.",
    en: "The miracle tree of Madagascar. Rich in vitamins, minerals, and natural antioxidants."
  },
  // ... all text fields bilingual
}
```

Also add a helper function at the bottom:

```js
export function pt(field, lang) {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[lang] || field.en || field.fr || ''
}
```

**Step 2: Commit**

```bash
git add site/src/data/products.js
git commit -m "feat: restructure product data for bilingual support"
```

---

### Task 5: Create useLanguageRouter hook and integrate i18n into app

**Files:**
- Create: `site/src/hooks/useLanguageRouter.js`
- Modify: `site/src/main.jsx:1-15`

**Step 1: Create useLanguageRouter hook**

Create `site/src/hooks/useLanguageRouter.js`:

```js
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

const ROUTE_MAP = {
  fr: {
    products: '/produits',
    about: '/a-propos',
    contact: '/contact',
  },
  en: {
    products: '/products',
    about: '/about',
    contact: '/contact',
  },
}

export function useLanguageRouter() {
  const { i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en'

  const routes = ROUTE_MAP[lang]

  const switchLanguage = useCallback((newLang) => {
    const currentPath = location.pathname
    const fromRoutes = ROUTE_MAP[lang]
    const toRoutes = ROUTE_MAP[newLang]

    let newPath = currentPath

    // Map current route to equivalent in new language
    for (const [key, fromPath] of Object.entries(fromRoutes)) {
      if (currentPath === fromPath) {
        newPath = toRoutes[key]
        break
      }
      // Handle product detail pages: /produits/:slug → /products/:slug
      if (currentPath.startsWith(fromPath + '/')) {
        const slug = currentPath.slice(fromPath.length + 1)
        newPath = toRoutes[key] + '/' + slug
        break
      }
    }

    i18n.changeLanguage(newLang)
    document.documentElement.lang = newLang
    navigate(newPath, { replace: true })
  }, [i18n, lang, location.pathname, navigate])

  return { lang, routes, switchLanguage }
}

// Helper: get the product path prefix for current language
export function useProductPath() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en'
  return ROUTE_MAP[lang].products
}
```

**Step 2: Import i18n in main.jsx**

Modify `site/src/main.jsx` — add `import './i18n'` before the App import:

```js
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gsap } from 'gsap'
import './i18n'
import './index.css'
import App from './App.jsx'
// ... rest unchanged
```

**Step 3: Set initial html lang attribute**

Add to `site/src/main.jsx` after the gsap config:

```js
// Set initial html lang from i18n
import i18n from './i18n'
document.documentElement.lang = i18n.language?.startsWith('fr') ? 'fr' : 'en'
```

**Step 4: Commit**

```bash
git add site/src/hooks/useLanguageRouter.js site/src/main.jsx
git commit -m "feat: add language router hook and initialize i18n"
```

---

### Task 6: Update AppRouter with bilingual routes

**Files:**
- Modify: `site/src/AppRouter.jsx:1-38`

**Step 1: Add both FR and EN routes**

Replace the Routes section to include both language paths:

```jsx
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import ScrollToTop from './components/ScrollToTop'
import HomePage from './components/HomePage'

const ProductsPage = lazy(() => import('./ProductsPage'))
const ProductDetailPage = lazy(() => import('./ProductDetailPage'))
const AboutPage = lazy(() => import('./AboutPage'))
const ContactPage = lazy(() => import('./ContactPage'))
const NotFoundPage = lazy(() => import('./components/NotFoundPage'))

function LoadingSpinner() {
  const { t } = useTranslation()
  return (
    <div className="min-h-dvh flex items-center justify-center" role="status" aria-label={t('common.loadingPage')}>
      <div className="w-8 h-8 border-2 border-madagascar border-t-transparent rounded-full animate-spin" />
      <span className="sr-only">{t('common.loading')}</span>
    </div>
  )
}

export default function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* French routes */}
          <Route path="/produits" element={<ProductsPage />} />
          <Route path="/produits/:slug" element={<ProductDetailPage />} />
          <Route path="/a-propos" element={<AboutPage />} />
          {/* English routes */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Shared */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  )
}
```

**Step 2: Commit**

```bash
git add site/src/AppRouter.jsx
git commit -m "feat: add bilingual routes (FR + EN) to AppRouter"
```

---

### Task 7: Update Navbar with language selector and translated links

**Files:**
- Modify: `site/src/components/Navbar.jsx:1-187`

**Step 1: Add i18n imports and language selector**

Update the Navbar to:
1. Import `useTranslation` and `useLanguageRouter`
2. Use `t()` for all text
3. Use `routes` from `useLanguageRouter` for link paths
4. Add a FR/EN toggle before the CTA button (desktop) and in the mobile menu

The language toggle is a simple button group:
```jsx
<div className="flex items-center gap-1">
  <button
    onClick={() => switchLanguage('fr')}
    className={`text-xs font-heading font-semibold px-2 py-1 rounded-full transition-colors ${
      lang === 'fr'
        ? (scrolled || !isHome ? 'bg-forest text-white' : 'bg-white/20 text-white')
        : (scrolled || !isHome ? 'text-forest/50 hover:text-forest' : 'text-white/50 hover:text-white')
    }`}
  >
    FR
  </button>
  <button
    onClick={() => switchLanguage('en')}
    className={`text-xs font-heading font-semibold px-2 py-1 rounded-full transition-colors ${
      lang === 'en'
        ? (scrolled || !isHome ? 'bg-forest text-white' : 'bg-white/20 text-white')
        : (scrolled || !isHome ? 'text-forest/50 hover:text-forest' : 'text-white/50 hover:text-white')
    }`}
  >
    EN
  </button>
</div>
```

All Link `to` props use `routes.about`, `routes.products`, `routes.contact` etc.

**Step 2: Commit**

```bash
git add site/src/components/Navbar.jsx
git commit -m "feat: add language selector and translated navigation to Navbar"
```

---

### Task 8: Update App.jsx and Footer with translations

**Files:**
- Modify: `site/src/App.jsx:1-31`
- Modify: `site/src/components/Footer.jsx:1-73`

**Step 1: Update App.jsx**

Add `useTranslation` import and use `t('common.skipLink')` for the skip link text.

**Step 2: Update Footer.jsx**

1. Import `useTranslation` and `useLanguageRouter`
2. Replace all hardcoded text with `t()` calls
3. Use `routes` for navigation links
4. Use `t('footer.copyright', { year: new Date().getFullYear() })` for copyright

**Step 3: Commit**

```bash
git add site/src/App.jsx site/src/components/Footer.jsx
git commit -m "feat: translate App.jsx and Footer"
```

---

### Task 9: Update homepage components (Hero, Engagements, VideoSection, Philosophy, Protocol, Products, ContactCTA)

**Files:**
- Modify: `site/src/components/Hero.jsx:1-91`
- Modify: `site/src/components/Engagements.jsx:1-265`
- Modify: `site/src/components/VideoSection.jsx:1-169`
- Modify: `site/src/components/Philosophy.jsx:1-53`
- Modify: `site/src/components/Protocol.jsx:1-127`
- Modify: `site/src/components/Products.jsx:1-114`
- Modify: `site/src/components/ContactCTA.jsx:1-82`
- Modify: `site/src/components/HomePage.jsx:1-31`

**Step 1: Update each component**

For every component:
1. Add `import { useTranslation } from 'react-i18next'`
2. Add `const { t } = useTranslation()` at top of the component function
3. Replace every French string with `t('section.key')` calls
4. For links, also import `useLanguageRouter` or `useProductPath` where needed and use `routes.products` etc.
5. For Product cards in Products.jsx: import `pt` from products.js and use `pt(product.name, lang)`, `pt(product.description, lang)` etc. Get `lang` from `i18n.language`.

For Hero.jsx, the Link to `/produits` becomes `routes.products`.
For Products.jsx, the WhatsApp message uses `t('products.whatsappMsg', { name: pt(product.name, lang) })`.

**Step 2: Update HomePage.jsx**

Use `t('homeMeta.title')` and `t('homeMeta.description')` in the usePageMeta call.

**Step 3: Commit**

```bash
git add site/src/components/Hero.jsx site/src/components/Engagements.jsx site/src/components/VideoSection.jsx site/src/components/Philosophy.jsx site/src/components/Protocol.jsx site/src/components/Products.jsx site/src/components/ContactCTA.jsx site/src/components/HomePage.jsx
git commit -m "feat: translate all homepage components"
```

---

### Task 10: Update ProductsPage and ProductDetailPage

**Files:**
- Modify: `site/src/ProductsPage.jsx:1-270`
- Modify: `site/src/ProductDetailPage.jsx:1-317`

**Step 1: Update ProductsPage**

1. Import `useTranslation` and `useLanguageRouter`
2. Use `t()` for all UI text
3. Use `pt(product.field, lang)` for product data
4. Use `routes.products` for product links: `` `${routes.products}/${product.slug}` ``
5. Translate category filter labels using `t('productsPage.filterAll')` etc.
6. Update usePageMeta with translated title/description
7. Update BreadcrumbSchema names with translated breadcrumb names

**Step 2: Update ProductDetailPage**

Same approach:
1. Import `useTranslation` and `useLanguageRouter`
2. Use `t()` for UI, `pt()` for product data
3. Links use `routes.products` and `routes.contact`
4. WhatsApp messages use `t('productDetail.buyWhatsAppMsg', { name: pt(product.name, lang), formats: pt(product.formats, lang) })`
5. Navigate to `routes.products` if product not found

**Step 3: Commit**

```bash
git add site/src/ProductsPage.jsx site/src/ProductDetailPage.jsx
git commit -m "feat: translate ProductsPage and ProductDetailPage"
```

---

### Task 11: Update AboutPage

**Files:**
- Modify: `site/src/AboutPage.jsx:1-643`

**Step 1: Update all sub-components**

AboutPage has 7 sub-components (AboutHero, OriginStory, Founder, SavoirFaire, Engagements, BridgeSection, AboutCTA). Each needs:
1. `const { t } = useTranslation()` added
2. All French text replaced with `t('about.key')` calls
3. Links updated with `routes.products` and `routes.contact`

The useTranslation import only needs to appear once at the top of the file. Each sub-component calls `useTranslation()` individually.

**Step 2: Commit**

```bash
git add site/src/AboutPage.jsx
git commit -m "feat: translate AboutPage and all sub-components"
```

---

### Task 12: Update ContactPage

**Files:**
- Modify: `site/src/ContactPage.jsx:1-435`

**Step 1: Translate all form elements**

1. Import `useTranslation`
2. Use `t()` for all labels, placeholders, options, error messages, status messages
3. Update usePageMeta with translated title/description
4. Form validation errors use `t('contact.errorNameMin')` etc.
5. Select options use `t('contact.subjectOrder')` etc.

**Step 2: Commit**

```bash
git add site/src/ContactPage.jsx
git commit -m "feat: translate ContactPage and form"
```

---

### Task 13: Update remaining components (WhatsAppFloat, NotFoundPage, ErrorBoundary)

**Files:**
- Modify: `site/src/components/WhatsAppFloat.jsx:1-16`
- Modify: `site/src/components/NotFoundPage.jsx:1-20`

**Step 1: Update WhatsAppFloat**

Use `t('whatsappFloat.label')` and `t('whatsappFloat.message')` for the aria-label and WhatsApp message.

**Step 2: Update NotFoundPage**

Use `t('notFound.label')`, `t('notFound.heading')`, `t('notFound.message')`, `t('common.backHome')`.

**Step 3: Commit**

```bash
git add site/src/components/WhatsAppFloat.jsx site/src/components/NotFoundPage.jsx
git commit -m "feat: translate WhatsAppFloat and NotFoundPage"
```

---

### Task 14: Update usePageMeta for bilingual SEO and StructuredData

**Files:**
- Modify: `site/src/hooks/usePageMeta.js:1-60`
- Modify: `site/src/components/StructuredData.jsx:1-147`

**Step 1: Update usePageMeta**

Update the `og:locale` to be dynamic based on current language:

```js
import i18n from '../i18n'
// ...
const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en'
setMeta('property', 'og:locale', lang === 'fr' ? 'fr_FR' : 'en_US')
```

**Step 2: Update StructuredData**

In OrganizationSchema, add English to `availableLanguage`:
```js
availableLanguage: ['French', 'English'],
```

In the WebSite schema, make `inLanguage` dynamic based on current language.

**Step 3: Commit**

```bash
git add site/src/hooks/usePageMeta.js site/src/components/StructuredData.jsx
git commit -m "feat: update SEO meta and structured data for bilingual support"
```

---

### Task 15: Build verification and final commit

**Step 1: Run dev server**

Run: `cd /Users/neaskol/Downloads/AGENTIC\ WORKFLOW/Kazepices/site && npm run build`

Expected: Build succeeds with no errors.

**Step 2: Fix any build errors**

If build fails, fix import issues, missing translation keys, or syntax errors.

**Step 3: Run dev server and manually verify**

Run: `cd /Users/neaskol/Downloads/AGENTIC\ WORKFLOW/Kazepices/site && npm run dev`

Verify:
- Site loads in English by default (if browser is English)
- FR/EN toggle in navbar works
- Clicking FR shows French text and French URLs (/produits, /a-propos)
- Clicking EN shows English text and English URLs (/products, /about)
- Product pages work in both languages
- Language choice persists on page refresh (localStorage)
- All WhatsApp links use the correct language message

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete bilingual FR/EN website with auto language detection"
```
