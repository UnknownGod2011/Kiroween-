# 🚀 Miragic Virtual Try-On - Quick Start Guide

## ✨ What is Miragic?

Miragic is a professional cloud-based virtual try-on API that creates realistic images of people wearing your t-shirt designs. No local setup, no model downloads, no GPU required!

## 🎯 Quick Start (3 Steps)

### Step 1: Start the Backend Server
```bash
cd project
npm run start:sd
```

Wait for:
```
✅ Stable Diffusion backend running on http://localhost:5000
✅ Miragic Virtual Try-On API ready at /api/miragic/tryon
```

### Step 2: Open AR Try-On Page
Navigate to the AR Try-On section in your app

### Step 3: Try It Out!
1. **Upload a person photo** (front-facing, clear background works best)
2. **Select a t-shirt design** from your cart
3. **Choose "Miragic Virtual Try-On"** (it's the default!)
4. **Click "Apply Virtual Try-On"**
5. **Wait 10-30 seconds** for the magic to happen
6. **View and save** your result!

## 📸 Best Practices for Photos

### Person Photo (Human Image)
✅ **DO:**
- Use front-facing photos
- Stand straight with arms at sides
- Good lighting
- Simple, clean background
- Clear view of upper body
- Recommended size: 2048px

❌ **DON'T:**
- Side angles or turned away
- Arms crossed or covering chest
- Dark or cluttered backgrounds
- Blurry or low-quality images

### T-Shirt Design (Cloth Image)
✅ **DO:**
- Use flat, front-facing t-shirt images
- Clear design visibility
- Transparent or white background
- Recommended size: 1024px

❌ **DON'T:**
- Wrinkled or folded shirts
- Angled or perspective views
- Busy backgrounds

## 🔧 Technical Details

### API Endpoints

#### Start Try-On Job
```
POST http://localhost:5000/api/miragic/tryon
Content-Type: application/json

{
  "personImage": "base64_string",
  "clothImage": "base64_string"
}

Response:
{
  "success": true,
  "jobId": "uuid",
  "status": "PENDING"
}
```

#### Check Job Status
```
GET http://localhost:5000/api/miragic/tryon/:jobId

Response (Pending):
{
  "success": true,
  "status": "PENDING"
}

Response (Complete):
{
  "success": true,
  "status": "COMPLETED",
  "processedUrl": "https://..."
}
```

### Processing Flow
1. **Submit** → Images sent to Miragic API
2. **Job Created** → Receive jobId
3. **Processing** → Status: PENDING (10-30 seconds)
4. **Complete** → Status: COMPLETED
5. **Download** → Fetch processedUrl
6. **Display** → Show result to user

## 🎨 Features

✅ **Professional Quality** - State-of-the-art AI results
✅ **Fast Processing** - 10-30 seconds typical
✅ **No Setup** - Cloud-based, works immediately
✅ **Reliable** - Async polling with proper error handling
✅ **User-Friendly** - Clear progress indicators
✅ **Flexible** - Works with front and back designs

## 🐛 Troubleshooting

### "Cannot connect to server"
- Make sure backend is running: `npm run start:sd`
- Check console for errors
- Verify port 5000 is not in use

### "Try-on failed"
- Check image quality (clear, front-facing)
- Try a different photo
- Ensure images are not too large (< 5MB)

### "Processing timeout"
- Network might be slow
- Try again with smaller images
- Check Miragic API status

### "No result image"
- Photo might not be suitable
- Try a clearer, front-facing photo
- Check that t-shirt design is visible

## 📊 Comparison with Other Backends

| Feature | Miragic | Python VITON | DeepFashion |
|---------|---------|--------------|-------------|
| Setup | ✅ None | ⚠️ Python server | ❌ Complex |
| Quality | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Speed | ⚡ 10-30s | ⚡ 5-15s | 🐌 30-60s |
| GPU Required | ❌ No | ⚠️ Optional | ✅ Yes |
| Cost | 💰 API calls | 🆓 Free | 🆓 Free |
| Reliability | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

## 🎉 Why Miragic is Recommended

1. **Zero Setup** - Works immediately, no installation
2. **Professional Results** - Commercial-grade quality
3. **Reliable** - Cloud infrastructure, always available
4. **Easy to Use** - Simple API, clear documentation
5. **Fast** - Optimized processing pipeline
6. **Scalable** - Handles multiple requests

## 🔑 API Key

The API key is already configured in `backend/.env`:
```
MIRAGIC_API_KEY=sk_live_S09r-1230IkIW8D0iq37B1OziRR8GR6_0p4aa8WCZkY
```

**Rate Limit:** 60 requests per minute

## 📝 Example Usage

```javascript
// Frontend code (already implemented in ar-tryon.tsx)
const response = await fetch('http://localhost:5000/api/miragic/tryon', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    personImage: personBase64,
    clothImage: tshirtBase64
  })
});

const { jobId } = await response.json();

// Poll for result
const checkStatus = async () => {
  const statusRes = await fetch(`http://localhost:5000/api/miragic/tryon/${jobId}`);
  const { status, processedUrl } = await statusRes.json();
  
  if (status === 'COMPLETED') {
    // Download and display image
    return processedUrl;
  }
  // Continue polling...
};
```

## 🎊 Success!

You're now ready to create amazing virtual try-on experiences with Miragic! Just start the backend and try it out. 🚀
