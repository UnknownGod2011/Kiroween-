# 👻 SpookShirts - AI-Powered Custom T-Shirt Designer

An immersive, horror-themed AI-powered web application for designing and customizing t-shirts with haunted aesthetics. Built with cutting-edge web technologies and AI integration.

## ✨ Features

### 🎨 AI Design Generation
- **Stable Diffusion Integration**: Generate unique, spooky designs using AI
- **Haunted Mode Toggle**: Automatically add horror elements to any prompt
- **Real-time Preview**: Instant visualization on t-shirt mockups
- **Background Removal**: Automatic transparent background processing

### 👕 Advanced T-Shirt Customization
- **Dual-Side Printing**: Design both front and back of t-shirts
- **Interactive Design Editor**: Drag, resize, and rotate designs with precision
- **Color Customization**: Full spectrum color picker with quick presets
- **Material Selection**: Cotton, Polyester, and Blend options
- **Size Range**: XS to XXL with accurate scaling
- **Dynamic Pricing**: Real-time cost calculation based on complexity

### 📱 AR Virtual Try-On
- **Miragic API Integration**: Cloud-based virtual try-on technology
- **Real-time Processing**: See yourself wearing designs instantly
- **Multiple Backend Support**: Extensible architecture for various AI models
- **Image Optimization**: Automatic compression for faster processing

### 🛒 Shopping Experience
- **Smart Cart System**: Persistent storage with snapshots
- **Pre-designed Collection**: Curated haunted apparel collection
- **Sequential Naming**: Auto-generated product names (TEE 1, TEE 2, etc.)
- **Visual Previews**: High-quality product images with both sides

### 🎭 Immersive UI/UX
- **Cinematic Hero Section**: Stranger Things-inspired title with 3D effects
- **Haunted Animations**: Floating ghosts, fog layers, and embers
- **Interactive Orb**: Sound and visual effects controller
- **Smooth Transitions**: GPU-accelerated animations
- **Responsive Design**: Optimized for all screen sizes

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality component library
- **Framer Motion** - Advanced animations
- **Three.js / OGL** - 3D graphics and effects
- **React Router** - Client-side routing

### Backend
- **Node.js** with Express
- **Stability AI API** - Image generation
- **Remove.bg API** - Background removal
- **Miragic API** - Virtual try-on
- **CORS** - Cross-origin resource sharing

### Additional Libraries
- **html2canvas** - Screenshot generation
- **Lucide React** - Icon system
- **React Hook Form** - Form management
- **Zod** - Schema validation

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- API Keys:
  - [Stability AI](https://platform.stability.ai/)
  - [Remove.bg](https://www.remove.bg/api)
  - [Miragic](https://miragic.ai/) (optional)

### Installation

1. **Navigate to project directory**
```bash
cd project
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create `.env` file in the `backend` folder:
```env
PORT=5000
STABILITY_API_KEY=your_stability_ai_key_here
REMOVE_BG_API_KEY=your_removebg_key_here
MIRAGIC_API_KEY=your_miragic_key_here
```

4. **Start the application**

Development mode (runs both frontend and backend):
```bash
npm run dev
```

Or run separately:
```bash
# Terminal 1 - Backend
npm run dev:sd

# Terminal 2 - Frontend  
npm run dev:frontend
```

5. **Open in browser**
```
http://localhost:5173
```

## 📁 Project Structure

```
project/
├── backend/
│   ├── designs/              # Generated AI designs
│   ├── index.sd.js           # Stable Diffusion server
│   ├── miragic-tryon.js      # Virtual try-on server
│   └── .env                  # API keys (not in repo)
├── src/
│   ├── components/
│   │   ├── animations/       # Reusable animation components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── CinematicHero.tsx
│   │   ├── MinimalDesignGenerator.tsx
│   │   ├── EnhancedTShirtMockup.tsx
│   │   ├── HauntedLayerSystem.tsx
│   │   └── Orb.tsx
│   ├── pages/
│   │   ├── ar-tryon.tsx      # Virtual try-on page
│   │   ├── collection.tsx    # Product gallery
│   │   ├── cart.tsx          # Shopping cart
│   │   └── spooky-images.tsx # Image generation
│   ├── context/
│   │   └── CartContext.tsx   # Global cart state
│   ├── utils/
│   │   ├── cartStorage.ts    # LocalStorage management
│   │   └── pricingCalculator.ts
│   └── App.tsx               # Main application
├── public/
│   ├── assets/               # Images and assets
│   ├── mockups/              # T-shirt templates
│   └── haunted-mystery-sound.mp3
└── package.json
```

## 🎮 Usage Guide

### Creating a Custom Design

1. **Enter a Prompt**: Describe your design idea
2. **Toggle Haunted Mode**: Add spooky elements automatically
3. **Generate**: Wait for AI to create your design
4. **Customize T-Shirt**:
   - Select front or back print
   - Choose color, material, and size
   - Drag and position the design
   - Rotate and scale as needed
5. **Add to Cart**: Save your creation

### Using AR Try-On

1. **Upload Photo**: Take or select a clear, front-facing photo
2. **Select Design**: Choose from your cart items
3. **Pick Side**: Front or back print
4. **Apply**: Wait for AI processing (10-30 seconds)
5. **Save Result**: Download your virtual try-on image

### Shopping Collection

1. **Browse Products**: View pre-designed haunted apparel
2. **Add to Cart**: Click to add items instantly
3. **View Cart**: Review all selected items
4. **Checkout**: (Payment integration coming soon)

## ⚡ Performance Optimizations

- **React.memo**: Prevents unnecessary re-renders
- **useCallback**: Memoizes event handlers
- **useMemo**: Caches expensive computations
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Compressed and resized assets
- **GPU Acceleration**: CSS transforms for smooth animations
- **Code Splitting**: Vite's automatic chunking
- **Tree Shaking**: Removes unused code

## 🎨 Design Philosophy

SpookShirts combines horror aesthetics with modern web design:
- **Dark Theme**: Deep purples, oranges, and blacks
- **Cinematic Effects**: Film-inspired transitions and typography
- **Interactive Elements**: Responsive to user actions
- **Atmospheric**: Fog, ghosts, and embers create immersion
- **Professional**: Clean code and optimized performance

## 🔮 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] User authentication and accounts
- [ ] Design gallery and marketplace
- [ ] Social media sharing
- [ ] Order tracking system
- [ ] Bulk ordering discounts
- [ ] More AI model options
- [ ] Mobile app version

## 📄 License

MIT License - Free to use for personal and commercial projects

## 👤 Author

**Tanush Shah** (aka Unknown God)

- Email: unknowngod2024@gmail.com
- GitHub: [@UnknownGod2011](https://github.com/UnknownGod2011)
- Instagram: [@tanushshah_20](https://www.instagram.com/tanushshah_20/)

## 🙏 Acknowledgments

- Stability AI for image generation
- Remove.bg for background removal
- Miragic for virtual try-on technology
- shadcn for beautiful UI components
- The React and Vite communities

---

**Built with 💀 by Tanush Shah**

*Summon your cursed costume today!*
