# SpookShirts Project Context

## Project Overview
SpookShirts is a Halloween-themed AI-powered custom t-shirt design platform built for the Kiroween hackathon. The application combines multiple AI technologies to create an immersive, spooky e-commerce experience.

## Core Technologies
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **AI Services**: Stability AI (image generation), Remove.bg (background removal), Miragic (virtual try-on)
- **3D Graphics**: Three.js/OGL for atmospheric effects

## Key Features
1. AI-powered design generation with "Haunted Mode"
2. Dual-side t-shirt customization (front/back)
3. AR virtual try-on using Miragic API
4. Pre-designed haunted apparel collection
5. Smart shopping cart with persistent storage
6. Cinematic UI with horror-themed animations

## Development Guidelines
- Maintain horror/Halloween aesthetic throughout
- Prioritize performance (React.memo, useCallback, lazy loading)
- Keep animations smooth with GPU acceleration
- Ensure responsive design for all screen sizes
- Follow TypeScript best practices
- Use Tailwind utility classes for styling

## API Integration Notes
- Multiple API key rotation system for cost management
- Error handling with fallback mechanisms
- Image optimization before API calls
- Async polling for long-running operations (Miragic)

## File Organization
- Components in `/src/components/`
- Pages in `/src/pages/`
- Animations in `/src/components/animations/`
- Backend services in `/backend/`
- Assets in `/public/assets/`
