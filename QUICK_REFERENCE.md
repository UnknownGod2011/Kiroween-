# 🎃 SpookShirts - Quick Reference

## 🚀 Start the App

```bash
cd project
npm run dev
```

Open: `http://localhost:5173`

## 🎬 What You'll See

### 1. Hero Section (First Screen)
- 3D animated pumpkin (left)
- "Summon Your Cursed Costume" title (right)
- "Begin Your Curse" button
- Floating ghosts in background
- Fog overlay

**Action**: Click button or scroll down

### 2. Creator Section (After Scroll)
- "Forge Your Design" title
- Prompt input bar
- Large t-shirt preview (center)
- Color selector (8 preset colors)
- Fabric selector (Cotton/Polyester/Blend)
- Size selector (XS to XXL)
- "Claim Your Cursed Tee" button (when design ready)

### 3. Background Effects (Always Active)
- 8 floating ghosts
- Purple fog particles
- Flying bat (every 10-20 seconds)
- Sound toggle (bottom-right)

## 🎨 Quick Customization

### Change Number of Ghosts
```typescript
// src/components/SpookyBackground.tsx, line 30
const numGhosts = 8; // Change to 4-12
```

### Adjust Fog Intensity
```typescript
// src/components/SpookyBackground.tsx, line 95
ctx.fillStyle = 'rgba(162, 89, 255, 0.02)'; // 0.01-0.05
```

### Modify Pumpkin Flicker Speed
```typescript
// src/components/HeroSection.tsx, line 17
const interval = setInterval(flicker, 100); // 50-200ms
```

### Change Bat Frequency
```typescript
// src/components/FlyingBat.tsx, line 30
const delay = 10000 + Math.random() * 10000; // milliseconds
```

## 🎯 Component Map

```
App.tsx
├── SpookyBackground (ghosts + fog)
├── FlyingBat (random bat)
├── SoundToggle (audio control)
├── HeroSection (first screen)
│   └── 3D Pumpkin SVG
└── Creator Section
    ├── MinimalDesignGenerator (prompt)
    ├── TShirtMockup (preview)
    ├── MinimalColorSelector (colors)
    └── MinimalFabricSelector (material + size)
```

## 🎨 Color Variables

```css
Orange: #ff6b00
Purple: #a259ff
White: #cdd6f4
Black: #000000
Red: #8B0000
```

## 🔧 Common Tasks

### Add New Color
```typescript
// src/components/MinimalColorSelector.tsx
{ name: 'Your Color', value: '#HEXCODE' }
```

### Add New Material
```typescript
// src/components/MinimalFabricSelector.tsx
{ value: 'material', label: 'Name', desc: 'Description' }
```

### Change Hero Text
```typescript
// src/components/HeroSection.tsx, line 45
<h1>Your New Title</h1>
<p>Your new subtitle</p>
```

### Disable Sound Toggle
```typescript
// src/App.tsx, line 29
// Comment out: <SoundToggle />
```

### Disable Flying Bat
```typescript
// src/App.tsx, line 26
// Comment out: <FlyingBat />
```

## 🐛 Troubleshooting

### Ghosts not showing?
- Check browser console
- Reduce ghost count
- Clear cache and reload

### Performance slow?
- Reduce ghosts to 4-5
- Decrease fog particles
- Disable bat on mobile

### Scroll not smooth?
- Check browser support
- Try different browser
- Ensure no conflicting CSS

### Design not generating?
- Check backend is running (port 5000)
- Verify API keys in backend/.env
- Check browser console for errors

## 📱 Mobile Optimization

The app is responsive, but for best mobile experience:
- Bats are hidden (performance)
- Ghost count auto-reduces
- Touch-friendly buttons (44px min)
- Stacked layout on small screens

## 🎃 Testing Checklist

- [ ] Hero section loads
- [ ] Pumpkin animates
- [ ] Ghosts float
- [ ] Scroll to creator works
- [ ] Prompt input works
- [ ] Design generates
- [ ] T-shirt preview shows
- [ ] Colors change shirt
- [ ] Material/size update
- [ ] Bat flies occasionally
- [ ] Sound toggle works
- [ ] Footer displays

## 📚 Full Documentation

- **README.md** - Complete guide
- **QUICKSTART.md** - 3-minute setup
- **CINEMATIC_EXPERIENCE.md** - Technical details
- **TRANSFORMATION_SUMMARY.md** - What changed
- **SPOOKY_PROMPTS.md** - Design ideas

## 🎬 Demo Flow

1. Open app → See hero
2. Click "Begin Your Curse" → Scroll down
3. Type "haunted mansion" → Click Summon
4. Wait 10-20s → Design appears
5. Click color → Shirt changes
6. Select fabric → Updates preview
7. Choose size → Updates badge
8. Watch bat fly → Random timing
9. Toggle sound → Audio plays
10. Click order → (Future: checkout)

---

**Quick reference complete! 👻🎃🦇**
