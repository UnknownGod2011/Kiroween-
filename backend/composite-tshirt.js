import express from 'express';
import sharp from 'sharp';
import fetch from 'node-fetch';

const router = express.Router();

/**
 * Composite a design onto a t-shirt mockup
 * POST /api/composite-tshirt
 * Body: { designImage: base64, color: hex, side: 'front'|'back' }
 */
router.post('/composite-tshirt', async (req, res) => {
  try {
    const { designImage, color = '#3B82F6', side = 'front' } = req.body;

    if (!designImage) {
      return res.status(400).json({ error: 'Design image is required' });
    }

    console.log(`🎨 Compositing ${side} design onto ${color} t-shirt...`);

    // Convert base64 to buffer
    const designBase64 = designImage.includes(',') 
      ? designImage.split(',')[1] 
      : designImage;
    const designBuffer = Buffer.from(designBase64, 'base64');

    // Create a simple t-shirt mockup (you can replace with actual mockup images)
    // For now, create a colored rectangle as t-shirt base
    const tshirtWidth = 800;
    const tshirtHeight = 1000;
    
    // Convert hex color to RGB
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 59, g: 130, b: 246 }; // default blue
    };

    const rgb = hexToRgb(color);

    // Create base t-shirt colored rectangle
    const tshirtBase = await sharp({
      create: {
        width: tshirtWidth,
        height: tshirtHeight,
        channels: 4,
        background: { r: rgb.r, g: rgb.g, b: rgb.b, alpha: 1 }
      }
    }).png().toBuffer();

    // Resize design to fit on t-shirt (centered, ~60% of width)
    const designWidth = Math.floor(tshirtWidth * 0.6);
    const designHeight = Math.floor(tshirtHeight * 0.5);
    
    const resizedDesign = await sharp(designBuffer)
      .resize(designWidth, designHeight, {
        fit: 'inside',
        withoutEnlargement: false
      })
      .toBuffer();

    // Get design dimensions after resize
    const designMeta = await sharp(resizedDesign).metadata();
    
    // Calculate position to center design on t-shirt
    const left = Math.floor((tshirtWidth - (designMeta.width || designWidth)) / 2);
    const top = Math.floor(tshirtHeight * 0.25); // Position in upper-middle area

    // Composite design onto t-shirt
    const composite = await sharp(tshirtBase)
      .composite([{
        input: resizedDesign,
        top,
        left
      }])
      .png()
      .toBuffer();

    // Convert to base64
    const compositeBase64 = composite.toString('base64');

    console.log('✅ T-shirt composite created successfully');

    res.json({
      success: true,
      image: `data:image/png;base64,${compositeBase64}`
    });

  } catch (error) {
    console.error('❌ Composite error:', error);
    res.status(500).json({
      error: 'Failed to composite t-shirt',
      details: error.message
    });
  }
});

export default router;
