# 🗺️ Haunted Assets Map

## 📍 Where Each Asset Appears

### 🌲 backgroundimg.png
**Location**: `/assets/haunted/backgroundimg.png`
**Used In**: All pages
**Effect**: Fixed parallax background
**Opacity**: 20%
**Description**: Haunted forest scene, creates atmospheric depth

---

### 🌫️ IntroFog.png
**Location**: `/assets/haunted/IntroFog.png`
**Used In**: All pages (back layer)
**Effect**: Slow horizontal drift (60s)
**Opacity**: 30%
**Description**: Main atmospheric fog, slowest moving layer

---

### 👻 fogandSoul.png
**Location**: `/assets/haunted/fogandSoul.png`
**Used In**: 
- All pages (mid fog layer)
- Hero page (soul faces element)
**Effect**: Medium drift (45s) / Pulse (6s)
**Opacity**: 25% (fog) / 3% (souls)
**Description**: Fog with hidden soul faces, adds mystery

---

### 🌊 ghostfog.png
**Location**: `/assets/haunted/ghostfog.png`
**Used In**:
- All pages (front fog layer)
- Hero page (right ghost)
- Create page (behind t-shirt)
- Collection page (behind products)
**Effect**: Fast drift (30s) / Float (15-20s)
**Opacity**: 20% (fog) / 8-10% (ghost)
**Description**: Ethereal ghost with fog effect

---

### 👤 Ghost1.png
**Location**: `/assets/haunted/Ghost1.png`
**Used In**:
- Hero page (left side)
- Collection page (behind grid)
- Cart page (behind cart)
- VampireBat3D (placeholder)
**Effect**: Slow float (20s)
**Opacity**: 6-15%
**Description**: Main ghost silhouette, classic ghost shape

---

### 🧙 dementor1.png
**Location**: `/assets/haunted/dementor1.png`
**Used In**:
- Hero page (far left)
- Create page (top area)
- Collection page (side area)
**Effect**: Screen drift (120s) / Float (10-15s)
**Opacity**: 4-7%
**Description**: Tall hooded figure, adds menace

---

### 💀 skeleton1.png
**Location**: `/assets/haunted/skeleton1.png`
**Used In**:
- Create page (bottom left)
**Effect**: Gentle sway (8s)
**Opacity**: 5%
**Description**: Skeleton silhouette, adds death theme

---

### 🦇 bat.glb
**Location**: `/assets/haunted/vampire-bat/source/bat.glb`
**Used In**: VampireBat3D component (ready for integration)
**Effect**: Animated flight path
**Opacity**: 40%
**Description**: 3D vampire bat model, flies across screen

---

## 🎬 Page Breakdown

### HERO PAGE
```
┌─────────────────────────────────────┐
│  backgroundimg.png (fixed)          │
│  ├─ IntroFog.png (slow drift)       │
│  ├─ fogandSoul.png (medium drift)   │
│  └─ ghostfog.png (fast drift)       │
│                                     │
│  👻 Ghost1.png (left, 15%)          │
│  👻 ghostfog.png (right, 10%)       │
│  🧙 dementor1.png (far left, 5%)    │
│  👁️ fogandSoul.png (souls, 3%)      │
│                                     │
│  🎃 Realistic Pumpkin (center-left) │
│  ✍️ Cinzel Typography (center-right)│
└─────────────────────────────────────┘
```

### CREATE PAGE
```
┌─────────────────────────────────────┐
│  backgroundimg.png (fixed)          │
│  ├─ IntroFog.png (slow drift)       │
│  ├─ fogandSoul.png (medium drift)   │
│  └─ ghostfog.png (fast drift)       │
│                                     │
│  👻 ghostfog.png (behind shirt, 8%) │
│  🧙 dementor1.png (top, 7%)         │
│  💀 skeleton1.png (bottom, 5%)      │
│                                     │
│  ⭕ T-Shirt in Circular Glow        │
│     (1.8× size, neon purple/orange) │
└─────────────────────────────────────┘
```

### COLLECTION PAGE
```
┌─────────────────────────────────────┐
│  backgroundimg.png (fixed)          │
│  ├─ IntroFog.png (slow drift)       │
│  ├─ fogandSoul.png (medium drift)   │
│  └─ ghostfog.png (fast drift)       │
│                                     │
│  👻 Ghost1.png (behind grid, 6%)    │
│  👻 ghostfog.png (behind cards, 5%) │
│  🧙 dementor1.png (side, 4%)        │
│  👻 Ghost1.png (flying, 20%)        │
│                                     │
│  🎴 Product Grid (dark cards)       │
└─────────────────────────────────────┘
```

### CART PAGE
```
┌─────────────────────────────────────┐
│  backgroundimg.png (fixed)          │
│  ├─ IntroFog.png (slow drift)       │
│  ├─ fogandSoul.png (medium drift)   │
│  └─ ghostfog.png (fast drift)       │
│                                     │
│  👻 Ghost1.png (behind cart, 8%)    │
│                                     │
│  🛒 Cart Box (centered)             │
│     (purple glow, foggy vignette)   │
└─────────────────────────────────────┘
```

## 🎨 Layering Order (Z-Index)

```
Layer 10: Navigation (top-right pills)
Layer 9:  Sound toggle, Bat
Layer 8:  Main content (text, buttons, t-shirt)
Layer 7:  Ghosts (floating elements)
Layer 6:  Front fog (ghostfog.png)
Layer 5:  Mid fog (fogandSoul.png)
Layer 4:  Back fog (IntroFog.png)
Layer 3:  Background (backgroundimg.png)
Layer 2:  Vignette overlay
Layer 1:  Pure black base
```

## 🎯 Quick Reference

### Need to change background?
→ Update `backgroundimg.png` path in:
- `HauntedBackground.tsx`
- `CinematicHero.tsx`

### Need to adjust fog?
→ Update fog layer paths in:
- `HauntedBackground.tsx` (IntroFog, fogandSoul, ghostfog)

### Need to move ghosts?
→ Update ghost positions in:
- `HauntedBackground.tsx` (page-specific sections)

### Need to change t-shirt ghost?
→ Update ghostfog path in:
- `EnhancedTShirtMockup.tsx`

### Need to add 3D bat?
→ Integrate bat.glb in:
- `VampireBat3D.tsx` (Three.js loader ready)

## 📊 Asset Usage Summary

| Asset | Pages | Opacity Range | Animation |
|-------|-------|---------------|-----------|
| backgroundimg.png | All | 20% | Fixed |
| IntroFog.png | All | 30% | 60s drift |
| fogandSoul.png | All + Hero | 3-25% | 45s drift / 6s pulse |
| ghostfog.png | All + Hero/Create/Collection | 8-20% | 30s drift / 15-20s float |
| Ghost1.png | Hero/Collection/Cart | 6-15% | 20s float |
| dementor1.png | Hero/Create/Collection | 4-7% | 120s drift / 10-15s float |
| skeleton1.png | Create | 5% | 8s sway |
| bat.glb | All (flying) | 40% | Random 10-15s |

---

**Use this map to quickly locate and modify any haunted asset! 👻🗺️**
