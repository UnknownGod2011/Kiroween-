# 🌑 GLOBAL VIGNETTE OVERLAY - COMPLETE

## ✅ Issue Fixed

**Problem:** The dark semi-transparent radial gradient overlay (vignette) from the Hero section only appeared at the top, creating a visible hard edge when scrolling to other sections.

**Solution:** Extracted the exact vignette CSS and applied it globally across the entire page.

---

## 🎨 The Exact Overlay

**Original CSS from Hero section:**
```css
bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)]
```

**What it does:**
- Creates a radial gradient from center
- Starts transparent at center (0%)
- Fades to 80% black at edges (100%)
- Creates a "depth blur vignette" effect
- Darkens the edges while keeping center visible

---

## 🔧 Implementation

### 1. Added Global Overlay in App.tsx

**Location:** Top of main app container, after opening div

**Code:**
```tsx
<div 
  className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)]"
  style={{ zIndex: 1 }}
/>
```

**Properties:**
- `fixed inset-0` - Covers entire viewport, stays in place during scroll
- `pointer-events-none` - Doesn't block clicks or interactions
- `zIndex: 1` - Above background (-5 to 0) but below UI elements (2+)
- Same exact gradient as Hero section

### 2. Removed Duplicate from Hero Section

**Removed this line from CinematicHero.tsx:**
```tsx
<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)]" />
```

**Why:** No longer needed since the global overlay now covers the Hero section too.

---

## 📍 Coverage

The global vignette overlay now appears on:

✅ **Hero Section** (top of homepage)
✅ **Scroll Transition Zone** (between Hero and Forge)
✅ **T-Shirt Portal/Forge Section** (creation area)
✅ **Collection Page** (product grid)
✅ **Cart Page** (shopping cart)
✅ **Spooky Images Page** (image upload)
✅ **All other sections and pages**

---

## 🎯 Z-Index Positioning

**Global Vignette:** `z-index: 1`

**Layering Order:**
```
Background Forest:        z-index: -5
Back Fog:                 z-index: -3
Mid Fog:                  z-index: -1
Ghosts:                   z-index: 0
GLOBAL VIGNETTE:          z-index: 1  ← NEW
UI Content:               z-index: 2+
Front Fog:                z-index: 2
3D Canvas:                z-index: 4
Embers:                   z-index: 5
Popups:                   z-index: 6
Navbar:                   z-index: 50
```

**Result:** 
- Vignette appears above all background elements
- Vignette appears below all interactive UI
- No click blocking
- Seamless visual flow

---

## ✨ Visual Result

**Before:**
- Vignette only on Hero section
- Hard edge visible when scrolling
- Inconsistent darkness across pages
- Jarring transition between sections

**After:**
- Vignette covers entire page globally
- Smooth, consistent darkness everywhere
- No visible seams or edges
- Unified cinematic atmosphere
- Same opacity and blend throughout

---

## 🔍 Technical Details

**Fixed Positioning:**
- Uses `position: fixed` instead of `absolute`
- Stays in viewport during scroll
- Covers entire screen at all times
- No gaps or breaks

**Pointer Events:**
- `pointer-events: none` ensures no interaction blocking
- Users can click through the overlay
- All buttons, links, and inputs work normally

**Blend Mode:**
- Uses default blend mode (same as Hero)
- 80% black opacity at edges
- Transparent at center
- Radial ellipse shape

---

## 📦 Files Modified

1. **`App.tsx`**
   - Added global vignette overlay div
   - Positioned at z-index: 1
   - Fixed positioning with pointer-events: none

2. **`CinematicHero.tsx`**
   - Removed duplicate vignette div
   - Kept all other elements (background, fog, content)
   - No visual change (global overlay replaces it)

---

## 🎃 Result

The exact same dark vignette overlay from the Hero section now extends seamlessly across the entire application. There are no visible edges, seams, or hard transitions. The cinematic atmosphere is unified and consistent throughout all pages and sections.

**The flow is now perfectly smooth! 🌑✨**
