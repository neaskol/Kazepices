# Prev/Next Product Navigation Design

**Date:** 2026-02-25
**Status:** Approved

## Summary

Add previous/next arrow navigation to ProductDetailPage so users can browse sequentially through the product catalog.

## Placement

Between the breadcrumb and the benefits grid, inside the content section (`max-w-5xl` container). A compact horizontal bar with left/right arrows linking to adjacent products.

## Behavior

- Products follow the order defined in the `products` array (6 products)
- Wraps around: first product's "previous" is the last product, last product's "next" is the first
- Links use `productSlug(p, lang)` for bilingual URL support

## Visual

```
← Poivre Noir          Gingembre →
```

- Left side: `ChevronLeft` icon + previous product name (linked)
- Right side: next product name + `ChevronRight` icon (linked)
- Style: `font-mono text-xs text-moss`, hover → `text-forest`
- Full-width flex row with `justify-between`

## Files to Modify

- **`site/src/ProductDetailPage.jsx`** — Add ~20 lines for prev/next navigation bar
- **`site/src/i18n/locales/fr.json`** — Add `productDetail.prevProduct`, `productDetail.nextProduct` keys
- **`site/src/i18n/locales/en.json`** — Same keys in English

## Out of Scope

- Swipe gestures
- Keyboard shortcuts (left/right arrow keys)
