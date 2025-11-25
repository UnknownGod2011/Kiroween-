import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import uploadRouter from './upload-temp.js';
import miragicRouter from './miragic-tryon.js';

// Ensure .env is loaded from backend folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase limit for large images
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ====== CONFIG ======
const PORT = process.env.PORT || 5000;
const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY;
const LIGHTX_API_KEY = process.env.LIGHTX_API_KEY;

// Debug checks
console.log("Loaded STABILITY_API_KEY:", STABILITY_API_KEY ? "✅ Found" : "❌ Missing");
console.log("Loaded REMOVE_BG_API_KEY:", REMOVE_BG_API_KEY ? "✅ Found" : "❌ Missing");
console.log("Loaded LIGHTX_API_KEY:", LIGHTX_API_KEY ? "✅ Found" : "❌ Missing");

// ====== DESIGN FOLDER ======
const designsDir = path.join(__dirname, "designs");
if (!fs.existsSync(designsDir)) {
  fs.mkdirSync(designsDir);
}
app.use("/designs", express.static(designsDir));

// ====== TEMP UPLOADS FOLDER ======
const uploadsDir = path.join(__dirname, "temp-uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use("/temp-uploads", express.static(uploadsDir));

// ====== CLEANUP FUNCTION ======
const CLEANUP_INTERVAL = 1000 * 60 * 60; // every 1 hour
const FILE_LIFETIME = 1000 * 60 * 60 * 24; // 24 hours

function cleanupOldFiles() {
  const now = Date.now();
  fs.readdir(designsDir, (err, files) => {
    if (err) return console.error("Cleanup error:", err);
    files.forEach((file) => {
      const filePath = path.join(designsDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) return console.error("File stat error:", err);
        if (now - stats.mtimeMs > FILE_LIFETIME) {
          fs.unlink(filePath, (err) => {
            if (err) console.error("Failed to delete old file:", err);
            else console.log(`🗑️ Deleted old design: ${file}`);
          });
        }
      });
    });
  });
}
setInterval(cleanupOldFiles, CLEANUP_INTERVAL);

// ====== GENERATE DESIGN ROUTE ======
async function handleGenerate(req, res) {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    // ===== Generate image from Stability AI =====
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("aspect_ratio", "1:1");
    formData.append("output_format", "png");

    // Trim any whitespace from API key
    const apiKey = STABILITY_API_KEY?.trim();
    console.log("🔑 Using API Key:", apiKey ? `${apiKey.substring(0, 15)}...` : "MISSING");
    console.log("🔑 Key length:", apiKey?.length);
    
    if (!apiKey) {
      return res.status(500).json({ error: "STABILITY_API_KEY not configured" });
    }
    
    const response = await fetch(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json",
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Stability API error:", response.status, errorText);
      
      // Provide user-friendly error messages
      let userMessage = errorText;
      if (response.status === 500) {
        userMessage = "Stability AI is temporarily down (500 error). Please try again in a few minutes.";
      } else if (response.status === 429) {
        userMessage = "API rate limit reached. Please wait a moment and try again.";
      } else if (response.status === 401 || response.status === 403) {
        userMessage = "API authentication failed. Please check your API key.";
      }
      
      return res.status(response.status).json({ 
        error: userMessage,
        details: errorText,
        status: response.status
      });
    }

    const data = await response.json();
    const imageBase64 = data.image ? data.image : data.images?.[0];
    if (!imageBase64) return res.status(500).json({ error: "No image returned from API" });

    // Save temporary image
    const buffer = Buffer.from(imageBase64, "base64");
    const filename = `design_${Date.now()}.png`;
    const filepath = path.join(designsDir, filename);
    fs.writeFileSync(filepath, buffer);
    console.log(`✅ Base image saved: ${filename}`);

    // ===== Remove background using Remove.bg =====
    const removeForm = new FormData();
    removeForm.append("image_file", fs.createReadStream(filepath));
    removeForm.append("size", "auto");

    const removeResponse = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: { "X-Api-Key": REMOVE_BG_API_KEY },
      body: removeForm,
    });

    if (!removeResponse.ok) {
      const errorText = await removeResponse.text();
      console.error("Remove.bg error:", errorText);
      return res.status(removeResponse.status).json({ error: errorText });
    }

    const removeBuffer = await removeResponse.buffer();
    fs.writeFileSync(filepath, removeBuffer); // overwrite original image
    console.log(`✅ Background removed: ${filename}`);

    // Return public URL
    res.json({
      message: "Image generated successfully with transparent background",
      url: `http://localhost:${PORT}/designs/${filename}`,
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Image generation failed" });
  }
}

