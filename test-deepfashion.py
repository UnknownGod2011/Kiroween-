"""
Quick test script for DeepFashion Try-On
Tests with images from public folder
"""
import sys
import os
from pathlib import Path

# Add DeepFashion to path
DEEPFASHION_DIR = Path(__file__).parent / "DeepFashion_Try_On" / "ACGPN_inference"
sys.path.insert(0, str(DEEPFASHION_DIR))

print("🧪 Testing DeepFashion Try-On Setup")
print("=" * 50)

# Check checkpoints
checkpoint_dir = DEEPFASHION_DIR / "checkpoints" / "ACGPN_checkpoints" / "label2city"
print(f"\n📁 Checking checkpoints in: {checkpoint_dir}")

if checkpoint_dir.exists():
    files = list(checkpoint_dir.glob("*.pth"))
    print(f"✅ Found {len(files)} checkpoint files:")
    for f in files:
        size_mb = f.stat().st_size / (1024 * 1024)
        print(f"   - {f.name} ({size_mb:.1f} MB)")
else:
    print("❌ Checkpoints directory not found!")
    sys.exit(1)

# Check test images
print(f"\n📸 Checking test images in: public/")
test_person = Path("project/public/TestPerson.png")
test_image = Path("project/public/TestImage.png")

if test_person.exists():
    print(f"✅ Test person image found: {test_person}")
else:
    print(f"❌ Test person image not found: {test_person}")

if test_image.exists():
    print(f"✅ Test garment image found: {test_image}")
else:
    print(f"❌ Test garment image not found: {test_image}")

# Try importing required modules
print(f"\n📦 Checking dependencies...")

try:
    import torch
    print(f"✅ PyTorch {torch.__version__}")
    print(f"   CUDA available: {torch.cuda.is_available()}")
    if torch.cuda.is_available():
        print(f"   CUDA device: {torch.cuda.get_device_name(0)}")
except ImportError as e:
    print(f"❌ PyTorch not found: {e}")

try:
    import cv2
    print(f"✅ OpenCV {cv2.__version__}")
except ImportError as e:
    print(f"❌ OpenCV not found: {e}")

try:
    import numpy as np
    print(f"✅ NumPy {np.__version__}")
except ImportError as e:
    print(f"❌ NumPy not found: {e}")

try:
    from PIL import Image
    print(f"✅ PIL/Pillow")
except ImportError as e:
    print(f"❌ PIL not found: {e}")

print("\n" + "=" * 50)
print("✅ Setup verification complete!")
print("\nNext steps:")
print("1. Install missing dependencies if any")
print("2. Run: cd project/deepfashion-backend && python main.py")
print("3. Test the API endpoint")
