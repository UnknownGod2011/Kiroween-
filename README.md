# 👻 SpookShirts - AI Spooky T-Shirt Designer

A spine-chilling AI-powered t-shirt design web app that generates spooky, horror-themed designs perfect for Halloween and year-round frights!

## 🎃 Features

- **AI-Powered Spooky Design Generation**: Uses Stable Diffusion to create haunting designs
- **Automatic Background Removal**: Clean, transparent designs ready for printing
- **Real-Time Preview**: See your spooky design on a t-shirt mockup instantly
- **Interactive Design Editor**: Drag, resize, and rotate your designs
- **Spooky Quick Prompts**: Pre-made horror-themed suggestions to get started
- **Dynamic Pricing**: Real-time cost calculation based on design complexity
- **Dark Spooky Theme**: Full Halloween-inspired UI with orange and purple accents

## 🦇 Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + shadcn/ui components
- React Router for navigation
- Lucide React icons

### Backend
- Node.js + Express
- Stability AI (Stable Diffusion) for image generation
- Remove.bg API for background removal
- CORS enabled for frontend communication

## 🕷️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Stability AI API key
- Remove.bg API key

### Installation

1. **Clone the repository**
```bash
cd project
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the `backend` folder:
```env
PORT=5000
STABILITY_API_KEY=your_stability_ai_key_here
REMOVE_BG_API_KEY=your_removebg_key_here
```

Get your API keys:
- Stability AI: https://platform.stability.ai/
- Remove.bg: https://www.remove.bg/api

4. **Run the application**

Development mode (both frontend and backend):
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

## 🎃 Spooky Prompt Ideas

Try these spine-chilling prompts:
- "Vintage Halloween pumpkin with glowing eyes"
- "Cute ghost floating in moonlight"
- "Gothic vampire bat silhouette"
- "Sugar skull with floral patterns"
- "Creepy spider web with full moon"
- "Zombie hand reaching from grave"
- "Haunted house on a hill"
- "Witch flying on broomstick"
- "Spooky graveyard at midnight"
- "Demon mask with horns"

## 👹 Usage

1. **Generate a Spooky Design**
   - Enter a horror-themed prompt or click a quick suggestion
   - Click "Generate" and wait for AI magic
   - Design appears with transparent background

2. **Customize Your T-Shirt**
   - Choose t-shirt color using the color wheel
   - Select material (Cotton, Polyester, Blend)
   - Pick your size (XS to XXL)

3. **Edit Design Placement**
   - Drag the design to reposition
   - Resize using corner handles
   - Rotate using the top handle

4. **Check Pricing**
   - Dynamic pricing updates automatically
   - Based on design complexity, material, and size

5. **Order Your Spooky Tee**
   - Click "Order Your Spooky Tee" button
   - (Payment integration coming soon!)

## 🕸️ Project Structure

```
project/
├── backend/
│   ├── designs/          # Generated designs storage
│   ├── index.sd.js       # Stable Diffusion backend
│   ├── index.openai.js   # OpenAI backend (alternative)
│   └── .env              # API keys
├── src/
│   ├── components/
│   │   ├── DesignGenerator.tsx    # AI design generation
│   │   ├── TShirtMockup.tsx       # T-shirt preview
│   │   ├── ControlPanel.tsx       # Main controls
│   │   ├── ColorWheel.tsx         # Color picker
│   │   └── PricingCalculator.tsx  # Dynamic pricing
│   ├── pages/
│   │   ├── collection.tsx         # Spooky collection
│   │   └── cart.tsx               # Shopping cart
│   └── App.tsx                    # Main app
└── package.json
```

## 🌙 API Endpoints

### POST `/generate-design`
Generate a spooky design with background removal

**Request:**
```json
{
  "prompt": "haunted mansion with full moon"
}
```

**Response:**
```json
{
  "message": "Image generated successfully with transparent background",
  "url": "http://localhost:5000/designs/design_1234567890.png"
}
```

## 🦴 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] User accounts and saved designs
- [ ] Print-on-demand fulfillment
- [ ] Order tracking
- [ ] More spooky themes (vampires, zombies, witches)
- [ ] Bulk ordering discounts
- [ ] Social media sharing
- [ ] Design gallery/marketplace

## 🧛 Contributing

Feel free to contribute spooky features! Fork the repo and submit a PR.

## 📜 License

MIT License - Feel free to use for your own spooky projects!

## 🎃 Credits

Built with love for Halloween enthusiasts and horror fans everywhere!

---

**Happy Haunting! 👻🕷️🦇**
