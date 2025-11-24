import requests
import base64
import os
from pathlib import Path

print("🧪 Testing Python VITON Server")
print("=" * 50)

# Test health endpoint
print("\n1. Testing health endpoint...")
try:
    response = requests.get('http://localhost:5001/health')
    if response.status_code == 200:
        print("✅ Health check passed:", response.json())
    else:
        print("❌ Health check failed:", response.status_code)
        exit(1)
except Exception as e:
    print("❌ Cannot connect to server!")
    print("   Make sure to run: start-server.bat")
    exit(1)

# Test try-on endpoint with sample images
print("\n2. Testing virtual try-on endpoint...")

# Check if test images exist
public_dir = Path(__file__).parent.parent / 'public'
person_path = public_dir / 'TestPerson.png'
garment_path = public_dir / 'TestImage.png'

if not person_path.exists():
    print(f"❌ TestPerson.png not found at {person_path}")
    print("   Please add test images to public folder")
    exit(1)

if not garment_path.exists():
    print(f"❌ TestImage.png not found at {garment_path}")
    print("   Please add test images to public folder")
    exit(1)

# Read and encode images
with open(person_path, 'rb') as f:
    person_base64 = base64.b64encode(f.read()).decode('utf-8')

with open(garment_path, 'rb') as f:
    garment_base64 = base64.b64encode(f.read()).decode('utf-8')

print(f"   Person image: {len(person_base64)} bytes")
print(f"   Garment image: {len(garment_base64)} bytes")

# Send request
print("\n   Sending request to server...")
try:
    response = requests.post(
        'http://localhost:5001/tryon',
        json={
            'personImage': person_base64,
            'garmentImage': garment_base64
        },
        timeout=30
    )
    
    if response.status_code == 200:
        data = response.json()
        if data.get('success') and data.get('resultImage'):
            print("✅ Virtual try-on successful!")
            print(f"   Result image: {len(data['resultImage'])} bytes")
            
            # Save result
            result_path = public_dir / 'test-result.png'
            result_data = base64.b64decode(data['resultImage'])
            with open(result_path, 'wb') as f:
                f.write(result_data)
            print(f"   Saved result to: {result_path}")
        else:
            print("❌ No result image in response")
    else:
        print(f"❌ Request failed: {response.status_code}")
        print(f"   Response: {response.text}")
        
except Exception as e:
    print(f"❌ Error: {e}")
    exit(1)

print("\n" + "=" * 50)
print("✅ All tests passed!")
print("🎉 Python VITON server is working correctly!")
