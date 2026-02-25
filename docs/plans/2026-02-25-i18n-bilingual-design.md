# Kazepices — Bilingual (FR/EN) Internationalization Design

**Date:** 2026-02-25
**Status:** Approved

## Overview

Add full English translation to the Kazepices website with automatic language detection based on the visitor's browser language. Uses react-i18next as the i18n framework.

## Decisions

- **Library:** react-i18next + i18next-browser-languagedetector
- **Default language:** English (fallback for unknown locales)
- **French:** Activated for francophone browser languages (fr, fr-FR, fr-MG, etc.)
- **URLs:** Translated — `/produits` (FR) vs `/products` (EN)
- **Product slugs:** Shared across languages (e.g., `/products/moringa` and `/produits/moringa`)
- **Language persistence:** localStorage
- **Detection order:** localStorage → navigator.language → fallback to English

## Architecture

### File Structure

```
site/src/
  i18n/
    index.js              # i18next configuration
    locales/
      fr.json             # French translations (~300 keys)
      en.json             # English translations (~300 keys)
  data/
    products.js           # Restructured with {fr, en} per text field
  hooks/
    useLanguageRouter.js  # Hook to sync language ↔ URL prefix
```

### Translation Keys Organization (fr.json / en.json)

```
{
  "nav": { "about", "contact", "products", "openMenu", "closeMenu" },
  "hero": { "tag", "headline", "description", "ctaProducts", "ctaStory", "scroll", "imageAlt" },
  "engagements": { ... },
  "video": { ... },
  "philosophy": { ... },
  "protocol": { ... },
  "products": { ... },
  "productsPage": { ... },
  "productDetail": { ... },
  "about": { ... },
  "contact": { ... },
  "contactCTA": { ... },
  "footer": { ... },
  "notFound": { ... },
  "common": { "loading", "madagascar", "natural", "noChemicals" }
}
```

### Routing

| Page | FR URL | EN URL |
|------|--------|--------|
| Home | `/` | `/` |
| Products | `/produits` | `/products` |
| Product Detail | `/produits/:slug` | `/products/:slug` |
| About | `/a-propos` | `/about` |
| Contact | `/contact` | `/contact` |

Both sets of routes are defined in AppRouter.jsx. Language change triggers a redirect to the equivalent URL.

### Product Data

Products in `products.js` use bilingual objects:

```js
{
  name: { fr: "Poivre Noir", en: "Black Pepper" },
  slug: "poivre-noir",
  type: { fr: "Poudre", en: "Powder" },
  description: { fr: "...", en: "..." },
  // all text fields follow this pattern
}
```

A helper `t` from the language context selects the right language.

### Language Selector (Navbar)

- Simple FR | EN toggle
- Desktop: right side of navbar, before CTA button
- Mobile: in hamburger menu
- Active language highlighted
- Click: changes language, redirects to equivalent URL, saves to localStorage

### SEO

- `<html lang="fr|en">` updated dynamically
- Meta descriptions translated via usePageMeta hook
- Page titles translated

## Scope

- ~300 text strings to extract and translate
- 16 JSX components to modify
- 1 product data file to restructure
- 3 new dependencies (i18next, react-i18next, i18next-browser-languagedetector)
- No visual/design changes
