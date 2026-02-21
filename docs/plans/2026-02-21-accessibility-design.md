# Accessibilite WCAG 2.1 AA - Design Document

**Date:** 2026-02-21
**Objectif:** Amener le site Kazepices Madagascar a la conformite WCAG 2.1 AA
**Approche:** Corrections ciblees dans les composants existants, sans nouvelles dependances

---

## Section 1 : Navigation & Structure globale

### 1.1 Lien "Skip to content" (App.jsx)
- Ajouter `<a href="#main-content">Aller au contenu principal</a>` avec classe `.sr-only focus:not-sr-only`
- Ajouter `id="main-content"` sur `<main>`

### 1.2 Focus visible global (index.css)
- Style `focus-visible` avec outline 2px solid + offset sur tous les elements interactifs
- Classe utilitaire `.sr-only` pour textes accessibles invisibles

### 1.3 Menu mobile (Navbar.jsx)
- Focus trap quand le menu est ouvert
- Fermeture avec Escape
- `aria-controls` sur le bouton toggle + `id` sur le menu
- `role="navigation"` avec `aria-label="Menu principal"` sur `<nav>`

### 1.4 Annonce de changement de route (ScrollToTop.jsx)
- Region `aria-live="polite"` annoncant le titre de la page apres chaque navigation SPA

### 1.5 Loading spinner (AppRouter.jsx)
- `role="status"` et `aria-label="Chargement de la page"` sur le spinner

---

## Section 2 : Contrastes de couleur (WCAG 1.4.3 - ratio >= 4.5:1)

### Corrections par fichier

| Fichier | Actuel | Corrige | Contexte |
|---------|--------|---------|----------|
| Footer.jsx | `text-white/40` (liens nav) | `text-white/70` | Sur bg-charcoal |
| Footer.jsx | `text-white/50` (description) | `text-white/70` | Sur bg-charcoal |
| Footer.jsx | `text-white/30` (copyright) | `text-white/60` | Sur bg-charcoal |
| Footer.jsx | `text-white/40` (systeme) | `text-white/60` | Sur bg-charcoal |
| Footer.jsx | `hover:text-white/70` | `hover:text-white/90` | Hover des liens |
| ProductsPage.jsx | `text-white/40` (stats) | `text-white/60` | Sur bg-charcoal |
| ProductsPage.jsx | `text-white/60` (descriptions) | `text-white/70` | Sur bg-charcoal/forest |
| ContactPage.jsx | `text-white/60` (hero desc) | `text-white/70` | Sur bg-charcoal |
| Hero.jsx | `text-white/40` (scroll hint) | `text-white/60` | Sur overlay sombre |

---

## Section 3 : Accessibilite video (VideoSection.jsx)

### 3.1 Boutons accessibles
- Transformer la zone de clic en `<button>` avec `aria-label` dynamique ("Lire la video" / "Mettre en pause")
- Bouton mute : `aria-label` dynamique ("Activer le son" / "Couper le son")

### 3.2 Controle clavier
- `onKeyDown` : Espace/Entree pour play/pause, M pour mute
- Boutons focusables

### 3.3 Semantique video
- `aria-label="Video de presentation Kazepices"` sur `<video>`
- `<p>` en `.sr-only` decrivant le contenu video (alternative textuelle)

---

## Section 4 : Formulaires & erreurs (ContactPage.jsx)

### 4.1 Erreurs accessibles
- `aria-describedby` sur chaque input pointant vers son message d'erreur
- `role="alert"` sur les messages d'erreur
- `aria-invalid="true"` sur les champs en erreur

### 4.2 Messages de statut
- `role="status"` sur les messages succes/erreur/rate-limit

### 4.3 Bouton submit
- `aria-busy="true"` sur le formulaire pendant la soumission

---

## Section 5 : Elements decoratifs & divers

### 5.1 Masquer les elements decoratifs
- NoiseOverlay.jsx : `aria-hidden="true"` sur le SVG
- Icones Lucide decoratives : `aria-hidden="true"`
- Spans `pulse-dot` : `aria-hidden="true"`

### 5.2 Boutons "En savoir plus" (ProductsPage.jsx)
- `aria-expanded` sur chaque bouton
- `aria-controls` pointant vers l'id du contenu detaille

### 5.3 Filtres produits (ProductsPage.jsx)
- `role="group"` et `aria-label="Filtrer par categorie"` sur le conteneur
- `aria-pressed` sur chaque bouton de filtre

---

## Fichiers impactes

1. `src/App.jsx` - Skip link + id main-content
2. `src/index.css` - Focus visible, sr-only
3. `src/components/Navbar.jsx` - Focus trap, Escape, aria
4. `src/components/ScrollToTop.jsx` - Annonce route aria-live
5. `src/AppRouter.jsx` - Spinner accessible
6. `src/components/Footer.jsx` - Contrastes
7. `src/components/Hero.jsx` - Contrastes
8. `src/components/VideoSection.jsx` - Boutons, clavier, semantique
9. `src/ContactPage.jsx` - Erreurs, statut, aria
10. `src/ProductsPage.jsx` - Contrastes, filtres, expand
11. `src/components/NoiseOverlay.jsx` - aria-hidden
12. `src/components/Products.jsx` - aria-hidden decoratifs
13. `src/components/Engagements.jsx` - aria-hidden decoratifs
14. `src/components/ContactCTA.jsx` - aria-hidden decoratifs
