# 📥 DeepFashion Checkpoint Download Guide

## 🎯 Quick Download

**Direct Link:** https://drive.google.com/file/d/1UWT6esQIU_d4tUm8cjxDKMhB8joQbrFx/view?usp=sharing

**File Size:** ~1.5 GB

**Time:** 5-15 minutes (depending on internet speed)

---

## 📍 Where to Put the Checkpoints

### Visual Guide

```
Your Computer
│
└── Desktop/
    └── Kiroween_AI_Tshirt_Idea/
        └── project/
            └── DeepFashion_Try_On/
                └── ACGPN_inference/
                    └── checkpoints/        ← CREATE THIS FOLDER
                        ├── mtviton.pth     ← PUT FILES HERE
                        └── other .pth files
```

### Exact Path (Windows)

```
C:\Users\Admin\OneDrive\Desktop\Kiroween_AI_Tshirt_Idea\project\DeepFashion_Try_On\ACGPN_inference\checkpoints\
```

---

## 🚀 Step-by-Step Instructions

### Step 1: Create Checkpoints Folder

**Option A: Using File Explorer**
1. Open File Explorer
2. Navigate to: `project\DeepFashion_Try_On\ACGPN_inference\`
3. Right-click → New → Folder
4. Name it: `checkpoints`

**Option B: Using Command Line**
```bash
cd project\DeepFashion_Try_On\ACGPN_inference
mkdir checkpoints
```

### Step 2: Download from Google Drive

1. **Click the link:** https://drive.google.com/file/d/1UWT6esQIU_d4tUm8cjxDKMhB8joQbrFx/view?usp=sharing

2. **You'll see a Google Drive page** with the file

3. **Click the Download button** (top right)

4. **If you see "Can't scan for viruses"** warning:
   - Click "Download anyway"
   - This is normal for large files

5. **Wait for download** (~1.5 GB)
   - Check your Downloads folder
   - File will be named something like `checkpoints.zip` or similar

### Step 3: Extract the Files

**Option A: Using Windows Built-in**
1. Go to your Downloads folder
2. Right-click the downloaded zip file
3. Select "Extract All..."
4. Choose destination: `project\DeepFashion_Try_On\ACGPN_inference\checkpoints\`
5. Click "Extract"

**Option B: Using 7-Zip or WinRAR**
1. Right-click the zip file
2. Select "Extract to..."
3. Navigate to: `project\DeepFashion_Try_On\ACGPN_inference\checkpoints\`
4. Click OK

### Step 4: Verify Files

**Check the folder:**
```bash
cd project\DeepFashion_Try_On\ACGPN_inference\checkpoints
dir
```

**You should see:**
- `.pth` files (PyTorch model files)
- Total size: ~1.5 GB
- Multiple checkpoint files

---

## ✅ Verification Checklist

After download and extraction:

- [ ] Folder exists: `DeepFashion_Try_On/ACGPN_inference/checkpoints/`
- [ ] Folder contains `.pth` files
- [ ] Total size is around 1.5 GB
- [ ] Files are not corrupted (can open properties)
- [ ] No error messages during extraction

---

## 🔧 Alternative Download Methods

### Method 1: Using gdown (Command Line)

```bash
# Install gdown
pip install gdown

# Navigate to directory
cd project\DeepFashion_Try_On\ACGPN_inference
mkdir checkpoints
cd checkpoints

# Download
gdown 1UWT6esQIU_d4tUm8cjxDKMhB8joQbrFx

# Extract (if it's a zip)
# Use your extraction tool
```

### Method 2: Using wget (Git Bash)

```bash
cd project/DeepFashion_Try_On/ACGPN_inference/checkpoints
wget --no-check-certificate 'https://drive.google.com/uc?export=download&id=1UWT6esQIU_d4tUm8cjxDKMhB8joQbrFx' -O checkpoints.zip
unzip checkpoints.zip
```

---

## 🚨 Common Issues

### Issue 1: "Can't find the folder"

**Solution:**
```bash
# Make sure you're in the right place
cd project
cd DeepFashion_Try_On
cd ACGPN_inference
mkdir checkpoints
```

### Issue 2: "Download is very slow"

**Solutions:**
- Use a download manager (IDM, Free Download Manager)
- Try during off-peak hours
- Check your internet connection
- Use gdown method instead

### Issue 3: "File is corrupted"

**Solutions:**
- Re-download the file
- Check file size (should be ~1.5 GB)
- Try different browser
- Disable antivirus temporarily

### Issue 4: "Not enough space"

**Solutions:**
- Free up at least 2 GB of space
- Download to different drive
- Clean up temporary files

---

## 📊 File Size Reference

| Item | Size |
|------|------|
| Download | ~1.5 GB |
| Extracted | ~1.5 GB |
| Total needed | ~3 GB (during extraction) |
| Final | ~1.5 GB (after cleanup) |

---

## 🎯 After Download

### Test the Backend

```bash
cd project\deepfashion-backend
python main.py
```

**Look for:**
```
✅ DeepFashion Try-On ready on cuda
```

or

```
✅ DeepFashion Try-On ready on cpu
```

### Use in Frontend

1. Start backend (above)
2. Start frontend: `npm run dev`
3. Go to AR Try-On page
4. Select "DeepFashion Try-On (CVPR 2020)"
5. Upload photo and design
6. Click "Apply AR Design"
7. Wait for photo-realistic result!

---

## 💡 Pro Tips

### Tip 1: Download During Off-Peak Hours
- Faster download speeds
- Less likely to fail

### Tip 2: Use Download Manager
- Resume capability
- Faster speeds
- Better reliability

### Tip 3: Verify File Integrity
- Check file size matches
- Try opening with 7-Zip to verify
- Compare checksums if provided

### Tip 4: Keep Original Zip
- Don't delete until verified working
- Easier to re-extract if needed
- Backup for future use

---

## 🔄 What If Download Fails?

### Retry Steps:
1. Clear browser cache
2. Try different browser
3. Use incognito/private mode
4. Try gdown method
5. Check Google Drive status
6. Try again later

### Alternative Sources:
- Check GitHub issues for mirrors
- Ask in repository discussions
- Check paper's project page
- Contact authors if necessary

---

## 📞 Need Help?

**If download fails:**
1. Check internet connection
2. Verify Google Drive link is active
3. Try alternative download methods
4. Check GitHub issues for help

**If extraction fails:**
1. Re-download the file
2. Try different extraction tool
3. Check available disk space
4. Verify file isn't corrupted

---

## ✅ Success Indicators

You'll know it worked when:

1. ✅ Checkpoints folder exists
2. ✅ Contains `.pth` files
3. ✅ Total size ~1.5 GB
4. ✅ Backend starts without errors
5. ✅ You see "Models loaded successfully"
6. ✅ Virtual try-on produces results

---

## 🎉 After Successful Setup

You'll have:
- ✅ Photo-realistic virtual try-on
- ✅ CVPR 2020 state-of-the-art quality
- ✅ Professional-grade results
- ✅ Best-in-class try-on system

---

**Remember:** Python VITON works RIGHT NOW without any downloads!

Only download DeepFashion checkpoints if you want the absolute best quality.

---

**Last Updated:** November 24, 2025
