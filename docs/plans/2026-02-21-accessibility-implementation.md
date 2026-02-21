# Accessibilite WCAG 2.1 AA - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Bring Kazepices Madagascar site to WCAG 2.1 AA compliance through targeted fixes in existing components.

**Architecture:** No new dependencies. All changes are additions of ARIA attributes, CSS utilities, contrast fixes, and keyboard handlers in existing React components. One new CSS utility class (`.sr-only`) and global focus-visible styles are added in `index.css`.

**Tech Stack:** React 19, Tailwind CSS 4, Vite 7, GSAP (animations)

**Note:** This project has no test framework. Verification is done by running `npm run build` to ensure no compilation errors, and manual checking in browser dev tools.

---

### Task 1: CSS Foundations — sr-only + focus-visible

**Files:**
- Modify: `site/src/index.css` (add after line 172, before the closing `}` of prefers-reduced-motion block ends)

**Step 1: Add sr-only utility and focus-visible styles to index.css**

Add at the end of `site/src/index.css` (after the `prefers-reduced-motion` block):

```css
/* Screen-reader only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Focus visible — accessible focus indicators */
a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
[tabindex]:focus-visible {
  outline: 2px solid var(--color-forest);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Skip link becomes visible on focus */
.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  z-index: 9999;
  padding: 12px 24px;
  background: var(--color-forest);
  color: var(--color-white);
  font-family: var(--font-heading);
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 0 0 1rem 1rem;
  text-decoration: none;
  transition: top 0.2s ease;
}
.skip-link:focus {
  top: 0;
}
```

**Step 2: Verify build**

Run: `cd site && npm run build`
Expected: Build succeeds with no errors

**Step 3: Commit**

```bash
git add site/src/index.css
git commit -m "a11y: add sr-only utility, focus-visible styles, and skip-link class"
```

---

### Task 2: Skip-to-Content Link + Accessible Main

**Files:**
- Modify: `site/src/App.jsx`

**Step 1: Add skip link and main-content id**

In `site/src/App.jsx`, add the skip link as the first child inside `<BrowserRouter>`, and add `id="main-content"` to `<main>`:

```jsx
export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <OrganizationSchema />
        <NoiseOverlay />
        <header>
          <Navbar />
        </header>
        <main id="main-content">
          <AppRouter />
        </main>
        <Footer />
        <WhatsAppFloat />
      </BrowserRouter>
    </ErrorBoundary>
  )
}
```

**Step 2: Verify build**

Run: `cd site && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add site/src/App.jsx
git commit -m "a11y: add skip-to-content link and main-content landmark id"
```

---

### Task 3: NoiseOverlay aria-hidden + Spinner accessibility

**Files:**
- Modify: `site/src/components/NoiseOverlay.jsx`
- Modify: `site/src/AppRouter.jsx`

**Step 1: Add aria-hidden to NoiseOverlay**

In `site/src/components/NoiseOverlay.jsx`, add `aria-hidden="true"` to the `<svg>`:

```jsx
export default function NoiseOverlay() {
  return (
    <svg className="noise-overlay" width="100%" height="100%" aria-hidden="true">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  )
}
```

**Step 2: Make LoadingSpinner accessible**

In `site/src/AppRouter.jsx`, update `LoadingSpinner`:

```jsx
function LoadingSpinner() {
  return (
    <div className="min-h-dvh flex items-center justify-center" role="status" aria-label="Chargement de la page">
      <div className="w-8 h-8 border-2 border-madagascar border-t-transparent rounded-full animate-spin" />
      <span className="sr-only">Chargement en cours...</span>
    </div>
  )
}
```

**Step 3: Verify build**

Run: `cd site && npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add site/src/components/NoiseOverlay.jsx site/src/AppRouter.jsx
git commit -m "a11y: hide decorative noise overlay, make loading spinner accessible"
```

---

### Task 4: Route Change Announcer

**Files:**
- Modify: `site/src/components/ScrollToTop.jsx`

**Step 1: Add aria-live route announcer**

Replace `site/src/components/ScrollToTop.jsx` with a version that announces page changes:

```jsx
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    // Small delay to let the new page set its title
    const timeout = setTimeout(() => {
      setAnnouncement(document.title)
    }, 100)
    return () => clearTimeout(timeout)
  }, [pathname])

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      role="status"
      className="sr-only"
    >
      {announcement}
    </div>
  )
}
```

**Step 2: Verify build**

Run: `cd site && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add site/src/components/ScrollToTop.jsx
git commit -m "a11y: announce route changes to screen readers via aria-live"
```

---

### Task 5: Navbar Accessibility — ARIA, Escape, Focus Trap

