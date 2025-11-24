"""
Test the virtual try-on API with test images
"""
import requests
import base64
from pathlib import Path
import json

print("🧪 Testing Virtual Try-On API")
print("=" * 50)

# Load test images
person_path = Path("public/TestPerson.png")
garment_path = Path("public/TestImage.png")

print(f"\n📸 Loading test images...")
print(f"   Person: {person_path}")
print(f"   Garment: {garment_path}")

if not person_path.exists():
    print(f"❌ Person image not found!")
    exit(1)

if not garment_path.exists():
    print(f"❌ Garment image not found!")
    exit(1)

# Read and encode images
with open(person_path, "rb") as f:
    person_base64 = base64.b64encode(f.read()).decode('utf-8')

with open(garment_path, "rb") as f:
    garment_base64 = base64.b64encode(f.read()).decode('utf-8')

print(f"✅ Images loaded and encoded")

# Test Python VITON backend (port 8001)
print(f"\n🔧 Testing Python VITON backend (port 8001)...")

try:
    response = requests.post(
        "http://localhost:8001/api/tryon",
        json={
            "personImage": person_base64,
            "clothImage": garment_base64
        },
        timeout=30
    )
    
    if response.status_code == 200:
        result = response.json()
        if result.get('success'):
            print(f"✅ Python VITON works!")
            print(f"   Result image size: {len(result.get('resultImage', ''))} bytes")
            
            # Save result
            result_data = base64.b64decode(result['resultImage'])
            with open("public/test-result-python-viton.png", "wb") as f:
                f.write(result_data)
            print(f"   Saved to: public/test-result-python-viton.png")
        else:
            print(f"⚠️ Request succeeded but no result: {result}")
    else:
        print(f"❌ Request failed: {response.status_code}")
        print(f"   {response.text}")
        
except requests.exceptions.ConnectionError:
    print(f"❌ Cannot connect to Python VITON backend")
    print(f"   Make sure it's running: cd project/python-viton && python app.py")
except Exception as e:
    print(f"❌ Error: {e}")

# Test DeepFashion backend (port 8000)
print(f"\n🔧 Testing DeepFashion backend (port 8000)...")

try:
    response = requests.post(
        "http://localhost:8000/api/tryon",
        json={
            "personImage": person_base64,
            "clothImage": garment_base64
        },
        timeout=30
    )
    
    if response.status_code == 200:
        result = response.json()
        if result.get('success'):
            print(f"✅ DeepFashion works!")
            print(f"   Result image size: {len(result.get('resultImage', ''))} bytes")
            
            # Save result
            result_data = base64.b64decode(result['resultImage'])
            with open("public/test-result-deepfashion.png", "wb") as f:
                f.write(result_data)
            print(f"   Saved to: public/test-result-deepfashion.png")
        else:
            print(f"⚠️ Request succeeded but no result: {result}")
    else:
        print(f"❌ Request failed: {response.status_code}")
        print(f"   {response.text}")
        
except requests.exceptions.ConnectionError:
    print(f"❌ Cannot connect to DeepFashion backend")
    print(f"   Make sure it's running: cd project/deepfashion-backend && python main.py")
except Exception as e:
    print(f"❌ Error: {e}")

print("\n" + "=" * 50)
print("✅ Test complete!")
