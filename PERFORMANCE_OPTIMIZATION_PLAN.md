# 🔥 Performance Optimization Plan

## Critical Issues Identified:

### 1. **Color Slider Lag** 🎨
**Problem:** Recalculating RGB→HSL→RGB on every onChange event
**Solution:** 
- Debounce color updates (16ms for 60fps)
- Memoize color conversion functions
- Use requestAnimationFrame for smooth updates

### 2. **Dragging Lag** 🖱️
**Problem:** Too many state updates during drag
**Solution:**
- Use RAF (requestAnimationFrame) for drag updates
- Batch state updates
- Remove unnecessary re-renders during drag

### 3. **Add-to-Cart Snapshot Lag** 📸
**Problem:** html2canvas is slow with default settings
**Solution:**
- Optimize html2canvas: scale=1 (not 2), reduce quality
- Use willReadFrequently for canvas context
- Cache snapshots when possible

### 4. **Front/Back Switch Delay** 🔄
**Problem:** Re-rendering entire component on switch
**Solution:**
- Memoize t-shirt images
- Use CSS transforms instead of re-mounting
- Prevent unnecessary effect triggers

### 5. **Animation Frame Drops** 🎬
**Problem:** Too many animations running simultaneously
**Solution:**
- Use CSS transforms (GPU accelerated)
- Reduce animation complexity
- Use will-change CSS property strategically

### 6. **Memory Leaks** 💧
**Problem:** Event listeners not cleaned up
**Solution:**
- Proper cleanup in useEffect
- Remove global event listeners
- Clear intervals/timeouts

## Optimization Strategy:

✅ **Zero UI Changes** - All optimizations are internal
✅ **Zero Feature Changes** - All functionality preserved
✅ **Significant Performance Gains** - Target 60fps everywhere

## Files to Optimize:
1. `App.tsx` - Color slider debouncing
2. `EnhancedTShirtMockup.tsx` - Drag optimization, memoization
3. `MinimalDesignGenerator.tsx` - Reduce re-renders
4. `FloatingEmbers.tsx` - Optimize animations
5. `VampireBat3D.tsx` - Reduce animation overhead

## Implementation Order:
1. Color slider (highest impact)
2. Dragging (second highest)
3. Add-to-cart snapshot
4. Front/back switching
5. Animation optimizations
6. Memory leak fixes
