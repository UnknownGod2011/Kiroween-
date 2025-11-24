import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const LIGHTX_API_KEY = process.env.LIGHTX_API_KEY;
const PORT = process.env.PORT || 5000;

console.log('🧪 Manual Test: Using TestPerson.png and TestImage.png from public folder');
console.log('API Key:', LIGHTX_API_KEY ? '✅ Found' : '❌ Missing');

const testManualTryOn = async () => {
  try {
    // Read test images from public folder
    const publicDir = path.join(__dirname, '..', 'public');
    const personPath = path.join(publicDir, 'TestPerson.png');
    const tshirtPath = path.join(publicDir, 'TestImage.png');

    console.log('\n📂 Reading test images...');
    console.log('Person:', personPath);
    console.log('T-shirt:', tshirtPath);

    if (!fs.existsSync(personPath)) {
      console.error('❌ TestPerson.png not found in public folder!');
      console.error('Available files:', fs.readdirSync(publicDir));
      return;
    }

    if (!fs.existsSync(tshirtPath)) {
      console.error('❌ TestImage.png not found in public folder!');
      console.error('Available files:', fs.readdirSync(publicDir));
      return;
    }

    // Read and convert to Base64
    const personBuffer = fs.readFileSync(personPath);
    const tshirtBuffer = fs.readFileSync(tshirtPath);

    const personBase64 = personBuffer.toString('base64');
    const tshirtBase64 = tshirtBuffer.toString('base64');

    console.log('✅ Images loaded');
    console.log('Person size:', personBuffer.length, 'bytes');
    console.log('T-shirt size:', tshirtBuffer.length, 'bytes');

    // Call our backend API
    console.log('\n📤 Sending to backend API...');
    const response = await fetch(`http://localhost:${PORT}/api/tryon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personImageBase64: personBase64,
        tshirtImageBase64: tshirtBase64
      })
    });

    console.log('📥 Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Error:', JSON.stringify(errorData, null, 2));
      return;
    }

    const data = await response.json();
    
    if (data.finalImage) {
      console.log('✅ SUCCESS! Got result image');
      console.log('Image size:', data.finalImage.length, 'characters');

      // Save result to public folder
      const resultBuffer = Buffer.from(data.finalImage, 'base64');
      const resultPath = path.join(publicDir, 'tryon-result.png');
      fs.writeFileSync(resultPath, resultBuffer);

      console.log('\n💾 Result saved to:', resultPath);
      console.log('✅ Check public/tryon-result.png to see the result!');
    } else {
      console.error('❌ No finalImage in response:', data);
    }

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
};

// Run the test
console.log('\n🚀 Starting manual try-on test...\n');
testManualTryOn();
