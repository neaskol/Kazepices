# Dark Mode + Prev/Next Product Navigation — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a manual dark mode toggle and prev/next product navigation to the Kazepices website.

**Architecture:** Dark mode uses Tailwind v4 `dark:` variant classes toggled by a `.dark` class on `<html>`. A blocking script in `public/theme-init.js` prevents FOUC. Prev/next navigation derives adjacent products from the existing `products` array with modulo wrapping.

**Tech Stack:** React 19, Tailwind CSS v4, i18next, lucide-react, Vite 7

---

## Part 1: Dark Mode

### Task 1: FOUC Prevention Script

**Files:**
- Create: `site/public/theme-init.js`

**Step 1: Create the blocking theme init script**

```js
// Runs before React — prevents flash of wrong theme
(function() {
  var theme = localStorage.getItem('kazepices-theme');
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
})();
```

**Step 2: Commit**

```bash
git add site/public/theme-init.js
git commit -m "feat(dark-mode): add FOUC prevention script"
```

---

### Task 2: Load theme-init.js in index.html

**Files:**
- Modify: `site/index.html`

**Step 1: Add blocking script tag before CSS/fonts**

In `site/index.html`, add this line immediately after `<meta name="theme-color" content="#1a3a2a" />` (line 10) and before the Security comment (line 12):

```html
    <!-- Theme init (blocks render to prevent FOUC) -->
    <script src="/theme-init.js"></script>
```

**Step 2: Verify build still works**

Run: `cd site && npm run build`
Expected: Build succeeds with no errors.

**Step 3: Commit**

```bash
git add site/index.html
git commit -m "feat(dark-mode): load theme-init script in HTML head"
```

---

### Task 3: Create useTheme Hook

**Files:**
- Create: `site/src/hooks/useTheme.js`

**Step 1: Write the hook**

```js
import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'kazepices-theme'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggleTheme }
}
```

**Step 2: Commit**

```bash
git add site/src/hooks/useTheme.js
git commit -m "feat(dark-mode): create useTheme hook with localStorage persistence"
```

---

### Task 4: Add i18n Keys for Theme Toggle

**Files:**
- Modify: `site/src/i18n/locales/fr.json`
- Modify: `site/src/i18n/locales/en.json`

**Step 1: Add keys to French locale**

In `fr.json`, inside the `"nav"` object (after `"mainMenu": "Menu principal"`), add:

```json
    "darkMode": "Activer le mode sombre",
    "lightMode": "Activer le mode clair"
```

**Step 2: Add keys to English locale**

In `en.json`, inside the `"nav"` object (after `"mainMenu": "Main menu"`), add:

```json
    "darkMode": "Switch to dark mode",
    "lightMode": "Switch to light mode"
```

**Step 3: Commit**

```bash
git add site/src/i18n/locales/fr.json site/src/i18n/locales/en.json
git commit -m "feat(dark-mode): add i18n keys for theme toggle aria-labels"
```

---

### Task 5: Add Theme Toggle to Navbar

**Files:**
- Modify: `site/src/components/Navbar.jsx`

**Step 1: Add imports**

At the top of `Navbar.jsx`, add `Sun, Moon` to the lucide-react import:

```js
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react'
```

Add the useTheme import:

```js
import { useTheme } from '../hooks/useTheme'
```

**Step 2: Add hook call inside Navbar component**

Inside the `Navbar()` function, after the `useLanguageRouter()` call (line 46), add:

```js
  const { theme, toggleTheme } = useTheme()
```

**Step 3: Create ThemeToggle inline button**

After the desktop `LanguageToggle` div (the `<div className="hidden md:flex">` block around line 154-156), add:

```jsx
        {/* Desktop theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}
          className={`p-2 rounded-full transition-colors ${
            scrolled || !isHome
              ? 'text-forest hover:bg-forest/10 dark:text-cream dark:hover:bg-cream/10'
              : 'text-white/70 hover:bg-white/10'
          }`}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
```

**Step 4: Add mobile theme toggle**

In the mobile menu (inside the `menuOpen &&` block), after the mobile `LanguageToggle` (line 210), add:

```jsx
          <button
            onClick={toggleTheme}
            role="menuitem"
            aria-label={theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}
            className={`flex items-center gap-2 text-sm font-medium font-heading ${
              scrolled || !isHome ? 'text-forest dark:text-cream' : 'text-white'
            }`}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}
          </button>
```

**Step 5: Commit**

```bash
git add site/src/components/Navbar.jsx
git commit -m "feat(dark-mode): add theme toggle button to Navbar"
```

---

### Task 6: Dark Mode for index.css Global Styles

**Files:**
- Modify: `site/src/index.css`

**Step 1: Add dark theme color variables**

