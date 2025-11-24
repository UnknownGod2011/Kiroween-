import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const GOOGLE_API_KEY = process.env.GOOGLE_VIRTUAL_TRYON_API_KEY;
const VIRTUAL_TRYON_ENDPOINT = `https://virtualtryon.googleapis.com/v1/images:tryOn?key=${GOOGLE_API_KEY}`;

router.post('/tryon', async (req, res) => {
  try {
    const { personImageBase64, tshirtImageBase64 } = req.body;

    if (!personImageBase64 || !tshirtImageBase64) {
      return res.status(400).json({ 
        error: 'Missing required images',
        message: 'Both person and t-shirt images are required' 
      });
    }

    console.log('🎭 Calling Google Virtual Try-On API...');

    // Call Google Virtual Try-On API
    const response = await fetch(VIRTUAL_TRYON_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personImage: {
          imageBytes: personImageBase64
        },
        productImage: {
          imageBytes: tshirtImageBase64
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Google API Error:', errorText);
      return res.status(response.status).json({ 
        error: 'Virtual Try-On API failed',
        message: 'Please upload a clearer photo or try again',
        details: errorText
      });
    }

    const data = await response.json();
    
    // Extract the final image from response
    const finalImage = data.outputImage?.imageBytes || data.image?.imageBytes;

    if (!finalImage) {
      console.error('❌ No image in response:', data);
      return res.status(500).json({ 
        error: 'No output image',
        message: 'Try-On failed, please try again with a different photo'
      });
    }

    console.log('✅ Virtual Try-On successful!');

    res.json({ 
      finalImage,
      success: true
    });

  } catch (error) {
    console.error('❌ Virtual Try-On Error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: 'Try-On failed, please upload a clearer photo or try again',
      details: error.message
    });
  }
});

export default router;