// ====== HAUNTED IMAGE ROUTE (Stability AI Image-to-Image) ======
app.post("/haunted-image", async (req, res) => {
  try {
    const { imageData, additionalPrompt = '' } = req.body;

    if (!imageData) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    console.log('🎃 Transforming YOUR image into haunted version with Stability AI...');

    // Remove data URL prefix
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Save temporarily
    const tempPath = path.join(__dirname, 'temp-upload.png');
    fs.writeFileSync(tempPath, imageBuffer);

    // Create haunted prompt - describe what we want to ADD to the image
    const hauntedPrompt = `haunted spooky horror atmosphere, dark eerie lighting, ghostly fog, creepy shadows, supernatural horror movie aesthetic${additionalPrompt ? ', ' + additionalPrompt : ''}`;

    // Use Stability AI's CORRECT image-to-image endpoint
    const formData = new FormData();
    formData.append('image', fs.createReadStream(tempPath));
    formData.append('prompt', hauntedPrompt);
    formData.append('mode', 'image-to-image');
    formData.append('strength', '0.65'); // 0.5-0.8 is good for transformation
    formData.append('output_format', 'png');

    console.log('Sending to Stability AI image-to-image endpoint...');
    console.log('Prompt:', hauntedPrompt);
    
    const stabilityResponse = await fetch(
      'https://api.stability.ai/v2beta/stable-image/generate/ultra',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STABILITY_API_KEY}`,
          'Accept': 'image/*',
        },
        body: formData,
      }
    );

    // Clean up temp file
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }

    console.log('Stability response status:', stabilityResponse.status);

    if (!stabilityResponse.ok) {
      const errorText = await stabilityResponse.text();
      console.error('Stability AI error:', errorText);
      return res.status(stabilityResponse.status).json({ 
        error: 'Failed to transform image', 
        details: errorText 
      });
    }

    const resultBuffer = await stabilityResponse.buffer();
    const base64Result = resultBuffer.toString('base64');

    console.log('✅ Haunted transformation complete! Image size:', base64Result.length);

    return res.json({
      success: true,
      imageData: `data:image/png;base64,${base64Result}`,
      prompt: hauntedPrompt
    });

  } catch (error) {
    console.error('Error in haunted-image:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
});

// ====== VIRTUAL TRY-ON ROUTE (WITH ASYNC POLLING) ======
app.post("/api/tryon", async (req, res) => {
  try {
    const { personImageBase64, tshirtImageBase64 } = req.body;

    console.log('📥 Received try-on request');

    if (!personImageBase64 || !tshirtImageBase64) {
      console.error('❌ Missing images in request');
      return res.status(400).json({ 
        error: 'Missing required images',
        message: 'Both person and t-shirt images are required' 
      });
    }

    if (!LIGHTX_API_KEY) {
      console.error('❌ LIGHTX_API_KEY not found');
      return res.status(500).json({ 
        error: 'API key missing',
        message: 'LightX API key not configured'
      });
    }

    console.log('🎭 Converting Base64 to temporary URLs for LightX...');

    // Decode Base64 to buffers
    const personBuffer = Buffer.from(personImageBase64, 'base64');
    const tshirtBuffer = Buffer.from(tshirtImageBase64, 'base64');

    console.log('📏 Original sizes - Person:', personBuffer.length, 'T-shirt:', tshirtBuffer.length);

    // RESIZE IMAGES FOR LIGHTX (Critical for success!)
    console.log('🔧 Resizing images for optimal LightX processing...');
    
    // Resize person photo to 512x768 (portrait)
    const resizedPersonBuffer = await sharp(personBuffer)
      .resize(512, 768, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 85 })
      .toBuffer();

    // Resize t-shirt design to 512x512 (square)
    const resizedTshirtBuffer = await sharp(tshirtBuffer)
      .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();

    console.log('✅ Resized - Person:', resizedPersonBuffer.length, 'T-shirt:', resizedTshirtBuffer.length);

    const personFilename = `person-${Date.now()}.jpg`;
    const tshirtFilename = `tshirt-${Date.now()}.png`;

    const personPath = path.join(uploadsDir, personFilename);
    const tshirtPath = path.join(uploadsDir, tshirtFilename);

    fs.writeFileSync(personPath, resizedPersonBuffer);
    fs.writeFileSync(tshirtPath, resizedTshirtBuffer);

    const personUrl = `http://localhost:${PORT}/temp-uploads/${personFilename}`;
    const tshirtUrl = `http://localhost:${PORT}/temp-uploads/${tshirtFilename}`;

    console.log('✅ Temp URLs created');
    console.log('Person URL:', personUrl);
    console.log('T-shirt URL:', tshirtUrl);

    console.log('📤 STEP 1: Sending request to LightX API v2...');

    // STEP 1: Submit the try-on request
    const lightxResponse = await fetch('https://api.lightxeditor.com/external/api/v2/aivirtualtryon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': LIGHTX_API_KEY
      },
      body: JSON.stringify({
        imageUrl: personUrl,
        styleImageUrl: tshirtUrl
      })
    });

    console.log('📥 LightX API response status:', lightxResponse.status);

    if (!lightxResponse.ok) {
      const errorText = await lightxResponse.text();
      console.error('❌ LightX API Error:', errorText);
      
      // Cleanup temp files
      fs.unlinkSync(personPath);
      fs.unlinkSync(tshirtPath);
      
      return res.status(lightxResponse.status).json({ 
        error: 'LightX API failed',
        message: 'Try-On failed. Use a smaller photo or try again.',
        details: errorText
      });
    }

    const data = await lightxResponse.json();
    console.log('📊 LightX initial response:', JSON.stringify(data, null, 2));

    // STEP 2: Extract orderId from response
    const orderId = data.body?.orderId || data.orderId;

    if (!orderId) {
      console.error('❌ No orderId in response:', data);
      
      // Cleanup temp files
      fs.unlinkSync(personPath);
      fs.unlinkSync(tshirtPath);
      
      return res.status(500).json({ 
        error: 'No orderId returned',
        message: 'LightX API did not return an orderId',
        details: JSON.stringify(data)
      });
    }

    console.log('✅ Got orderId:', orderId);
    console.log('⏳ STEP 2: Waiting 3 seconds before polling...');
    
    // STEP 3: Wait 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000));

    // STEP 4-5: Poll for result
    console.log('🔄 STEP 3: Starting to poll for result...');
    
    const maxRetries = 30; // Max 60 seconds (30 * 2 seconds) - increased for large images
    let retries = 0;
    let resultUrl = null;

    while (retries < maxRetries) {
      console.log(`🔄 Polling attempt ${retries + 1}/${maxRetries}...`);

      const statusResponse = await fetch(
        `https://api.lightxeditor.com/external/api/v2/aivirtualtryon/status?orderId=${orderId}`,
        {
          method: 'GET',
          headers: {
            'x-api-key': LIGHTX_API_KEY
          }
        }
      );

      if (!statusResponse.ok) {
        console.error('❌ Status check failed:', statusResponse.status);
        retries++;
        await new Promise(resolve => setTimeout(resolve, 2000));
        continue;
      }

      const statusData = await statusResponse.json();
      console.log('📊 Status:', statusData.status || statusData.body?.status);

      const status = statusData.status || statusData.body?.status;

      if (status === 'completed') {
        resultUrl = statusData.resultUrl || statusData.body?.resultUrl;
        console.log('✅ STEP 4: Processing complete! Result URL:', resultUrl);
        break;
      } else if (status === 'FAIL' || status === 'failed') {
        console.error('❌ LightX processing failed');
        
        // Cleanup temp files
        fs.unlinkSync(personPath);
        fs.unlinkSync(tshirtPath);
        
        return res.status(500).json({ 
          error: 'Processing failed',
          message: 'Try-On failed. Please use another photo or try again.'
        });
      } else if (status === 'init' || status === 'processing') {
        console.log(`⏳ Status: ${status}, waiting 2 seconds...`);
        retries++;
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        console.log(`⚠️ Unknown status: ${status}, continuing to poll...`);
        retries++;
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    if (!resultUrl) {
      console.error('❌ Timeout: No result after', maxRetries, 'attempts');
      
      // Cleanup temp files
      fs.unlinkSync(personPath);
      fs.unlinkSync(tshirtPath);
      
      return res.status(500).json({ 
        error: 'Processing timeout',
        message: 'Try-On is taking too long. Please try again with a different photo.'
      });
    }

    console.log('📥 STEP 5: Downloading result from:', resultUrl);

    // STEP 6: Download the result image and convert to Base64
    const imageResponse = await fetch(resultUrl);
    const imageBuffer = await imageResponse.buffer();
    const finalImageBase64 = imageBuffer.toString('base64');

    console.log('✅ Virtual Try-On successful! Image size:', finalImageBase64.length);

    // Cleanup temp files
    fs.unlinkSync(personPath);
    fs.unlinkSync(tshirtPath);

    res.json({ 
      finalImage: finalImageBase64,
      success: true
    });

  } catch (error) {
    console.error('❌ Virtual Try-On Error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message,
      details: error.stack
    });
  }
});

// ====== ROUTES ======
app.use('/api', uploadRouter);
app.use('/api/miragic', miragicRouter);
app.post("/generate-design", handleGenerate);
app.post("/generate", handleGenerate);

// ====== START SERVER ======
app.listen(PORT, () => {
  console.log(`✅ Stable Diffusion backend running on http://localhost:${PORT}`);
  console.log(`✅ Virtual Try-On API ready at /api/tryon`);
  console.log(`✅ Miragic Virtual Try-On API ready at /api/miragic/tryon`);
});
