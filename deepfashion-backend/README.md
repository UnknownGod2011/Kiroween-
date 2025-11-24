# DeepFashion Try-On Backend

FastAPI backend for **DeepFashion Try-On (ACGPN)** - CVPR 2020 paper implementation.

## 📄 Paper

**"Towards Photo-Realistic Virtual Try-On by Adaptively Generating↔Preserving Image Content"**
- CVPR 2020
- State-of-the-art photo-realistic virtual try-on
- GitHub: https://github.com/switchablenorms/DeepFashion_Try_On

## 🚀 Quick Start

### Step 1: Download Checkpoints

**Required:** Download pretrained model checkpoints

**Download Link:** https://drive.google.com/file/d/1UWT6esQIU_d4tUm8cjxDKMhB8joQbrFx/view?usp=sharing

**Extract to:**
```
project/DeepFashion_Try_On/ACGPN_inference/checkpoints/
```

The checkpoints folder should contain:
- `mtviton.pth` (or similar model files)
- Other necessary checkpoint files

### Step 2: Install Dependencies

```bash
cd project/deepfashion-backend
pip install -r requirements.txt
```

### Step 3: Start Server

```bash
python main.py
```

Or use the batch file:
```bash
start-server.bat
```

Server will run on `http://localhost:8000`

## 📊 Features

- ✅ Photo-realistic virtual try-on
- ✅ CVPR 2020 state-of-the-art method
- ✅ Adaptive content generation and preservation
- ✅ High-quality results

## 🔧 API Endpoints

### GET /
Health check and status

### POST /api/tryon
Virtual try-on endpoint

**Request:**
- `person_image`: Image file of person
- `cloth_image`: Image file of clothing

**Response:**
```json
{
  "success": true,
  "resultImage": "base64_encoded_image",
  "message": "Success"
}
```

## 📁 Project Structure

```
project/
├── DeepFashion_Try_On/              ← GitHub repository
│   └── ACGPN_inference/
│       ├── checkpoints/             ← PUT CHECKPOINTS HERE
│       ├── test.py
│       └── ...
│
└── deepfashion-backend/             ← This backend
    ├── main.py
    ├── requirements.txt
    └── start-server.bat
```

## 📥 Checkpoint Download Instructions

### Method 1: Direct Download

1. Go to: https://drive.google.com/file/d/1UWT6esQIU_d4tUm8cjxDKMhB8joQbrFx/view?usp=sharing
2. Click "Download"
3. Extract the zip file
4. Move contents to `project/DeepFashion_Try_On/ACGPN_inference/checkpoints/`

### Method 2: Using gdown

```bash
pip install gdown
cd project/DeepFashion_Try_On/ACGPN_inference
mkdir checkpoints
cd checkpoints
gdown 1UWT6esQIU_d4tUm8cjxDKMhB8joQbrFx
unzip *.zip
```

## 🎯 Expected Results

With proper checkpoints:
- **Quality:** Photo-realistic, state-of-the-art
- **Speed:** ~10-15 seconds per image (GPU)
- **Resolution:** 192x256 (VITON dataset standard)

## ⚠️ Requirements

### Hardware
- **GPU:** NVIDIA GPU with CUDA (recommended)
- **VRAM:** At least 4 GB
- **RAM:** At least 8 GB

### Software
- Python 3.7+
- PyTorch with CUDA support
- CUDA 11.0+ (for GPU)

## 🔧 Troubleshooting

### "Checkpoints not found"

**Solution:**
1. Download checkpoints from Google Drive
2. Extract to correct location
3. Verify files exist in `DeepFashion_Try_On/ACGPN_inference/checkpoints/`

### "CUDA out of memory"

**Solution:**
- Close other GPU applications
- Reduce batch size
- Use CPU mode (slower)

### "Model loading failed"

**Solution:**
- Check PyTorch version compatibility
- Ensure checkpoints are not corrupted
- Re-download if necessary

## 📚 Additional Resources

### Dataset
- **VITON Dataset:** https://drive.google.com/file/d/1tE7hcVFm8Td8kRh5iYRBSDFdvZIkbUIR/view?usp=sharing
- Test pairs and evaluation data available

### Paper
- **ArXiv:** https://arxiv.org/abs/2003.05863
- **Video Demo:** https://www.youtube.com/watch?v=BbKBSfDBcxI

## 🎓 Citation

If you use this implementation, please cite:

```bibtex
@InProceedings{Yang_2020_CVPR,
author = {Yang, Han and Zhang, Ruimao and Guo, Xiaobao and Liu, Wei and Zuo, Wangmeng and Luo, Ping},
title = {Towards Photo-Realistic Virtual Try-On by Adaptively Generating-Preserving Image Content},
booktitle = {IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)},
month = {June},
year = {2020}
}
```

## 📝 Notes

- This is a research implementation
- Results quality depends on proper checkpoint setup
- Best results on VITON dataset
- May require retraining for other datasets

## 🔄 Integration with Frontend

The frontend (`ar-tryon.tsx`) will automatically detect this backend.

Just ensure:
1. Backend is running on port 8000
2. Checkpoints are properly installed
3. Frontend is configured to use this backend

---

**Status:** Ready for use after checkpoint download

**Last Updated:** November 24, 2025
