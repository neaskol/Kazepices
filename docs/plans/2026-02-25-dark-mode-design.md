# Dark Mode Design — Kazepices

**Date:** 2026-02-25
**Status:** Approved

## Summary

Add a manual light/dark theme toggle to the Kazepices website using Tailwind v4 `dark:` variant classes. The dark palette inverts backgrounds while preserving the brand identity (forest greens, madagascar red).

## Decisions

- **Activation:** Manual toggle only (sun/moon button in Navbar), preference saved in `localStorage`
- **Palette:** Inverted brand — dark backgrounds, brand accent colors stay
- **Approach:** Tailwind `dark:` variant classes on every component (Approach A)
- **Default:** Light mode
- **Transition:** Instant switch, no CSS transition on theme change

## Toggle Mechanism

- Sun/Moon icon button in Navbar (next to language toggle), using `Sun` and `Moon` from lucide-react
- Toggles `.dark` class on `<html>` element
- Preference stored in `localStorage` key `kazepices-theme` (`"light"` | `"dark"`)
- Inline script in `index.html` reads localStorage before first paint to prevent flash of wrong theme (FOUC)
- Default when no preference: light mode

## Dark Palette

| Token           | Light                    | Dark                         |
|-----------------|--------------------------|------------------------------|
| Page background | `cream` (#F5F2EB)        | `charcoal` (#1A1A1A)         |
| Primary text    | `charcoal` (#1A1A1A)     | `cream` (#F5F2EB)            |
| Secondary text  | `warm-gray` (#6B6B6B)    | `cream-dark` (#EDE9E0) ~70%  |
| Card/section bg | `white` (#FFF)           | `forest` (#1B3A2A)           |
| Card border     | `moss/15`                | `moss-light/25`              |
| Nav (scrolled)  | `cream/85` backdrop      | `charcoal/85` backdrop       |
| Accent (CTA)    | `madagascar` (#D42B1E)   | `madagascar` (unchanged)     |
| Links/highlights| `forest`                 | `moss-light` (#5C7D53)       |
| Footer          | `charcoal` bg (unchanged)| Same (already dark)          |

## Files to Create

### `site/src/hooks/useTheme.js`
- Custom hook managing theme state
- Reads/writes `localStorage` key `kazepices-theme`
- Adds/removes `.dark` class on `document.documentElement`
- Exports `{ theme, toggleTheme }` where theme is `"light"` | `"dark"`

## Files to Modify

### Infrastructure
- **`site/index.html`** — Add inline `<script>` in `<head>` before any CSS to read localStorage and set `.dark` class (prevents FOUC)
- **`site/src/index.css`** — Add dark body/scrollbar styles, dark card-kazepices variant, dark focus-visible, dark skip-link

### Navbar
- **`site/src/components/Navbar.jsx`** — Add theme toggle button (Sun/Moon icons), dark variants for nav bg, text, borders, mobile menu

### Page Components (4 files)
- **`site/src/AboutPage.jsx`** — `dark:` classes on backgrounds, text, borders
- **`site/src/ContactPage.jsx`** — `dark:` classes on form inputs, backgrounds, text
- **`site/src/ProductsPage.jsx`** — `dark:` classes on card grid, filters, text
- **`site/src/ProductDetailPage.jsx`** — `dark:` classes on product info, breadcrumbs

### Feature Components (~10 files)
- **`site/src/components/Hero.jsx`** — Minimal changes (hero already uses dark overlay)
- **`site/src/components/Products.jsx`** — `dark:` on product cards, text
- **`site/src/components/Philosophy.jsx`** — `dark:` on section bg, text
- **`site/src/components/Protocol.jsx`** — `dark:` on section, convert SVG hardcoded colors to currentColor where possible
- **`site/src/components/Engagements.jsx`** — `dark:` on section, convert SVG hardcoded colors
- **`site/src/components/VideoSection.jsx`** — `dark:` on section bg, text
- **`site/src/components/ContactCTA.jsx`** — `dark:` on section bg, text
- **`site/src/components/NotFoundPage.jsx`** — `dark:` on bg, text
- **`site/src/components/ErrorBoundary.jsx`** — `dark:` on bg, text
- **`site/src/components/Footer.jsx`** — Already dark, minimal/no changes
- **`site/src/components/Skeleton.jsx`** — `dark:` on shimmer bg

### i18n (2 files)
- **`site/src/i18n/locales/fr.json`** — Add `nav.darkMode`, `nav.lightMode` keys
- **`site/src/i18n/locales/en.json`** — Add `nav.darkMode`, `nav.lightMode` keys

## Out of Scope

- System preference detection (`prefers-color-scheme`)
- Page-wide CSS transition animation on theme change
- Dark mode for print styles
- Per-component theme overrides
