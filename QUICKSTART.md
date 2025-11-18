# 🎃 SpookShirts - Quick Start Guide

Get your spooky t-shirt designer running in 3 minutes!

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
cd project
npm install
```

### 2. Start the App
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend on `http://localhost:5173`

### 3. Open in Browser
Navigate to: `http://localhost:5173`

## 👻 First Spooky Design

1. Click on one of the quick spooky prompts (e.g., "🎃 Vintage Halloween pumpkin")
2. Click "Generate" button
3. Wait 10-20 seconds for AI magic
4. Your spooky design appears on the t-shirt!
5. Drag, resize, or rotate the design
6. Change t-shirt color, material, and size
7. See dynamic pricing update automatically

## 🦇 Troubleshooting

### Backend won't start?
- Make sure port 5000 is available
- Check that API keys are in `backend/.env`

### Frontend won't start?
- Make sure port 5173 is available
- Try `npm install` again

### Design generation fails?
- Check your Stability AI API key has credits
- Check your Remove.bg API key is valid
- Look at backend console for error messages

### CORS errors?
- Make sure backend is running on port 5000
- Check that CORS is enabled in backend

## 🕷️ Available Scripts

```bash
# Run both frontend and backend
npm run dev

# Run only backend (Stable Diffusion)
npm run dev:sd

# Run only frontend
npm run dev:frontend

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎃 Tips for Best Results

1. **Be specific in prompts**: "Gothic vampire castle at midnight" > "castle"
2. **Use spooky keywords**: haunted, eerie, creepy, dark, gothic, horror
3. **Mention style**: vintage, minimalist, detailed, cartoon, realistic
4. **Add atmosphere**: moonlit, foggy, shadowy, glowing
5. **Include creatures**: ghosts, zombies, vampires, demons, skeletons

## 🧛 Need Help?

Check the full README.md for detailed documentation!

---

**Happy Haunting! 👻**
