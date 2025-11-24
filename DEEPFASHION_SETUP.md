# 🎯 DeepFashion Try-On Setup Guide

Complete guide to set up the DeepFashion Try-On (ACGPN) backend.

## 📋 What You Have Now

```
project/
├── python-viton/              ✅ Working (no setup needed)
│   └── Port: 8001
│
├── DeepFashion_Try_On/        📥 Downloaded (needs checkpoints)
│   └── ACGPN_inference/
│
└── deepfashion-backend/       🔧 Ready (needs checkpoints)
    └── Port: 8000
```

---

## 🚀 Quick Start (Python VITON - Already Working!)

**No setup needed, works immediately:**

```bash
cd project/python-viton
start-server.bat
```

Then start frontend and use AR Try-On!

---

## 📥 DeepFashion Setup (For Better Quality)

### Step 1: Download Checkpoints

**Google Drive Link:**
https://drive.google.com/file/d/1UWT6esQIU_d4tUm8cjxDKMhB8joQbrFx/view?usp=sharing

**File Size:** ~1.5 GB

### Step 2: Extract Checkpoints

**Extract to this exact location:**
```
project/DeepFashion_Try_On/ACGPN_inference/checkpoints/
```

**Full path on Windows:**
```
C:\Users\Admin\OneDrive\Desktop\Kiroween_AI_Tshirt_Idea\project\DeepFashion_Try_On\ACGPN_inference\checkpoints\
```

### Step 3: Verify Files

After extraction, you should have:
```
project/DeepFashion_Try_On/ACGPN_inference/checkpoints/
├── mtviton.pth (or similar .pth files)
└── other checkpoint files
```

### Step 4: Install Dependencies

```bash
cd project/deepfashion-backend
pip install -r requirements.txt
```

### Step 5: Start Backend

```bash
python main.py
```

Or use:
```bash
start-server.bat
```

### Step 6: Test in Frontend

1. Start backend (above)
2. Start frontend: `npm run dev`
3. Go to AR Try-On page
4. Select "DeepFashion Try-On (CVPR 2020)"
5. Upload photo and design
6. Click "Apply AR Design"

---

## 📊 Backend Comparison

| Feature | Python VITON | DeepFashion Try-On |
|---------|--------------|-------------------|
| **Port** | 8001 | 8000 |
| **Setup** | None | Download checkpoints |
| **Quality** | Good | Photo-realistic |
| **Speed** | Fast (5-10s) | Medium (10-15s) |
| **Size** | Small | ~1.5 GB |
| **Status** | ✅ Working | ⚠️ Needs checkpoints |

---

## 🎯 Download Methods

### Method 1: Browser Download (Easiest)

1. Click link: https://drive.google.com/file/d/1UWT6esQIU_d4tUm8cjxDKMhB8joQbrFx/view?usp=sharing
2. Click "Download" button
3. Wait for download (~1.5 GB)
4. Extract zip file
5. Move contents to `DeepFashion_Try_On/ACGPN_inference/checkpoints/`

### Method 2: Using gdown (Command Line)

```bash
# Install gdown
pip install gdown

# Navigate to checkpoints directory
cd project/DeepFashion_Try_On/ACGPN_inference
mkdir checkpoints
cd checkpoints

# Download
gdown 1UWT6esQIU_d4tUm8cjxDKMhB8joQbrFx

# Extract
# (Use your preferred extraction tool)
```

---

## ✅ Verification Checklist

Before starting the backend:

- [ ] DeepFashion_Try_On repository cloned
- [ ] Checkpoints downloaded (~1.5 GB)
- [ ] Checkpoints extracted to correct location
- [ ] Files exist in `ACGPN_inference/checkpoints/`
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] Python 3.7+ installed
- [ ] PyTorch installed

---

## 🔧 Troubleshooting

### "Checkpoints not found"

**Check:**
```bash
cd project/DeepFashion_Try_On/ACGPN_inference/checkpoints
dir  # Windows
ls   # Linux/Mac
```

You should see `.pth` files.

**Solution:** Re-download and extract to correct location.

### "CUDA out of memory"

**Solution:**
- Close other GPU applications
- Use CPU mode (slower but works)
- Reduce image size

### "Module not found"

**Solution:**
```bash
cd project/deepfashion-backend
pip install -r requirements.txt
```

---

## 🎓 About DeepFashion Try-On

**Paper:** "Towards Photo-Realistic Virtual Try-On by Adaptively Generating↔Preserving Image Content"

**Conference:** CVPR 2020

**Key Features:**
- Photo-realistic results
- Adaptive content generation
- State-of-the-art quality
- Preserves image details

**GitHub:** https://github.com/switchablenorms/DeepFashion_Try_On

**Paper:** https://arxiv.org/abs/2003.05863

**Demo Video:** https://www.youtube.com/watch?v=BbKBSfDBcxI

---

## 📝 Quick Commands

```bash
# Start Python VITON (works now)
cd project/python-viton
start-server.bat

# Start DeepFashion (after checkpoint setup)
cd project/deepfashion-backend
start-server.bat

# Start frontend
cd project
npm run dev
```

---

## 🎯 Recommendation

**For immediate use:** Start with Python VITON (port 8001)
- No setup required
- Works immediately
- Good quality

**For best quality:** Set up DeepFashion (port 8000)
- Download checkpoints (~1.5 GB)
- Photo-realistic results
- State-of-the-art

---

## 📞 Support

**Having issues?**

1. Check checkpoint location
2. Verify file sizes
3. Check Python/PyTorch versions
4. Review error messages
5. Check GitHub issues

---

**Last Updated:** November 24, 2025