**Files:**
- Modify: `site/src/components/Navbar.jsx`

**Step 1: Add aria-label, aria-controls, Escape handler, and focus trap**

Replace `site/src/components/Navbar.jsx` with:

```jsx
import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'

import logoImg from '../assets/logo.webp'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current, {
        y: -40,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      })
    })
    return () => ctx.revert()
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Escape key closes mobile menu
  useEffect(() => {
    if (!menuOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  // Focus trap inside mobile menu
  useEffect(() => {
    if (!menuOpen || !menuRef.current) return
    const menu = menuRef.current
    const focusableEls = menu.querySelectorAll('a, button')
    if (focusableEls.length === 0) return
    const firstEl = focusableEls[0]
    const lastEl = focusableEls[focusableEls.length - 1]

    const trapFocus = (e) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault()
          lastEl.focus()
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault()
          firstEl.focus()
        }
      }
    }
    menu.addEventListener('keydown', trapFocus)
    firstEl.focus()
    return () => menu.removeEventListener('keydown', trapFocus)
  }, [menuOpen])

  return (
    <nav
      ref={navRef}
      aria-label="Menu principal"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        scrolled || !isHome
          ? 'bg-cream/85 backdrop-blur-xl border border-moss/20 shadow-lg'
          : 'bg-charcoal/40 backdrop-blur-md border border-white/15'
      }`}
      style={{ borderRadius: '3rem', padding: '0.6rem 1.5rem', maxWidth: '90vw' }}
    >
      <div className="flex items-center gap-6">
        <Link to="/" className="flex-shrink-0">
          <img
            src={logoImg}
            alt="Kazepices — Accueil"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/a-propos"
            className={`text-sm font-medium font-heading hover-lift transition-colors ${
              scrolled || !isHome ? 'text-forest' : 'text-white'
            }`}
          >
            A propos
          </Link>
          <Link
            to="/contact"
            className={`text-sm font-medium font-heading hover-lift transition-colors ${
              scrolled || !isHome ? 'text-forest' : 'text-white'
            }`}
          >
            Contact
          </Link>
        </div>

        <Link
          to="/produits"
          className="hidden md:inline-flex btn-magnetic items-center gap-2 bg-madagascar text-white text-sm font-semibold font-heading px-5 py-2.5"
          style={{ borderRadius: '2rem' }}
        >
          <span className="btn-bg bg-madagascar-light" style={{ borderRadius: '2rem' }} />
          <span className="relative z-10 flex items-center gap-2">
            Nos produits <ArrowRight size={14} aria-hidden="true" />
          </span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          ref={toggleRef}
          className={`md:hidden ${scrolled || !isHome ? 'text-forest' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="menu"
          className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-moss/20 pt-4"
        >
          <Link
            to="/a-propos"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className={`text-sm font-medium font-heading ${
              scrolled || !isHome ? 'text-forest' : 'text-white'
            }`}
          >
            A propos
          </Link>
          <Link
            to="/contact"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className={`text-sm font-medium font-heading ${
              scrolled || !isHome ? 'text-forest' : 'text-white'
            }`}
          >
            Contact
          </Link>
          <Link
            to="/produits"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className="btn-magnetic bg-madagascar text-white text-sm font-semibold font-heading px-5 py-2.5 text-center"
            style={{ borderRadius: '2rem' }}
          >
            Nos produits
          </Link>
        </div>
      )}
    </nav>
  )
}
```

**Step 2: Verify build**

Run: `cd site && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add site/src/components/Navbar.jsx
git commit -m "a11y: navbar aria-label, focus trap, Escape key, aria-controls"
```

---

### Task 6: Contrast Fixes — Footer

**Files:**
- Modify: `site/src/components/Footer.jsx`

**Step 1: Fix all contrast values in Footer**

Apply these replacements in `site/src/components/Footer.jsx`:

1. Line 13: `text-white/50` -> `text-white/70` (description paragraph)
2. Lines 24, 30, 36, 42: `text-white/40` -> `text-white/70` (nav links base)
3. Lines 24, 30, 36, 42: `hover:text-white/70` -> `hover:text-white/90` (nav links hover)
4. Line 54: `text-white/40` -> `text-white/70` (product names)
5. Line 63: `text-white/30` -> `text-white/60` (copyright)
6. Line 68: `text-white/40` -> `text-white/60` ("Systeme operationnel")

**Step 2: Verify build**

Run: `cd site && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add site/src/components/Footer.jsx
git commit -m "a11y: fix color contrast ratios in footer for WCAG AA compliance"
```

---

### Task 7: Contrast Fixes — Hero, Philosophy, Protocol

**Files:**
- Modify: `site/src/components/Hero.jsx`
- Modify: `site/src/components/Philosophy.jsx`
- Modify: `site/src/components/Protocol.jsx`

**Step 1: Fix Hero contrast**

In `site/src/components/Hero.jsx`:
- Line 76: `text-white/40` -> `text-white/60` (scroll hint "DEFILER POUR DECOUVRIR")

**Step 2: Fix Philosophy contrast**

In `site/src/components/Philosophy.jsx`:
- Line 38: `text-white/50` -> `text-white/70` (first paragraph)
- Line 46: `text-white/60` -> `text-white/70` (second paragraph)

**Step 3: Fix Protocol contrast**

In `site/src/components/Protocol.jsx`:
- Line 75: `text-white/60` -> `text-white/70` (step descriptions)

**Step 4: Verify build**

Run: `cd site && npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add site/src/components/Hero.jsx site/src/components/Philosophy.jsx site/src/components/Protocol.jsx
git commit -m "a11y: fix contrast ratios in Hero, Philosophy, Protocol sections"
```

---

### Task 8: Contrast Fixes — AboutPage

**Files:**
- Modify: `site/src/AboutPage.jsx`

**Step 1: Fix all low-contrast text in AboutPage**

In `site/src/AboutPage.jsx`:
- Line 56: `text-white/60` -> `text-white/70` (AboutHero description)
- Line 232: `text-white/60` -> `text-white/70` (Founder description)
- Line 247: `text-white/40` -> `text-white/60` (Founder attribution)
- Line 455: `text-white/50` -> `text-white/70` (Engagements subtitle)
- Line 482: `text-white/50` -> `text-white/70` (pillar descriptions)
- Line 489: `text-white/40` -> `text-white/60` (stat labels)
- Line 582: `text-white/60` -> `text-white/70` (AboutCTA description)

**Step 2: Verify build**

Run: `cd site && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add site/src/AboutPage.jsx
git commit -m "a11y: fix contrast ratios across AboutPage sections"
```

---

### Task 9: Contrast Fixes — ProductsPage + ContactPage

**Files:**
- Modify: `site/src/ProductsPage.jsx`
- Modify: `site/src/ContactPage.jsx`

**Step 1: Fix ProductsPage contrast**

In `site/src/ProductsPage.jsx`:
- Lines 117, 122, 127: `text-white/40` (stats labels "Produits", "Naturel", "Produits chimiques") -> `text-white/60`
- Line 107: `text-white/60` -> `text-white/70` (hero description)
- Line 253: `text-white/60` -> `text-white/70` (bottom CTA description)

**Step 2: Fix ContactPage contrast**

In `site/src/ContactPage.jsx`:
- Line 200: `text-white/60` -> `text-white/70` (hero description)

**Step 3: Verify build**

Run: `cd site && npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add site/src/ProductsPage.jsx site/src/ContactPage.jsx
git commit -m "a11y: fix contrast ratios in ProductsPage and ContactPage"
```

---

### Task 10: VideoSection Accessibility

**Files:**
- Modify: `site/src/components/VideoSection.jsx`

**Step 1: Rewrite VideoSection with accessible controls**

Replace `site/src/components/VideoSection.jsx` with:

```jsx
import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

import presentationVideo from '../assets/kazepices-presentation.mp4'

gsap.registerPlugin(ScrollTrigger)

export default function VideoSection() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.video-content', { y: 50, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play()
          setIsPlaying(true)
        } else {
          video.pause()
          setIsPlaying(false)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const toggleVideo = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }, [])

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }, [])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'm' || e.key === 'M') {
      e.preventDefault()
      toggleMute()
    }
  }, [toggleMute])

  return (
    <section id="video" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto video-content">
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-moss tracking-widest uppercase">Notre histoire</span>
          <h2 className="font-heading font-extrabold text-forest text-3xl md:text-5xl mt-3 tracking-tight">
            L'histoire de{' '}
            <span className="font-drama italic text-madagascar">Kazepices.</span>
          </h2>
          <p className="font-body text-warm-gray text-base mt-4 max-w-lg mx-auto leading-relaxed">
            Decouvrez notre parcours, nos valeurs et la passion qui anime chaque produit Kazepices.
          </p>
        </div>

        <div
          className="relative overflow-hidden"
          style={{ borderRadius: '2.5rem' }}
          onKeyDown={handleKeyDown}
        >
          <video
            ref={videoRef}
            muted
            playsInline
            aria-label="Video de presentation Kazepices Madagascar"
            className="w-full aspect-video object-cover"
            style={{ borderRadius: '2.5rem' }}
          >
            <source src={presentationVideo} type="video/mp4" />
          </video>

          <p className="sr-only">
            Video de presentation de Kazepices Madagascar montrant le processus de recolte,
            de transformation et de conditionnement des epices naturelles a Madagascar.
          </p>

          {/* Play/Pause button */}
          <button
            onClick={toggleVideo}
            aria-label={isPlaying ? 'Mettre en pause' : 'Lire la video'}
            className={`absolute inset-0 bg-charcoal/40 flex items-center justify-center transition-opacity duration-500 cursor-pointer ${
              isPlaying ? 'opacity-0 hover:opacity-100 focus-visible:opacity-100' : 'opacity-100'
            }`}
            style={{ borderRadius: '2.5rem' }}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-md flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-110">
              {isPlaying ? (
                <Pause size={32} className="text-white" aria-hidden="true" />
              ) : (
                <Play size={32} className="text-white ml-1" aria-hidden="true" />
              )}
            </div>
          </button>

          {/* Sound toggle button */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
            className="absolute bottom-5 right-5 z-10 w-11 h-11 bg-charcoal/60 backdrop-blur-md flex items-center justify-center rounded-full transition-all duration-300 hover:bg-charcoal/80 hover:scale-110"
          >
            {isMuted ? (
              <VolumeX size={18} className="text-white" aria-hidden="true" />
            ) : (
              <Volume2 size={18} className="text-white" aria-hidden="true" />
            )}
          </button>

          {/* Border glow — decorative */}
          <div
            className="absolute inset-0 border-2 border-moss/20 pointer-events-none"
            style={{ borderRadius: '2.5rem' }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Verify build**

Run: `cd site && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add site/src/components/VideoSection.jsx
git commit -m "a11y: accessible video controls with keyboard support and aria-labels"
```

---

### Task 11: ContactPage Form Accessibility

**Files:**
- Modify: `site/src/ContactPage.jsx`

**Step 1: Add aria-describedby, aria-invalid, role="alert" to form errors**

In `site/src/ContactPage.jsx`, apply these changes:

1. Add `aria-busy={status === 'submitting'}` to the `<form>` element (line 280)

2. For each input field, add `aria-invalid` and `aria-describedby`:

Name input — add:
```jsx
aria-invalid={!!errors.name}
aria-describedby={errors.name ? 'error-name' : undefined}
```

Name error — change to:
```jsx
{errors.name && <p id="error-name" role="alert" className="text-madagascar text-xs mt-1 font-body">{errors.name}</p>}
```

Email input — add:
```jsx
aria-invalid={!!errors.email}
aria-describedby={errors.email ? 'error-email' : undefined}
```

Email error — change to:
```jsx
{errors.email && <p id="error-email" role="alert" className="text-madagascar text-xs mt-1 font-body">{errors.email}</p>}
```

Subject select — add:
```jsx
aria-invalid={!!errors.subject}
aria-describedby={errors.subject ? 'error-subject' : undefined}
```

Subject error — change to:
```jsx
{errors.subject && <p id="error-subject" role="alert" className="text-madagascar text-xs mt-1 font-body">{errors.subject}</p>}
```

Message textarea — add:
```jsx
aria-invalid={!!errors.message}
aria-describedby={errors.message ? 'error-message' : undefined}
```

Message error — change to:
```jsx
{errors.message && <p id="error-message" role="alert" className="text-madagascar text-xs mt-1 font-body">{errors.message}</p>}
```

3. Add `role="status"` to success, error, and rate-limit message divs (lines 395, 403, 411)

**Step 2: Verify build**

Run: `cd site && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add site/src/ContactPage.jsx
git commit -m "a11y: form errors with aria-invalid, aria-describedby, and role=alert"
```

---

### Task 12: ProductsPage — Filters and Expand Accessibility

**Files:**
- Modify: `site/src/ProductsPage.jsx`

**Step 1: Add ARIA to filter buttons**

Wrap the filter buttons container (line 137) with `role="group"` and `aria-label`:

```jsx
<div className="catalog-filters flex flex-wrap items-center gap-3 mb-12" role="group" aria-label="Filtrer par categorie">
  <Filter size={16} className="text-moss" aria-hidden="true" />
  {categories.map((cat) => (
    <button
      key={cat.key}
      onClick={() => { setActiveCategory(cat.key); setExpandedProduct(null) }}
      aria-pressed={activeCategory === cat.key}
      className={`font-heading font-semibold text-sm px-5 py-2.5 transition-all duration-300 ${
        activeCategory === cat.key
          ? 'bg-forest text-white'
          : 'bg-forest/5 text-forest hover:bg-forest/10'
      }`}
      style={{ borderRadius: '2rem' }}
    >
      {cat.label}
    </button>
  ))}
  <span className="font-mono text-xs text-warm-gray ml-auto" aria-live="polite">
    {filtered.length} produit{filtered.length > 1 ? 's' : ''}
  </span>
</div>
```

**Step 2: Add aria-expanded and aria-controls to "En savoir plus" buttons**

For each product card, update the expand button and detail section:

```jsx
<button
  onClick={() => setExpandedProduct(expandedProduct === product.name ? null : product.name)}
  aria-expanded={expandedProduct === product.name}
  aria-controls={`details-${product.name.replace(/\s+/g, '-').toLowerCase()}`}
  className="mt-3 font-heading text-xs font-semibold text-moss hover:text-forest transition-colors text-left"
>
  {expandedProduct === product.name ? '— Moins de details' : '+ En savoir plus'}
</button>
```

And the expandable details div:

```jsx
{expandedProduct === product.name && (
  <div id={`details-${product.name.replace(/\s+/g, '-').toLowerCase()}`} className="mt-3 pt-3 border-t border-moss/10">
    ...
  </div>
)}
```

**Step 3: Verify build**

Run: `cd site && npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add site/src/ProductsPage.jsx
git commit -m "a11y: accessible product filters and expandable details"
```

---

### Task 13: Decorative Elements — aria-hidden Across Components

**Files:**
- Modify: `site/src/components/Engagements.jsx`
- Modify: `site/src/components/Products.jsx`
- Modify: `site/src/components/ContactCTA.jsx`
- Modify: `site/src/components/Protocol.jsx`
- Modify: `site/src/components/Footer.jsx`

**Step 1: Engagements.jsx — hide decorative pulse-dots**

In `site/src/components/Engagements.jsx`:
- Line 106: Add `aria-hidden="true"` to the `<span>` with class `pulse-dot`
- Line 37: Add `aria-hidden="true"` to the decorative `<span>` with `pulse-dot` in ShufflerCard

**Step 2: Products.jsx — hide decorative icons**

In `site/src/components/Products.jsx`:
- Line 72: `<Package size={48}` — add `aria-hidden="true"`

**Step 3: ContactCTA.jsx — hide decorative icons**

In `site/src/components/ContactCTA.jsx`:
- Line 71: `<MapPin size={16}` — add `aria-hidden="true"`
- Line 75: `<Globe size={16}` — add `aria-hidden="true"`

**Step 4: Protocol.jsx — hide decorative SVGs**

In `site/src/components/Protocol.jsx`:
- Lines 80, 96, 107: Add `aria-hidden="true"` to all three decorative `<svg>` elements

**Step 5: Footer.jsx — hide decorative pulse-dot**

In `site/src/components/Footer.jsx`:
- Line 66: Add `aria-hidden="true"` to `<span className="w-2 h-2 bg-moss-light rounded-full pulse-dot" />`

**Step 6: Verify build**

Run: `cd site && npm run build`
Expected: Build succeeds

**Step 7: Commit**

```bash
git add site/src/components/Engagements.jsx site/src/components/Products.jsx site/src/components/ContactCTA.jsx site/src/components/Protocol.jsx site/src/components/Footer.jsx
git commit -m "a11y: hide decorative elements from assistive technologies"
```

---

### Task 14: Final Build Verification

**Step 1: Full build**

Run: `cd site && npm run build`
Expected: Build succeeds with zero errors

**Step 2: Run lint**

Run: `cd site && npm run lint`
Expected: No new warnings or errors

**Step 3: Final commit (if any lint fixes needed)**

Fix any issues and commit.

---

## Summary of Changes

| Task | Component | WCAG Criteria |
|------|-----------|---------------|
| 1 | CSS foundations | 2.4.7 Focus Visible |
| 2 | Skip link | 2.4.1 Bypass Blocks |
| 3 | NoiseOverlay + Spinner | 4.1.2 Name/Role/Value, 1.1.1 Non-text |
| 4 | Route announcer | 4.1.3 Status Messages |
| 5 | Navbar | 2.1.1 Keyboard, 2.4.3 Focus Order |
| 6-9 | Contrast fixes | 1.4.3 Contrast Minimum |
| 10 | VideoSection | 2.1.1 Keyboard, 4.1.2 Name/Role/Value |
| 11 | Contact form | 3.3.1 Error Identification, 4.1.3 Status Messages |
| 12 | Products filters/expand | 4.1.2 Name/Role/Value |
| 13 | Decorative elements | 1.1.1 Non-text Content |
