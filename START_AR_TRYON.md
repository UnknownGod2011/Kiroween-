# 🚀 Start AR Try-On - Quick Guide

## Step-by-Step Instructions

### 1. Setup Python Backend (One-Time)

Open Command Prompt and run:

```bash
cd project\python-viton
setup.bat
```

Wait for installation to complete (2-5 minutes).

### 2. Start Python Server

```bash
start-server.bat
```

**Keep this terminal open!** You should see:
```
🚀 Starting Python VITON server...
📍 Server will run on http://localhost:5001
 * Running on http://0.0.0.0:5001
```

### 3. Start Your React App (Separate Terminal)

```bash
cd project
npm run dev
```

### 4. Use AR Try-On

1. Open http://localhost:5175 in browser
2. Go to "AR Try-On" page
3. Upload your photo
4. Select a design from cart
5. Click "Apply Virtual Try-On"
6. Wait 2-5 seconds
7. See the result!

## ✅ Checklist

Before using AR Try-On:

- [ ] Python server is running (terminal shows "Running on...")
- [ ] React app is running (http://localhost:5175)
- [ ] You have designs in your cart
- [ ] You have a photo to upload

## 🎯 Quick Test

Test if Python server is working:

Open browser and go to:
```
http://localhost:5001/health
```

Should show:
```json
{"status":"ok","message":"Python VITON server is running"}
```

## 🔥 That's It!

You now have a fully working virtual try-on system with:
- ✅ No API costs
- ✅ Fast processing (2-5 seconds)
- ✅ Works offline
- ✅ No rate limits
- ✅ Runs locally

## 💡 Pro Tips

- Use front-facing photos for best results
- Good lighting helps
- Simple backgrounds work better
- Keep Python server running while using app
- First request is slower (library loading)

## 🆘 Troubleshooting

**"Cannot connect to Python server"**
- Make sure `start-server.bat` is running
- Check http://localhost:5001/health

**"Python is not recognized"**
- Install Python from https://www.python.org/
- Check "Add Python to PATH" during installation

**Port 5001 already in use**
- Close other applications using port 5001
- Or change port in `app.py`

## 🎉 Enjoy Your AR Try-On!

No more API limitations or costs. Everything runs on your machine!
