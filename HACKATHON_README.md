# 👻 SpookShirts - Kiroween Hackathon Submission

> **Category**: Costume Contest  
> **Built with**: Kiro AI-Powered IDE  
> **Author**: Tanush Shah (Unknown God)

## 🎃 What is SpookShirts?

SpookShirts is an immersive, horror-themed AI-powered platform for designing custom t-shirts. It combines cutting-edge AI technologies with a hauntingly beautiful user interface to create an unforgettable e-commerce experience.

**Live Demo**: [Your deployed URL here]  
**Demo Video**: [Your 3-minute video URL here]

## ✨ Key Features

### 🎨 AI-Powered Design Generation
- Generate unique designs using Stability AI
- "Haunted Mode" automatically adds spooky elements to any prompt
- Automatic background removal for clean designs
- Real-time preview on t-shirt mockups

### 👕 Advanced Customization
- Design both front and back of t-shirts
- Interactive drag-and-drop design editor
- Full color spectrum with quick presets
- Multiple materials (Cotton, Polyester, Blend)
- Sizes from XS to XXL
- Dynamic pricing based on customization

### 📱 AR Virtual Try-On
- See yourself wearing designs before buying
- Powered by Miragic AI technology
- Real-time processing with progress tracking
- Works with any uploaded photo

### 🎭 Haunting User Interface
- **Cinematic Hero**: Stranger Things-inspired title with 3D effects
- **Atmospheric Animations**: Floating ghosts, fog layers, ember particles
- **Interactive Orb**: Sound and visual effects controller
- **Custom Animations**: Decrypted text, fuzzy glitches, electric borders, glare hovers
- **Smooth Transitions**: GPU-accelerated, 60fps performance
- **Responsive Design**: Perfect on all devices

### 🛒 Smart Shopping Experience
- Persistent cart with localStorage
- Visual snapshots of customized designs
- Pre-designed haunted collection
- Sequential product naming (TEE 1, TEE 2, etc.)

## 🛠️ Tech Stack

**Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion, Three.js  
**Backend**: Node.js, Express  
**AI Services**: Stability AI, Remove.bg, Miragic  
**Additional**: html2canvas, React Router, Lucide Icons

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- API Keys: [Stability AI](https://platform.stability.ai/), [Remove.bg](https://www.remove.bg/api), [Miragic](https://miragic.ai/)

### Installation

```bash
# Navigate to project
cd project

# Install dependencies
npm install

# Configure backend/.env
PORT=5000
STABILITY_API_KEY=your_key_here
REMOVE_BG_API_KEY=your_key_here
MIRAGIC_API_KEY=your_key_here

# Start application
npm run dev

# Open browser
http://localhost:5173
```

## 🎯 How Kiro Was Used

### Primary Method: Vibe Coding

SpookShirts was built entirely through **conversational development** with Kiro. Rather than writing detailed specifications, I described features naturally and let Kiro handle implementation.

### Most Impressive Generations

**1. AR Virtual Try-On System**
- Described: "I want users to see themselves wearing the designs"
- Kiro researched Miragic API, implemented async polling, image optimization, error handling, and UI - all from one conversation

**2. API Key Rotation System**
- Mentioned: "I'm worried about API costs"
- Kiro proactively built multi-key rotation, usage tracking, monitoring scripts, and automatic failover

**3. Cinematic Hero Section**
- Requested: "Make the title feel like Stranger Things opening"
- Kiro generated 3D text effects, flickering animations, particle systems, all optimized for 60fps

**4. Animation Component Library**
- Asked for: "Reusable spooky animations"
- Kiro created DecryptedText, FuzzyText, GlareHover, StarBorder, ElectricBorder - all TypeScript-typed and performant

### Development Metrics
- **Timeline**: 5 days of active development
- **Code Generated**: 8,000+ lines
- **Features**: 15+ major features
- **Iterations**: 50+ completion documents
- **Average Refinements**: 2-3 per feature

### Why Vibe Coding Worked

**Speed**: Production-ready app in days, not weeks  
**Context Awareness**: Kiro remembered the horror theme in every suggestion  
**Iterative Refinement**: Each conversation improved the previous implementation  
**Automatic Documentation**: Generated 50+ markdown files tracking progress  
**Problem Solving**: Described symptoms conversationally, got immediate fixes

See `.kiro/KIRO_USAGE.md` for detailed breakdown.

## 📁 Project Structure

```
project/
├── .kiro/                    # Kiro configuration and documentation
│   ├── KIRO_USAGE.md        # Detailed Kiro usage explanation
│   └── steering/            # Project context and standards
├── backend/
│   ├── index.sd.js          # Stable Diffusion server
│   ├── miragic-tryon.js     # Virtual try-on server
│   └── utils/               # API wrappers and key rotation
├── src/
│   ├── components/
│   │   ├── animations/      # Reusable spooky animations
│   │   ├── CinematicHero.tsx
│   │   ├── MinimalDesignGenerator.tsx
│   │   ├── EnhancedTShirtMockup.tsx
│   │   └── Orb.tsx
│   ├── pages/
│   │   ├── ar-tryon.tsx     # Virtual try-on
│   │   ├── collection.tsx   # Product gallery
│   │   ├── cart.tsx         # Shopping cart
│   │   └── spooky-images.tsx
│   └── context/
│       └── CartContext.tsx  # Global state
└── public/
    ├── assets/              # Images and mockups
    └── haunted-mystery-sound.mp3
```

## 🎨 Design Philosophy

SpookShirts combines horror aesthetics with modern web design principles:
- **Dark Theme**: Deep purples, oranges, and blacks
- **Cinematic**: Film-inspired transitions and typography
- **Interactive**: Responsive to every user action
- **Atmospheric**: Fog, ghosts, and embers create immersion
- **Professional**: Clean code, optimized performance

## 🏆 Hackathon Alignment

### Costume Contest Category
✅ Haunting user interface with polished design  
✅ Spooky elements enhance app functionality  
✅ Unforgettable visual experience  
✅ Professional execution with attention to detail

### Kiro Usage
✅ Extensive vibe coding throughout development  
✅ `.kiro` directory with documentation  
✅ 50+ completion documents showing iteration  
✅ Complex features built through conversation

### Technical Excellence
✅ Production-ready code quality  
✅ Performance optimizations throughout  
✅ Multiple AI integrations  
✅ Responsive and accessible design

## 📊 Feature Highlights

| Feature | Technology | Wow Factor |
|---------|-----------|------------|
| AI Design Generation | Stability AI | ⭐⭐⭐⭐⭐ |
| AR Virtual Try-On | Miragic API | ⭐⭐⭐⭐⭐ |
| Cinematic Hero | Three.js | ⭐⭐⭐⭐⭐ |
| Animation Library | Framer Motion | ⭐⭐⭐⭐ |
| Smart Cart | React Context | ⭐⭐⭐⭐ |
| API Key Rotation | Custom System | ⭐⭐⭐⭐ |

## 🔮 Future Enhancements

- Payment gateway integration (Stripe)
- User authentication and accounts
- Design marketplace
- Social media sharing
- Order tracking
- Mobile app version

## 👤 Contact

**Tanush Shah** (Unknown God)
- Email: unknowngod2024@gmail.com
- GitHub: [@UnknownGod2011](https://github.com/UnknownGod2011)
- Instagram: [@tanushshah_20](https://www.instagram.com/tanushshah_20/)

## 📄 License

MIT License

---

**Built with 💀 and Kiro AI for Kiroween 2024**

*Summon your cursed costume today!*
