import dotenv from "dotenv";
import fetch from "node-fetch";
import FormData from "form-data";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY;

console.log("🔍 Testing API Keys...\n");
console.log("Stability AI Key:", STABILITY_API_KEY ? `${STABILITY_API_KEY.substring(0, 15)}...` : "❌ MISSING");
console.log("Remove.bg Key:", REMOVE_BG_API_KEY ? `${REMOVE_BG_API_KEY.substring(0, 10)}...` : "❌ MISSING");
console.log("\n" + "=".repeat(50) + "\n");

// Test Stability AI
async function testStabilityAI() {
  console.log("🧪 Testing Stability AI API...");
  
  try {
    const formData = new FormData();
    formData.append("prompt", "a simple red circle");
    formData.append("aspect_ratio", "1:1");
    formData.append("output_format", "png");

    const response = await fetch(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${STABILITY_API_KEY}`,
          Accept: "application/json",
        },
        body: formData,
      }
    );

    console.log("Status:", response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log("❌ Stability AI Error:", errorText);
      return false;
    }

    const data = await response.json();
    console.log("✅ Stability AI: Working! Image generated successfully");
    return true;
  } catch (error) {
    console.log("❌ Stability AI Exception:", error.message);
    return false;
  }
}

// Test Remove.bg
async function testRemoveBG() {
  console.log("\n🧪 Testing Remove.bg API...");
  
  try {
    // Test with a simple URL-based image
    const formData = new FormData();
    formData.append("image_url", "https://www.remove.bg/example.jpg");
    formData.append("size", "auto");

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: { 
        "X-Api-Key": REMOVE_BG_API_KEY 
      },
      body: formData,
    });

    console.log("Status:", response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log("❌ Remove.bg Error:", errorText);
      return false;
    }

    console.log("✅ Remove.bg: Working! API key is valid");
    return true;
  } catch (error) {
    console.log("❌ Remove.bg Exception:", error.message);
    return false;
  }
}

// Run tests
(async () => {
  const stabilityWorks = await testStabilityAI();
  const removeBgWorks = await testRemoveBG();
  
  console.log("\n" + "=".repeat(50));
  console.log("📊 TEST RESULTS:");
  console.log("=".repeat(50));
  console.log("Stability AI:", stabilityWorks ? "✅ WORKING" : "❌ FAILED");
  console.log("Remove.bg:", removeBgWorks ? "✅ WORKING" : "❌ FAILED");
  console.log("=".repeat(50) + "\n");
  
  if (!stabilityWorks) {
    console.log("💡 Stability AI Fix:");
    console.log("   1. Go to https://platform.stability.ai/account/keys");
    console.log("   2. Generate a new API key");
    console.log("   3. Update STABILITY_API_KEY in .env file\n");
  }
  
  if (!removeBgWorks) {
    console.log("💡 Remove.bg Fix:");
    console.log("   1. Go to https://www.remove.bg/api");
    console.log("   2. Get your API key");
    console.log("   3. Update REMOVE_BG_API_KEY in .env file\n");
  }
})();
