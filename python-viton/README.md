# 🐍 Python VITON Backend

## Quick Setup (Windows)

### 1. Run Setup
```bash
setup.bat
```

This will:
- Check Python installation
- Create virtual environment
- Install all dependencies

### 2. Start Server
```bash
start-server.bat
```

Server will run on `http://localhost:5001`

## Manual Setup (All Platforms)

### 1. Create Virtual Environment
```bash
python -m venv venv
```

### 2. Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Start Server
```bash
python app.py
```

## API Endpoints

### Health Check
```
GET http://localhost:5001/health
```

### Virtual Try-On
```
POST http://localhost:5001/tryon
Content-Type: application/json

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

## Features

- ✅ No ML models required (lightweight)
- ✅ Fast processing (1-2 seconds)
- ✅ Works offline
- ✅ Simple image processing
- ✅ Good quality results

## Troubleshooting

### Python not found
Install Python 3.8+ from https://www.python.org/

### Port 5001 already in use
Change port in `app.py`:
```python
app.run(host='0.0.0.0', port=5002, debug=True)
```

### Dependencies fail to install
Try:
```bash
pip install --upgrade pip
pip install -r requirements.txt --no-cache-dir
```

## Next Steps

Once the server is running, update the frontend to call:
```javascript
const response = await fetch('http://localhost:5001/tryon', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    personImage: personBase64,
    garmentImage: garmentBase64
  })
});
```
