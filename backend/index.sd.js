import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Ensure .env is loaded from backend folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json());

// ====== CONFIG ======
const PORT = process.env.PORT || 5000;
const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY;

// Debug checks
console.log("Loaded STABILITY_API_KEY:", STABILITY_API_KEY ? "✅ Found" : "❌ Missing");
console.log("Loaded REMOVE_BG_API_KEY:", REMOVE_BG_API_KEY ? "✅ Found" : "❌ Missing");

// ====== DESIGN FOLDER ======
const designsDir = path.join(__dirname, "designs");
if (!fs.existsSync(designsDir)) {
  fs.mkdirSync(designsDir);
}
app.use("/designs", express.static(designsDir));

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

// ====== ROUTES ======
app.post("/generate-design", handleGenerate);
app.post("/generate", handleGenerate);

// ====== START SERVER ======
app.listen(PORT, () => {
  console.log(`✅ Stable Diffusion backend running on http://localhost:${PORT}`);
});
