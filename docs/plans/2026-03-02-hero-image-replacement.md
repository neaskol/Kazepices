# Hero Image Replacement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the generic Unsplash hero background with custom kaz.webp illustration

**Architecture:** Simple image source replacement in Hero component. Remove external CDN dependency, eliminate srcSet (single optimized WebP), remove horizontal flip transformation. Preserve all existing features: overlay, animations, accessibility, performance optimizations.

**Tech Stack:** React, Vite, WebP image format

---

## Task 1: Verify Image Asset Location

**Files:**
- Verify: `assets/kaz.webp`
- Reference: `site/src/components/Hero.jsx:28-40`

**Step 1: Check image exists and is accessible**

Run:
```bash
ls -lh assets/kaz.webp
```

Expected output:
```
-rw-r--r--  ... 122K ... assets/kaz.webp
```

**Step 2: Verify Vite can serve assets from /assets path**

Check `vite.config.js` or project structure to confirm `/assets/` is a valid public path.

Expected: Vite serves files from root-level `assets/` directory as `/assets/*`

---

## Task 2: Update Hero Component Image Source

**Files:**
- Modify: `site/src/components/Hero.jsx:28-40`

**Step 1: Replace img element with new source**

Find this code (lines 28-40):
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

Replace with:
```jsx
<img
  src="/assets/kaz.webp"
  fetchPriority="high"
  alt={t('hero.imageAlt')}
  className="absolute inset-0 w-full h-full object-cover"
/>
```

**Changes made:**
- ✅ `src` changed to `/assets/kaz.webp`
- ✅ Removed `srcSet` (not needed for single optimized image)
- ✅ Removed `sizes` (not applicable without srcSet)
- ✅ Removed `crossOrigin` (local asset)
- ✅ Removed `referrerPolicy` (local asset)
- ✅ Removed `-scale-x-100` from className (kaz.webp doesn't need horizontal flip)
- ✅ Kept `fetchPriority="high"` (LCP optimization)
- ✅ Kept `alt={t('hero.imageAlt')}` (accessibility)
- ✅ Kept core className structure

**Step 2: Save the file**

Save `site/src/components/Hero.jsx`

---

## Task 3: Manual Visual Testing

**Step 1: Start development server**

Run:
```bash
npm run dev
```

Expected: Server starts on `http://localhost:5173` (or configured port)

**Step 2: Open browser and verify Hero section**

Navigate to: `http://localhost:5173`

**Visual checklist:**
- ✅ kaz.webp image displays as full-screen hero background
- ✅ Image is NOT horizontally flipped
- ✅ Text remains readable over image (overlay working)
- ✅ Image fills entire viewport height
- ✅ No console errors in DevTools
- ✅ Image loads with high priority (check Network tab)

**Step 3: Test responsive behavior**

Use DevTools responsive mode, test:
- Mobile (375px width)
- Tablet (768px width)
- Desktop (1920px width)

Expected: Image scales properly with `object-cover`, no distortion or broken layout

**Step 4: Test dark mode**

Toggle dark mode using site controls.

Expected: Image works in both light and dark themes (overlay ensures text readability)

---

## Task 4: Accessibility Verification

**Files:**
- Verify: `site/src/i18n/locales/en.json`
- Verify: `site/src/i18n/locales/fr.json`

**Step 1: Check translation key exists**

Look for `hero.imageAlt` in both locale files.

Expected: Key exists with descriptive alt text

**Step 2: Update alt text if needed (optional)**

If current alt text doesn't describe the new kaz.webp illustration, update it to describe:
- "Madagascar map illustration with local spices, baobab trees, and France-Madagascar connection"

In `en.json`:
```json
"hero": {
  "imageAlt": "Illustration of Madagascar showing spice trade route connecting France and Madagascar with local flora and fauna"
}
```

In `fr.json`:
```json
"hero": {
  "imageAlt": "Illustration de Madagascar montrant la route des épices reliant la France et Madagascar avec la flore et la faune locales"
}
```

**Step 3: Verify in browser**

Right-click hero image → Inspect → Check `alt` attribute value

Expected: Alt text is descriptive and matches translation

---

## Task 5: Performance Verification

**Step 1: Check Largest Contentful Paint (LCP)**

Open DevTools → Performance tab → Record page load

Expected: Hero image is marked as LCP element with fast load time (<2.5s)

**Step 2: Verify fetchPriority attribute**

Inspect hero `<img>` element in browser.

Expected: `fetchpriority="high"` attribute present

**Step 3: Check Network tab**

Reload page, check Network tab for `/assets/kaz.webp` request.

Expected:
- Status: 200
- Size: ~122KB
- Priority: High
- Loads early in waterfall

---

## Task 6: Commit Changes

**Step 1: Check git status**

Run:
```bash
git status
```

Expected output shows:
```
modified:   site/src/components/Hero.jsx
```

(And possibly modified translation files if alt text was updated)

**Step 2: Stage changes**

Run:
```bash
git add site/src/components/Hero.jsx
```

If translation files were updated:
```bash
git add site/src/i18n/locales/en.json site/src/i18n/locales/fr.json
```

**Step 3: Commit with descriptive message**

Run:
```bash
git commit -m "$(cat <<'EOF'
feat: replace hero background with custom kaz.webp illustration

- Replace Unsplash CDN image with local kaz.webp asset
- Remove srcSet/sizes (single optimized WebP)
- Remove horizontal flip (-scale-x-100)
- Remove crossOrigin/referrerPolicy (local asset)
- Preserve fetchPriority, overlay, animations, accessibility
- Improves load performance with local asset

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

Expected: Commit created successfully

**Step 4: Verify commit**

Run:
```bash
git log -1 --stat
```

Expected: Shows commit with file changes

---

## Success Criteria

All criteria from design doc must pass:

- ✅ Hero displays kaz.webp as full-screen background
- ✅ Image loads quickly with `fetchPriority="high"`
- ✅ Text remains readable over the image (overlay preserved)
- ✅ No horizontal flipping applied
- ✅ Responsive behavior works on all devices
- ✅ No console errors or broken image paths
- ✅ Alt text is descriptive and accessible
- ✅ Performance metrics maintained or improved

---

## Notes

- **No tests required**: This is a visual/markup change, no business logic altered
- **YAGNI applied**: Skipped responsive image variants (single WebP sufficient)
- **DRY preserved**: Reused existing overlay, animations, layout structure
- **Rollback simple**: Git revert restores Unsplash image if needed
