# 🚀 Push to GitHub - Step by Step

## Your Repository:
https://github.com/UnknownGod2011/Kiroween-

## Commands to Run:

### 1. Initialize Git (if not already done)
```bash
cd project
git init
```

### 2. Add Remote Repository
```bash
git remote add origin https://github.com/UnknownGod2011/Kiroween-.git
```

### 3. Add All Files
```bash
git add .
```

### 4. Commit Changes
```bash
git commit -m "Initial commit: SpookShirts AI T-Shirt Designer

Features:
- AI-powered t-shirt design generation
- Front/back print system
- AR try-on functionality
- Spooky image transformation
- Shopping cart system
- Haunted theme with animations
- Collection page
- Real-time design preview
"
```

### 5. Push to GitHub
```bash
git push -u origin main
```

If it asks for `master` instead of `main`:
```bash
git branch -M main
git push -u origin main
```

## ⚠️ IMPORTANT: Before Pushing

### Remove Sensitive Data:
The `.gitignore` file I created will prevent `.env` files from being pushed, but make sure to:

1. **Never commit API keys!**
2. Check that `backend/.env` is NOT being tracked:
```bash
git status
```

If you see `.env` files, remove them:
```bash
git rm --cached backend/.env
git rm --cached .env
```

### Create `.env.example` Files:
```bash
# In backend folder
echo "OPENAI_API_KEY=your_openai_key_here
STABILITY_API_KEY=your_stability_key_here
REMOVE_BG_API_KEY=your_removebg_key_here" > backend/.env.example
```

## 🔐 After Pushing:

1. Go to your GitHub repo
2. Add a README with setup instructions
3. Add API key instructions in README
4. Consider using GitHub Secrets for deployment

## 📝 Recommended README Content:

```markdown
# 👻 SpookShirts - AI T-Shirt Designer

Haunted by AI. Forged in darkness.

## Features
- 🎨 AI-powered design generation
- 👕 Front/back print system
- 📱 AR try-on
- 👻 Spooky image transformation
- 🛒 Shopping cart
- 🎃 Haunted theme

## Setup
1. Clone repo
2. Install dependencies: `npm install`
3. Setup backend: `cd backend && npm install`
4. Add API keys to `backend/.env`
5. Run backend: `cd backend && node index.sd.js`
6. Run frontend: `npm run dev`

## API Keys Needed
- OpenAI API Key
- Stability AI API Key
- Remove.bg API Key
```

## 🎯 Quick Commands (Copy & Paste):

```bash
cd project
git init
git remote add origin https://github.com/UnknownGod2011/Kiroween-.git
git add .
git commit -m "Initial commit: SpookShirts AI T-Shirt Designer"
git push -u origin main
```

Done! 🎉
