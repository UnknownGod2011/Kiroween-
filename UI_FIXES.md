# UI Fixes - Cart Button & Footer

## Issues Fixed

### 1. Hide Button Overlapping Cart Title

**Problem:**
- The "Hide" button was overlapping with the "T" in "Cart" when the cart was empty

**Solution:**
- Added `ml-8` (margin-left: 2rem) to the Hide button
- This shifts the button further to the right, preventing overlap

**File:** `project/src/pages/cart.tsx`

```tsx
// BEFORE:
<button className="px-4 py-2 bg-purple-900/50 ... text-sm">

// AFTER:
<button className="px-4 py-2 bg-purple-900/50 ... text-sm ml-8">
```

### 2. Footer Appearing Then Disappearing on AR Page

**Problem:**
- Footer was using `window.location.pathname` which doesn't work properly with React Router
- This caused the footer to briefly appear on the AR page before disappearing on refresh

**Solution:**
- Imported `useLocation` hook from `react-router-dom`
- Changed condition from `window.location.pathname` to `location.pathname`
- This properly integrates with React Router's navigation system

**File:** `project/src/App.tsx`

**Changes:**
1. Added import:
```tsx
import { Routes, Route, Link, useLocation } from 'react-router-dom';
```

2. Added hook in component:
```tsx
function App() {
  const location = useLocation();
  // ... rest of code
}
```

3. Updated footer condition:
```tsx
// BEFORE:
{window.location.pathname !== '/ar-tryon' && (
  <footer>...</footer>
)}

// AFTER:
{location.pathname !== '/ar-tryon' && (
  <footer>...</footer>
)}
```

## Results

✅ **Hide button** - No longer overlaps with "Cart" text
✅ **Footer** - Hidden from the start on AR page, no flash/flicker
✅ **React Router integration** - Proper use of routing hooks

## Why This Works

**useLocation Hook:**
- Provides reactive access to current route
- Updates immediately on route changes
- No delay or flash during initial render
- Properly integrated with React Router's state management

**Margin Adjustment:**
- `ml-8` adds 32px of left margin
- Creates proper spacing between title and button
- Prevents visual overlap in all states
