from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import io
import cv2
import numpy as np
from PIL import Image
import os

app = Flask(__name__)
CORS(app)

# Simple virtual try-on using image processing (no ML models needed for basic version)
def simple_virtual_tryon(person_img, garment_img):
    """
    Simple virtual try-on using image processing techniques
    This is a lightweight version that doesn't require ML models
    """
    # Convert PIL to numpy
    person = np.array(person_img)
    garment = np.array(garment_img)
    
    # Ensure images are RGB
    if len(person.shape) == 2:
        person = cv2.cvtColor(person, cv2.COLOR_GRAY2RGB)
    if len(garment.shape) == 2:
        garment = cv2.cvtColor(garment, cv2.COLOR_GRAY2RGB)
    
    # Get dimensions
    h, w = person.shape[:2]
    
    # Resize garment to fit chest area (approximately 40% of image width)
    garment_width = int(w * 0.4)
    garment_height = int(garment_width * 1.2)
    garment_resized = cv2.resize(garment, (garment_width, garment_height))
    
    # Position garment on chest (center horizontally, 30% from top)
    x_offset = (w - garment_width) // 2
    y_offset = int(h * 0.3)
    
    # Create a copy of person image
    result = person.copy()
    
    # Extract alpha channel if garment has transparency
    if garment_resized.shape[2] == 4:
        garment_rgb = garment_resized[:, :, :3]
        alpha = garment_resized[:, :, 3] / 255.0
    else:
        garment_rgb = garment_resized
        # Create alpha mask from white background
        gray = cv2.cvtColor(garment_rgb, cv2.COLOR_RGB2GRAY)
        _, alpha = cv2.threshold(gray, 250, 1.0, cv2.THRESH_BINARY_INV)
        alpha = alpha.astype(float)
    
    # Ensure we don't go out of bounds
    y_end = min(y_offset + garment_height, h)
    x_end = min(x_offset + garment_width, w)
    garment_h = y_end - y_offset
    garment_w = x_end - x_offset
    
    # Crop garment and alpha if needed
    garment_rgb = garment_rgb[:garment_h, :garment_w]
    alpha = alpha[:garment_h, :garment_w]
    
    # Get the region of interest from person image
    roi = result[y_offset:y_end, x_offset:x_end]
    
    # Apply multiply blend mode for realistic fabric look
    if len(alpha.shape) == 2:
        alpha = np.expand_dims(alpha, axis=2)
    
    # Blend garment with person using alpha
    blended = (garment_rgb * alpha * 0.7 + roi * (1 - alpha * 0.7)).astype(np.uint8)
    
    # Apply the blended region back
    result[y_offset:y_end, x_offset:x_end] = blended
    
    # Add subtle shadows for depth
    shadow = np.zeros_like(result)
    cv2.ellipse(shadow, 
                (x_offset + garment_w // 2, y_offset + garment_h), 
                (garment_w // 2, 20), 
                0, 0, 180, 
                (0, 0, 0), 
                -1)
    shadow = cv2.GaussianBlur(shadow, (21, 21), 0)
    result = cv2.addWeighted(result, 1.0, shadow, 0.3, 0)
    
    return result

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'Python VITON server is running'})

@app.route('/api/tryon', methods=['POST'])
def virtual_tryon():
    try:
        data = request.json
        
        # Get base64 images (support both formats)
        person_base64 = data.get('personImage')
        garment_base64 = data.get('clothImage') or data.get('garmentImage')
        
        if not person_base64 or not garment_base64:
            return jsonify({'error': 'Missing images'}), 400
        
        # Decode base64 to images
        person_data = base64.b64decode(person_base64)
        garment_data = base64.b64decode(garment_base64)
        
        person_img = Image.open(io.BytesIO(person_data)).convert('RGB')
        garment_img = Image.open(io.BytesIO(garment_data)).convert('RGBA')
        
        print(f"Processing: Person {person_img.size}, Garment {garment_img.size}")
        
        # Perform virtual try-on
        result = simple_virtual_tryon(person_img, garment_img)
        
        # Convert result to PIL Image
        result_img = Image.fromarray(result)
        
        # Convert to base64
        buffered = io.BytesIO()
        result_img.save(buffered, format="PNG")
        result_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
        
        print("✅ Virtual try-on complete!")
        
        return jsonify({
            'success': True,
            'resultImage': result_base64
        })
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("🚀 Starting Python VITON server...")
    print("📍 Server will run on http://localhost:8001")
    app.run(host='0.0.0.0', port=8001, debug=True)