After the closing `}` of the `@theme` block (line 23), add:

```css
/* Dark mode overrides */
.dark body {
  background-color: var(--color-charcoal);
  color: var(--color-cream);
}

.dark ::-webkit-scrollbar-track {
  background: var(--color-charcoal);
}

.dark ::-webkit-scrollbar-thumb {
  background: var(--color-moss-light);
}

.dark .card-kazepices {
  border-color: rgba(92, 125, 83, 0.25);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
}
.dark .card-kazepices:hover {
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
}

.dark .skip-link {
  background: var(--color-cream);
  color: var(--color-charcoal);
}

.dark a:focus-visible,
.dark button:focus-visible,
.dark input:focus-visible,
.dark select:focus-visible,
.dark textarea:focus-visible,
.dark [tabindex]:focus-visible {
  outline-color: var(--color-moss-light);
}
```

**Step 2: Verify build**

Run: `cd site && npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add site/src/index.css
git commit -m "feat(dark-mode): add dark overrides for global CSS styles"
```

---

### Task 7: Dark Mode for Navbar

**Files:**
- Modify: `site/src/components/Navbar.jsx`

**Step 1: Update nav element classes**

Change the nav `className` (around line 117-121). The scrolled/non-home state needs dark variants:

Replace:
```
'bg-cream/85 backdrop-blur-xl border border-moss/20 shadow-lg'
```
With:
```
'bg-cream/85 dark:bg-charcoal/85 backdrop-blur-xl border border-moss/20 dark:border-moss-light/20 shadow-lg'
```

**Step 2: Update LanguageToggle dark variants**

In the `LanguageToggle` component, for the active state when scrolled:
- `'bg-forest text-white'` → `'bg-forest dark:bg-moss-light text-white'`

For the inactive state when scrolled:
- `'text-forest/50 hover:text-forest'` → `'text-forest/50 dark:text-cream/50 hover:text-forest dark:hover:text-cream'`

**Step 3: Update desktop nav links**

For the `scrolled || !isHome` text color on desktop links (lines 138, 146):
- `'text-forest'` → `'text-forest dark:text-cream'`

**Step 4: Update mobile menu**

The mobile menu border:
- `'border-t border-moss/20'` → `'border-t border-moss/20 dark:border-moss-light/20'`

Mobile link colors (lines 193, 203):
- `'text-forest'` → `'text-forest dark:text-cream'`

**Step 5: Update hamburger button**

Line 171:
- `'text-forest'` → `'text-forest dark:text-cream'`

**Step 6: Verify visually**

Run: `cd site && npm run dev`
Toggle dark mode. Navbar should have dark background when scrolled, light text.

**Step 7: Commit**

```bash
git add site/src/components/Navbar.jsx
git commit -m "feat(dark-mode): add dark variants to Navbar component"
```

---

### Task 8: Dark Mode for Hero, Philosophy, Protocol, VideoSection

**Files:**
- Modify: `site/src/components/Hero.jsx`
- Modify: `site/src/components/Philosophy.jsx`
- Modify: `site/src/components/Protocol.jsx`
- Modify: `site/src/components/VideoSection.jsx`

**Step 1: Hero.jsx**

Hero has a dark overlay already — minimal changes. Add `dark:` variants to any `text-forest`, `bg-cream`, `text-warm-gray` classes found in the component. The hero section itself sits on a dark image so most text is already white.

Key patterns to update:
- Any `bg-cream` → `bg-cream dark:bg-charcoal`
- Any `text-forest` → `text-forest dark:text-cream`
- Any `text-warm-gray` → `text-warm-gray dark:text-cream-dark/70`

**Step 2: Philosophy.jsx**

Scan for and update:
- Section backgrounds: `bg-cream` → `bg-cream dark:bg-charcoal`
- Text colors: `text-forest` → `text-forest dark:text-cream`, `text-charcoal` → `text-charcoal dark:text-cream`
- `text-warm-gray` → `text-warm-gray dark:text-cream-dark/70`
- Borders: `border-moss/X` → `border-moss/X dark:border-moss-light/X`

**Step 3: Protocol.jsx**

Same pattern as above, plus:
- Section with `bg-forest-light` — already dark, may need no changes or minimal adjustments
- SVG hardcoded colors: where possible, replace `#D42B1E` with `currentColor` and use `text-madagascar` class, or leave as-is if they're decorative on a dark background

**Step 4: VideoSection.jsx**

Same bg/text pattern updates.

**Step 5: Verify visually with dev server**

**Step 6: Commit**

```bash
git add site/src/components/Hero.jsx site/src/components/Philosophy.jsx site/src/components/Protocol.jsx site/src/components/VideoSection.jsx
git commit -m "feat(dark-mode): add dark variants to Hero, Philosophy, Protocol, VideoSection"
```

