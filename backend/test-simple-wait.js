import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const LIGHTX_API_KEY = process.env.LIGHTX_API_KEY;

console.log('🧪 Simple Wait Test - No Status Polling');
console.log('API Key:', LIGHTX_API_KEY ? '✅ Found' : '❌ Missing');
console.log('\n⚠️  Note: LightX free tier returns 403 on status endpoint');
console.log('Strategy: Submit job, wait 30 seconds, hope for the best\n');

const testSimpleWait = async () => {
  try {
    // Read and resize test images
    const publicDir = path.join(__dirname, '..', 'public');
    const personBuffer = fs.readFileSync(path.join(publicDir, 'TestPerson.png'));
    const tshirtBuffer = fs.readFileSync(path.join(publicDir, 'TestImage.png'));

    console.log('🔧 Resizing images...');
    
    const resizedPersonBuffer = await sharp(personBuffer)
      .resize(512, 768, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 85 })
      .toBuffer();

    const resizedTshirtBuffer = await sharp(tshirtBuffer)
      .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();

    console.log('✅ Resized - Person:', resizedPersonBuffer.length, 'T-shirt:', resizedTshirtBuffer.length);

    // Save temporarily
    const tempDir = path.join(__dirname, 'temp-uploads');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const personFilename = `test-person-${Date.now()}.jpg`;
    const tshirtFilename = `test-tshirt-${Date.now()}.png`;

    fs.writeFileSync(path.join(tempDir, personFilename), resizedPersonBuffer);
    fs.writeFileSync(path.join(tempDir, tshirtFilename), resizedTshirtBuffer);

    const personUrl = `http://localhost:5000/temp-uploads/${personFilename}`;
    const tshirtUrl = `http://localhost:5000/temp-uploads/${tshirtFilename}`;

    console.log('\n📤 Submitting to LightX...');
    
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

    const data = await lightxResponse.json();
    console.log('✅ Response:', JSON.stringify(data, null, 2));

    const orderId = data.body?.orderId;
    console.log('\n✅ Got orderId:', orderId);
    console.log('⏳ Waiting 30 seconds for processing...');
    console.log('(LightX avgResponseTimeInSec:', data.body?.avgResponseTimeInSec, 'seconds)');

    // Just wait the average time
    const waitTime = (data.body?.avgResponseTimeInSec || 25) * 1000;
    await new Promise(resolve => setTimeout(resolve, waitTime));

    console.log('\n❌ PROBLEM: Free tier LightX API returns 403 on status endpoint');
    console.log('❌ Cannot check if processing is complete');
    console.log('❌ Cannot retrieve result URL');
    console.log('\n💡 SOLUTION NEEDED:');
    console.log('1. Upgrade to paid LightX plan, OR');
    console.log('2. Use a different virtual try-on API, OR');
    console.log('3. Use canvas-based overlay (simpler but less realistic)');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }
};

testSimpleWait();
