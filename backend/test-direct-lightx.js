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

console.log('🧪 Direct LightX Test with Resized Images');
console.log('API Key:', LIGHTX_API_KEY ? '✅ Found' : '❌ Missing');

const testDirectLightX = async () => {
  try {
    // Read test images
    const publicDir = path.join(__dirname, '..', 'public');
    const personPath = path.join(publicDir, 'TestPerson.png');
    const tshirtPath = path.join(publicDir, 'TestImage.png');

    console.log('\n📂 Reading and resizing test images...');
    
    // Read original images
    const personBuffer = fs.readFileSync(personPath);
    const tshirtBuffer = fs.readFileSync(tshirtPath);

    console.log('Original sizes:');
    console.log('Person:', personBuffer.length, 'bytes');
    console.log('T-shirt:', tshirtBuffer.length, 'bytes');

    // Resize with Sharp
    console.log('\n🔧 Resizing images...');
    
    const resizedPersonBuffer = await sharp(personBuffer)
      .resize(512, 768, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 85 })
      .toBuffer();

    const resizedTshirtBuffer = await sharp(tshirtBuffer)
      .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();

    console.log('Resized sizes:');
    console.log('Person:', resizedPersonBuffer.length, 'bytes');
    console.log('T-shirt:', resizedTshirtBuffer.length, 'bytes');

    // Save resized images temporarily
    const tempDir = path.join(__dirname, 'temp-uploads');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const personFilename = `test-person-${Date.now()}.jpg`;
    const tshirtFilename = `test-tshirt-${Date.now()}.png`;

    const personTempPath = path.join(tempDir, personFilename);
    const tshirtTempPath = path.join(tempDir, tshirtFilename);

    fs.writeFileSync(personTempPath, resizedPersonBuffer);
    fs.writeFileSync(tshirtTempPath, resizedTshirtBuffer);

    const personUrl = `http://localhost:5000/temp-uploads/${personFilename}`;
    const tshirtUrl = `http://localhost:5000/temp-uploads/${tshirtFilename}`;

    console.log('\n✅ Temp URLs created:');
    console.log('Person:', personUrl);
    console.log('T-shirt:', tshirtUrl);

    // STEP 1: Submit to LightX
    console.log('\n📤 STEP 1: Submitting to LightX API...');
    
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

    console.log('📥 Response status:', lightxResponse.status);

    if (!lightxResponse.ok) {
      const errorText = await lightxResponse.text();
      console.error('❌ LightX Error:', errorText);
      return;
    }

    const data = await lightxResponse.json();
    console.log('\n✅ Initial response:', JSON.stringify(data, null, 2));

    const orderId = data.body?.orderId || data.orderId;
    
    if (!orderId) {
      console.error('❌ No orderId in response');
      return;
    }

    console.log('\n✅ Got orderId:', orderId);
    console.log('⏳ STEP 2: Waiting 3 seconds...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // STEP 3: Poll for result
    console.log('\n🔄 STEP 3: Polling for result (max 60 seconds)...');
    const maxRetries = 30;
    let retries = 0;
    let resultUrl = null;

    while (retries < maxRetries) {
      console.log(`\n🔄 Attempt ${retries + 1}/${maxRetries}...`);

      const statusResponse = await fetch(
        `https://api.lightxeditor.com/external/api/v2/aivirtualtryon/status?orderId=${orderId}`,
        {
          method: 'GET',
          headers: { 'x-api-key': LIGHTX_API_KEY }
        }
      );

      if (!statusResponse.ok) {
        console.error('❌ Status check failed:', statusResponse.status);
        retries++;
        await new Promise(resolve => setTimeout(resolve, 2000));
        continue;
      }

      const statusData = await statusResponse.json();
      const status = statusData.status || statusData.body?.status;
      
      console.log('📊 Status:', status);
      console.log('Full response:', JSON.stringify(statusData, null, 2));

      if (status === 'completed') {
        resultUrl = statusData.resultUrl || statusData.body?.resultUrl;
        console.log('\n✅ SUCCESS! Result URL:', resultUrl);
        break;
      } else if (status === 'FAIL' || status === 'failed') {
        console.error('\n❌ Processing failed');
        console.error('Response:', JSON.stringify(statusData, null, 2));
        return;
      }

      console.log('⏳ Still processing, waiting 2 seconds...');
      retries++;
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    if (!resultUrl) {
      console.error('\n❌ Timeout after', maxRetries, 'attempts (60 seconds)');
      console.error('LightX is taking too long or the images are not suitable');
      return;
    }

    // Download result
    console.log('\n📥 Downloading result...');
    const imageResponse = await fetch(resultUrl);
    const imageBuffer = await imageResponse.buffer();

    // Save to public folder
    const resultPath = path.join(publicDir, 'tryon-result.png');
    fs.writeFileSync(resultPath, imageBuffer);

    console.log('\n💾 Result saved to:', resultPath);
    console.log('✅ SUCCESS! Check public/tryon-result.png');

    // Cleanup temp files
    fs.unlinkSync(personTempPath);
    fs.unlinkSync(tshirtTempPath);

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
};

testDirectLightX();