---

### Task 9: Dark Mode for Products, Engagements, ContactCTA

**Files:**
- Modify: `site/src/components/Products.jsx`
- Modify: `site/src/components/Engagements.jsx`
- Modify: `site/src/components/ContactCTA.jsx`

**Step 1: Products.jsx**

Update all product cards:
- `bg-cream` → `bg-cream dark:bg-forest`
- `text-forest` → `text-forest dark:text-cream`
- `text-warm-gray` → `text-warm-gray dark:text-cream-dark/70`
- `text-moss` → `text-moss dark:text-moss-light`

**Step 2: Engagements.jsx**

Update section and cards:
- Same bg/text patterns
- SVG hardcoded `#1B3A2A` → use `currentColor` with appropriate text class where feasible, or leave if it's on a contrasting background

**Step 3: ContactCTA.jsx**

The CTA section likely has a `bg-forest` block (already dark). Scan for any cream/light backgrounds outside it.

**Step 4: Verify visually**

**Step 5: Commit**

```bash
git add site/src/components/Products.jsx site/src/components/Engagements.jsx site/src/components/ContactCTA.jsx
git commit -m "feat(dark-mode): add dark variants to Products, Engagements, ContactCTA"
```

---

### Task 10: Dark Mode for Page Components

**Files:**
- Modify: `site/src/AboutPage.jsx`
- Modify: `site/src/ContactPage.jsx`
- Modify: `site/src/ProductsPage.jsx`
- Modify: `site/src/ProductDetailPage.jsx`

**Step 1: AboutPage.jsx**

Systematic find-and-replace of color patterns:
- `bg-cream` → `bg-cream dark:bg-charcoal`
- `bg-white` → `bg-white dark:bg-forest`
- `text-forest` → `text-forest dark:text-cream`
- `text-charcoal` → `text-charcoal dark:text-cream`
- `text-warm-gray` → `text-warm-gray dark:text-cream-dark/70`
- `text-moss` → `text-moss dark:text-moss-light`
- `border-moss/` → add `dark:border-moss-light/` after

**Step 2: ContactPage.jsx**

Same patterns plus form inputs:
- Input backgrounds: add `dark:bg-forest dark:text-cream dark:border-moss-light/30`
- Input placeholders should remain visible on dark bg
- Error text (red) stays the same — visible on both themes
- Select dropdowns: add dark bg

**Step 3: ProductsPage.jsx**

Same patterns plus filter buttons:
- Active filter: add dark variant
- Product cards: same as Products.jsx component
- Search input: dark bg variant

**Step 4: ProductDetailPage.jsx**

- Breadcrumb: `text-warm-gray` → add `dark:text-cream-dark/70`; `text-forest` → add `dark:text-cream`
- Benefit cards: `bg-cream` → `bg-cream dark:bg-forest`
- `bg-forest/10` (icon bg) → `bg-forest/10 dark:bg-moss-light/15`
- Closing text, provenance badges: add dark text variants

**Step 5: Verify all pages visually in dev server**

**Step 6: Commit**

```bash
git add site/src/AboutPage.jsx site/src/ContactPage.jsx site/src/ProductsPage.jsx site/src/ProductDetailPage.jsx
git commit -m "feat(dark-mode): add dark variants to all page components"
```

---

### Task 11: Dark Mode for Error/Utility Components

**Files:**
- Modify: `site/src/components/NotFoundPage.jsx`
- Modify: `site/src/components/ErrorBoundary.jsx`
- Modify: `site/src/components/Footer.jsx`
- Modify: `site/src/components/Skeleton.jsx`

**Step 1: NotFoundPage.jsx**

- `bg-forest/10` → `bg-forest/10 dark:bg-moss-light/15`
- `text-forest` → `text-forest dark:text-cream`
- `text-warm-gray` → `text-warm-gray dark:text-cream-dark/70`

**Step 2: ErrorBoundary.jsx**

Same patterns as NotFoundPage.

**Step 3: Footer.jsx**

Already has dark background (`bg-charcoal` or similar). Likely needs no changes or very minimal ones. Verify visually.

**Step 4: Skeleton.jsx**

Update shimmer gradient colors for dark mode if needed.

**Step 5: Commit**

```bash
git add site/src/components/NotFoundPage.jsx site/src/components/ErrorBoundary.jsx site/src/components/Footer.jsx site/src/components/Skeleton.jsx
git commit -m "feat(dark-mode): add dark variants to error and utility components"
```

---

### Task 12: Final Dark Mode Verification

**Step 1: Build**

Run: `cd site && npm run build`
Expected: No errors.

**Step 2: Visual QA**

