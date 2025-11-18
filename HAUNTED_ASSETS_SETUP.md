# 👻 Haunted Assets Setup Guide

## 📁 Required Asset Structure

Create the following folder structure in your `public` directory:

```
public/
└── assets/
    └── haunted/
        ├── backgrounds/
        │   └── haunted_forest_4k.png
        ├── fog/
        │   ├── back.png
        │   ├── mid.png
        │   └── front.png
        ├── ghosts/
        │   ├── Ghost1.png
        │   ├── ghostfog.png
        │   ├── soul-face.png
        │   └── shadow-ghost.png
        ├── dementors/
        │   └── dementor1.png
        ├── skeletons/
        │   └── skeleton1.png
        ├── sprites/
        │   └── bat.png
        └── models/
            └── vampire-bat.glb (optional 3D model)
```

## 🎨 Asset Requirements

### Backgrounds
- **haunted_forest_4k.png**: 4K resolution (3840×2160), dark forest scene
- Used as fixed background across all pages
- Opacity: 20%

### Fog Layers
- **back.png**: Slowest moving fog (60s animation)
- **mid.png**: Medium speed fog (45s animation)
- **front.png**: Fastest fog (30s animation)
- All should be semi-transparent PNG with fog/mist
- Recommended size: 1920×1080 or larger

### Ghosts
- **Ghost1.png**: Main ghost silhouette
- **ghostfog.png**: Ethereal ghost with fog effect
- **soul-face.png**: Faint face in mist
- **shadow-ghost.png**: Dark ghost silhouette
- All should be transparent PNG
- Recommended size: 512×768 or similar

### Dementors
- **dementor1.png**: Tall, dark, hooded figure
- Transparent PNG
- Recommended size: 384×1024

### Skeletons
- **skeleton1.png**: Skeleton silhouette
- Transparent PNG
- Recommended size: 320×640

### Sprites
- **bat.png**: Vampire bat sprite
- Transparent PNG
- Recommended size: 128×128

### 3D Models (Optional)
- **vampire-bat.glb**: 3D bat model for Three.js
- GLB format
- Animated if possible

## 🎬 Where Assets Are Used

### Hero Page
- **Background**: haunted_forest_4k.png (fixed)
- **Fog**: All 3 layers (back, mid, front)
- **Ghosts**: Ghost1.png (left), ghostfog.png (right)
- **Dementor**: dementor1.png (far left, very faint)
- **Soul Face**: soul-face.png (hidden in fog)
- **Bat**: vampire-bat.glb or bat.png sprite

### Create (T-Shirt) Page
- **Background**: haunted_forest_4k.png
- **Fog**: All 3 layers
- **Ghost**: ghostfog.png (behind t-shirt, 8% opacity)
- **Dementor**: dementor1.png (top area, 7% opacity)
- **Skeleton**: skeleton1.png (bottom left, 5% opacity)

### Collection Page
- **Background**: haunted_forest_4k.png
- **Fog**: All 3 layers
- **Ghosts**: Ghost1.png, ghostfog.png, shadow-ghost.png (behind grid)
- **Bat**: bat.png (flying above products)

### Cart Page
- **Background**: haunted_forest_4k.png
- **Fog**: All 3 layers
- **Ghost**: Ghost1.png (behind cart, 8% opacity)

## 🎯 Opacity Levels

```css
/* Backgrounds */
haunted_forest_4k.png: 20%

/* Fog Layers */
back.png: 30%
mid.png: 40%
front.png: 25%

/* Ghosts */
Hero - Ghost1: 15%
Hero - ghostfog: 10%
Hero - soul-face: 3%
Create - ghostfog: 8%
Collection - ghosts: 4-6%
Cart - Ghost1: 8%

/* Dementors */
Hero: 5%
Create: 7%

/* Skeletons */
Create: 5%
```

## 🎨 Animation Speeds

```css
/* Fog Drift */
back.png: 60s (slowest)
mid.png: 45s (medium)
front.png: 30s (fastest)

/* Ghost Float */
slow: 20s
medium: 15s
fast: 10s

/* Dementor Drift */
120s (very slow, crosses entire screen)

/* Skeleton Sway */
8s (gentle rocking)

/* Bat Flight */
20s (collection page)
Random 10-15s intervals (hero page)
```

## 🚀 Quick Setup

### Step 1: Create Folders
```bash
mkdir -p public/assets/haunted/{backgrounds,fog,ghosts,dementors,skeletons,sprites,models}
```

### Step 2: Add Your Assets
Place your PNG/GLB files in the appropriate folders

### Step 3: Verify Paths
Check that files are accessible at:
- `http://localhost:5173/assets/haunted/backgrounds/haunted_forest_4k.png`
- `http://localhost:5173/assets/haunted/fog/back.png`
- etc.

### Step 4: Run the App
```bash
npm run dev
```

## 🎭 Fallback Behavior

If assets are not found:
- Background: Pure black (#000000)
- Fog: Canvas-based volumetric fog (already implemented)
- Ghosts: Transparent gradients (already implemented)
- Bat: 2D sprite animation (already implemented)

The app will work without assets but will look better with them!

## 📊 Performance Tips

### Optimize Images
```bash
# Use tools like:
- TinyPNG for PNG compression
- ImageOptim for batch optimization
- WebP format for better compression
```

### Recommended Sizes
- Backgrounds: 4K (3840×2160) or 2K (2560×1440)
- Fog: 1920×1080
- Ghosts: 512×768
- Sprites: 128×128

### File Sizes
- Keep each PNG under 500KB
- Total assets under 5MB
- Use progressive/interlaced PNG

## 🎃 Asset Sources

### Where to Find Assets
1. **Free Resources**:
   - Unsplash (backgrounds)
   - Pexels (textures)
   - OpenGameArt (sprites)
   - Sketchfab (3D models)

2. **Paid Resources**:
   - Envato Elements
   - Adobe Stock
   - Unity Asset Store
   - Unreal Marketplace

3. **AI Generation**:
   - Midjourney
   - Stable Diffusion
   - DALL-E

### Creating Your Own
- Use Photoshop/GIMP for PNG editing
- Blender for 3D models
- After Effects for animated sprites

## ✅ Checklist

- [ ] Create folder structure
- [ ] Add haunted_forest_4k.png
- [ ] Add 3 fog layers (back, mid, front)
- [ ] Add 4 ghost images
- [ ] Add dementor1.png
- [ ] Add skeleton1.png
- [ ] Add bat.png sprite
- [ ] (Optional) Add vampire-bat.glb
- [ ] Test all pages
- [ ] Verify opacity levels
- [ ] Check animation speeds
- [ ] Optimize file sizes

---

**Once assets are in place, your site will be fully haunted! 👻🎃🦇**
