# Hero Image Replacement Design

**Date**: 2026-03-02
**Status**: Approved
**Objective**: Replace the generic Unsplash hero background image with the custom kaz.webp illustration

---

## Context

The current Hero component uses a generic Unsplash image as background. We want to replace it with the custom kaz.webp illustration (122KB WebP file) located in `/assets/kaz.webp`. This image features Madagascar's map, local elements (baobab, lemurs, vanilla), and the France-Madagascar connection, perfectly aligning with the Kazepices brand identity.

---

## Design Decision

**Chosen Approach**: Simple local image replacement (Approach 1)

### Rationale
- The kaz.webp file is already optimized (WebP format, 122KB)
- Performance improvement: local asset loads faster than external CDN
- Brand consistency: custom illustration reflects site identity
- Simplicity: minimal code changes, no need for multiple responsive variants

---

## Implementation Details

### File Modified
- `site/src/components/Hero.jsx` (lines 28-40)

### Changes Required

1. **Replace image source**
   - Current: Unsplash URL with srcSet for responsive images
   - New: `/assets/kaz.webp` (single source, no srcSet needed)

2. **Remove horizontal flip**
   - Current: `className` includes `-scale-x-100` to flip the Unsplash image
   - New: Remove `-scale-x-100` as kaz.webp doesn't need flipping

3. **Preserve existing features**
   - Keep `fetchPriority="high"` for LCP optimization
   - Keep `alt={t('hero.imageAlt')}` for accessibility
   - Keep `className="absolute inset-0 w-full h-full object-cover"`
   - Keep the overlay (`hero-overlay`) for text readability
   - Keep all GSAP animations unchanged

### Code Change

**Before**:
```jsx
<img
  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1920&q=90"
  srcSet="
    https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=640&q=80 640w,
    https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1024&q=85 1024w,
    https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1920&q=90 1920w"
  sizes="100vw"
  fetchPriority="high"
  alt={t('hero.imageAlt')}
  crossOrigin="anonymous"
  referrerPolicy="no-referrer"
  className="absolute inset-0 w-full h-full object-cover -scale-x-100"
/>
```

**After**:
```jsx
<img
  src="/assets/kaz.webp"
  fetchPriority="high"
  alt={t('hero.imageAlt')}
  className="absolute inset-0 w-full h-full object-cover"
/>
```

---

## Considerations

### Performance
- **Impact**: Positive - local asset loads faster than external CDN
- **LCP**: Maintained with `fetchPriority="high"`
- **File size**: 122KB is reasonable for a hero image

### Accessibility
- Translation key `hero.imageAlt` should be verified/updated to describe the new illustration

### Responsive Behavior
- Single image works for all screen sizes
- `object-cover` ensures proper cropping on all devices
- Future optimization: could generate responsive variants if needed

### Dark Mode
- Image works in both light and dark modes thanks to the overlay

---

## Future Enhancements (Optional)

1. Generate responsive variants (640px, 1024px, 1920px) for optimal mobile performance
2. Add lazy-loaded blur placeholder for progressive loading
3. Consider art direction with different crops for mobile vs desktop

---

## Success Criteria

- ✅ Hero displays kaz.webp as full-screen background
- ✅ Image loads quickly with `fetchPriority="high"`
- ✅ Text remains readable over the image (overlay preserved)
- ✅ No horizontal flipping applied
- ✅ Responsive behavior works on all devices
- ✅ No console errors or broken image paths