Run: `cd site && npm run preview`
Check every page in both light and dark mode:
- Homepage (all sections)
- Products page (filters, cards, search)
- Product detail page (hero, benefits, related products)
- About page (all sections)
- Contact page (form, info cards)
- 404 page

**Step 3: Commit any fixes**

---

## Part 2: Prev/Next Product Navigation

### Task 13: Add i18n Keys for Prev/Next

**Files:**
- Modify: `site/src/i18n/locales/fr.json`
- Modify: `site/src/i18n/locales/en.json`

**Step 1: Add French keys**

In `fr.json`, inside `"productDetail"` object, add:

```json
    "prevProduct": "Produit précédent",
    "nextProduct": "Produit suivant"
```

**Step 2: Add English keys**

In `en.json`, inside `"productDetail"` object, add:

```json
    "prevProduct": "Previous product",
    "nextProduct": "Next product"
```

**Step 3: Commit**

```bash
git add site/src/i18n/locales/fr.json site/src/i18n/locales/en.json
git commit -m "feat(nav): add i18n keys for prev/next product navigation"
```

---

### Task 14: Add Prev/Next Navigation to ProductDetailPage

**Files:**
- Modify: `site/src/ProductDetailPage.jsx`

**Step 1: Add ChevronLeft to imports**

The file already imports `ChevronRight`. Add `ChevronLeft` to the lucide-react import on line 9:

```js
import { ArrowLeft, MessageCircle, Mail, ArrowRight, Leaf, Package, ChevronRight, ChevronLeft } from 'lucide-react'
```

**Step 2: Compute prev/next products**

After the `const related = ...` block (around line 142) and before the `return` statement, add:

```js
  // Prev/next product navigation
  const currentIndex = products.findIndex((p) =>
    typeof p.slug === 'string'
      ? p.slug === slug
      : p.slug.fr === slug || p.slug.en === slug
  )
  const prevProduct = products[(currentIndex - 1 + products.length) % products.length]
  const nextProduct = products[(currentIndex + 1) % products.length]
```

**Step 3: Add navigation UI**

In the JSX, after the breadcrumb `</nav>` closing tag (line 248) and before the benefits grid comment (line 250), add:

```jsx
          {/* Prev/next product navigation */}
          <div className="flex items-center justify-between mb-10">
            <Link
              to={`${routes.products}/${productSlug(prevProduct, lang)}`}
              className="flex items-center gap-1.5 font-mono text-xs text-moss hover:text-forest transition-colors group"
              aria-label={t('productDetail.prevProduct')}
            >
              <ChevronLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
              <span className="hidden sm:inline">{pt(prevProduct.name, lang)}</span>
              <span className="sm:hidden">{t('productDetail.prevProduct')}</span>
            </Link>
            <Link
              to={`${routes.products}/${productSlug(nextProduct, lang)}`}
              className="flex items-center gap-1.5 font-mono text-xs text-moss hover:text-forest transition-colors group"
              aria-label={t('productDetail.nextProduct')}
            >
              <span className="hidden sm:inline">{pt(nextProduct.name, lang)}</span>
              <span className="sm:hidden">{t('productDetail.nextProduct')}</span>
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
```

**Step 4: Verify**

Run: `cd site && npm run dev`
Navigate to any product detail page. Verify:
- Left arrow shows previous product name, links correctly
- Right arrow shows next product name, links correctly
- First product's left arrow goes to last product (Noix de Cajou)
- Last product's right arrow goes to first product (Moringa)
- Language switching preserves correct bilingual slugs

**Step 5: Add dark mode variants to the new navigation**

Update the new links' classes:
- `text-moss` → `text-moss dark:text-moss-light`
- `hover:text-forest` → `hover:text-forest dark:hover:text-cream`

**Step 6: Build verification**

Run: `cd site && npm run build`
Expected: No errors.

**Step 7: Commit**

```bash
git add site/src/ProductDetailPage.jsx
git commit -m "feat(nav): add prev/next product navigation to ProductDetailPage"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | FOUC prevention script | `public/theme-init.js` |
| 2 | Load script in HTML | `index.html` |
| 3 | useTheme hook | `hooks/useTheme.js` |
| 4 | i18n keys (theme) | `fr.json`, `en.json` |
| 5 | Toggle button in Navbar | `Navbar.jsx` |
| 6 | Global CSS dark overrides | `index.css` |
| 7 | Navbar dark variants | `Navbar.jsx` |
| 8 | Hero, Philosophy, Protocol, VideoSection | 4 components |
| 9 | Products, Engagements, ContactCTA | 3 components |
| 10 | Page components | 4 pages |
| 11 | Error/utility components | 4 components |
| 12 | Final dark mode verification | All |
| 13 | i18n keys (prev/next) | `fr.json`, `en.json` |
| 14 | Prev/next navigation | `ProductDetailPage.jsx` |
