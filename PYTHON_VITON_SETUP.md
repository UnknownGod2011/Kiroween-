# 🐍 Python VITON Setup Guide

## ✅ What We've Built

A **Python-based virtual try-on backend** that:
- Runs locally (no API costs)
- Processes images in 2-5 seconds
- Uses OpenCV and image processing
- No complex ML models needed (lightweight version)
- Works offline

## 🚀 Quick Start (Windows)

### Step 1: Install Python
1. Download Python 3.8+ from https://www.python.org/
2. During installation, **CHECK "Add Python to PATH"**
3. Verify installation:
   ```bash
   python --version
   ```

### Step 2: Setup Python Environment
```bash
cd project/python-viton
setup.bat
```

This will:
- Create virtual environment
- Install all dependencies (Flask, OpenCV, NumPy, etc.)
- Take 2-5 minutes

### Step 3: Start Python Server
```bash
start-server.bat
```

You should see:
```
🚀 Starting Python VITON server...
📍 Server will run on http://localhost:5001
 * Running on http://0.0.0.0:5001
```

### Step 4: Keep Server Running
Leave this terminal open while using the app!

### Step 5: Use AR Try-On
1. Go to your React app (http://localhost:5175)
2. Navigate to AR Try-On page
3. Upload photo and select design
4. Click "Apply Virtual Try-On"
5. Wait 2-5 seconds for result

## 🐧 Mac/Linux Setup

### Step 1: Create Virtual Environment
```bash
cd project/python-viton
python3 -m venv venv
```

### Step 2: Activate Environment
```bash
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Start Server
```bash
python app.py
```

## 🔧 Troubleshooting

### "Python is not recognized"
- Python not installed or not in PATH
- Reinstall Python and check "Add to PATH"

### "pip is not recognized"
```bash
python -m ensurepip --upgrade
```

### Port 5001 already in use
Edit `app.py` line 115:
```python
app.run(host='0.0.0.0', port=5002, debug=True)
```

Then update frontend to use port 5002.

### Dependencies fail to install
```bash
pip install --upgrade pip
pip install -r requirements.txt --no-cache-dir
```

### "Cannot connect to Python server"
- Make sure `start-server.bat` is running
- Check http://localhost:5001/health in browser
- Should return: `{"status":"ok"}`

### Slow processing
- First run is slower (loading libraries)
- Subsequent runs are faster (2-3 seconds)
- Large images take longer

## 📊 How It Works

### Backend (Python)
1. Receives person photo + garment image (Base64)
2. Decodes to PIL Images
3. Resizes garment to fit chest area
4. Applies alpha blending
5. Adds shadows and highlights
6. Returns result as Base64

### Frontend (React)
1. User uploads photo
2. Selects design from cart
3. Sends both to Python backend
4. Displays result

## 🎯 API Endpoints

### Health Check
```
GET http://localhost:5001/health

Response:
{
  "status": "ok",
  "message": "Python VITON server is running"
}
```

### Virtual Try-On
```
POST http://localhost:5001/tryon
Content-Type: application/json

Body:
{
  "personImage": "base64_string",
  "garmentImage": "base64_string"
}

Response:
{
  "success": true,
  "resultImage": "base64_string"
}
```

## 📦 Dependencies

- **Flask** - Web server
- **Flask-CORS** - Cross-origin requests
- **OpenCV** - Image processing
- **NumPy** - Array operations
- **Pillow** - Image handling
- **PyTorch** (optional) - For ML models

## 🔄 Upgrading to ML Models (Future)

Current version uses simple image processing. To upgrade:

1. Download VITON model weights
2. Update `app.py` to load models
3. Replace `simple_virtual_tryon()` with ML inference
4. Expect better results but slower processing

## ✅ Checklist

- [ ] Python 3.8+ installed
- [ ] Virtual environment created
- [ ] Dependencies installed
- [ ] Server starts without errors
- [ ] Health endpoint returns OK
- [ ] Frontend connects successfully
- [ ] Try-on produces results

## 🎉 Success!

Once setup is complete:
1. Keep Python server running
2. Use AR Try-On page normally
3. Results appear in 2-5 seconds
4. No API costs or limits!

## 💡 Tips

- Keep terminal open while using app
- First request is slower (library loading)
- Use good quality photos for best results
- Front-facing photos work best
- Simple backgrounds recommended

## 🆘 Need Help?

Check the logs in the Python terminal for error messages. Most issues are:
1. Python not installed
2. Dependencies not installed
3. Port already in use
4. Server not running
