"""
FastAPI Backend for DeepFashion Try-On (ACGPN)
High-quality virtual try-on using CVPR 2020 method
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image
import torch
import io
import base64
import os
import sys
from pathlib import Path
import numpy as np
from acgpn_inference import get_acgpn_instance

# Add DeepFashion_Try_On to path
DEEPFASHION_DIR = Path(__file__).parent.parent / "DeepFashion_Try_On" / "ACGPN_inference"
sys.path.insert(0, str(DEEPFASHION_DIR))

app = FastAPI(title="DeepFashion Try-On API - ACGPN")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables
model_loaded = False
device = None
acgpn_model = None

def load_model():
    """Load DeepFashion ACGPN model"""
    global model_loaded, device, acgpn_model
    
    try:
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
        checkpoint_dir = DEEPFASHION_DIR / "checkpoints" / "ACGPN_checkpoints" / "label2city"
        
        if not checkpoint_dir.exists():
            print("⚠️  Checkpoints not found!")
            print(f"Please download from: https://drive.google.com/file/d/1UWT6esQIU_d4tUm8cjxDKMhB8joQbrFx/view?usp=sharing")
            print(f"Extract to: {checkpoint_dir}")
            return False
        
        # Load ACGPN model
        print("🔧 Loading ACGPN model...")
        acgpn_model = get_acgpn_instance(checkpoint_dir)
        
        model_loaded = True
        print(f"✅ DeepFashion ACGPN ready on {device}")
        return True
        
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        import traceback
        traceback.print_exc()
        return False

@app.on_event("startup")
async def startup_event():
    """Load model on startup"""
    print("🚀 Starting DeepFashion Try-On Backend...")
    load_model()

@app.get("/")
async def root():
    return {
        "message": "DeepFashion Try-On API (ACGPN)",
        "status": "running",
        "model_loaded": model_loaded,
        "device": str(device) if device else "unknown",
        "paper": "CVPR 2020 - Towards Photo-Realistic Virtual Try-On"
    }

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "model_loaded": model_loaded
    }

@app.post("/api/tryon")
async def virtual_tryon(request: dict):
    """
    DeepFashion virtual try-on endpoint
    
    Args:
        request: JSON with personImage and clothImage as base64 strings
    
    Returns:
        JSON with base64 encoded result image
    """
    if not model_loaded:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded. Please download checkpoints from Google Drive."
        )
    
    try:
        # Get base64 images from JSON
        person_base64 = request.get('personImage')
        cloth_base64 = request.get('clothImage')
        
        if not person_base64 or not cloth_base64:
            raise HTTPException(status_code=400, detail="Missing personImage or clothImage")
        
        # Decode base64 to images
        person_bytes = base64.b64decode(person_base64)
        cloth_bytes = base64.b64decode(cloth_base64)
        
        person_img = Image.open(io.BytesIO(person_bytes)).convert('RGB')
        cloth_img = Image.open(io.BytesIO(cloth_bytes)).convert('RGB')
        
        # Run ACGPN inference
        print("🎨 Running ACGPN inference...")
        result = acgpn_model.inference(person_img, cloth_img)
        print("✅ Inference complete!")
        
        # Convert to base64
        buffer = io.BytesIO()
        result.save(buffer, format='PNG')
        buffer.seek(0)
        result_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
        
        return JSONResponse({
            "success": True,
            "resultImage": result_base64,
            "message": "Simple composite (full pipeline requires checkpoints)"
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
