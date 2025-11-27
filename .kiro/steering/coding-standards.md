# Coding Standards for SpookShirts

## React Component Structure
```typescript
// Use functional components with TypeScript
interface ComponentProps {
  // Define all props with types
}

export const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Hooks at the top
  // Event handlers
  // Render logic
  return (/* JSX */);
};
```

## Performance Optimization
- Wrap expensive components with `React.memo()`
- Use `useCallback` for event handlers passed as props
- Use `useMemo` for expensive calculations
- Implement lazy loading for routes and heavy components
- Optimize images before rendering

## Styling Conventions
- Use Tailwind utility classes as primary styling method
- Create custom CSS only for complex animations
- Follow dark theme color palette: purple-900, orange-500, black
- Ensure all interactive elements have hover states
- Add smooth transitions: `transition-all duration-300`

## API Integration
- Always handle errors gracefully with try-catch
- Show loading states during async operations
- Implement timeout mechanisms for long requests
- Use environment variables for API keys
- Never expose API keys in frontend code

## State Management
- Use Context API for global state (CartContext)
- Use localStorage for persistence
- Keep component state local when possible
- Avoid prop drilling with context

## Animation Guidelines
- Use Framer Motion for React animations
- Keep animations under 500ms for responsiveness
- Use `will-change` CSS property sparingly
- Prefer CSS transforms over position changes
- Test animations on lower-end devices
