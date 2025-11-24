import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const LIGHTX_API_KEY = process.env.LIGHTX_API_KEY;

console.log('🧪 Testing LightX API with async polling...');
console.log('API Key:', LIGHTX_API_KEY ? '✅ Found' : '❌ Missing');

// Test with sample image URLs
const testTryOn = async () => {
  try {
    // Using publicly accessible test images
    const personUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400';
    const garmentUrl = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400';

    console.log('\n📤 STEP 1: Sending test request to LightX...');
    console.log('Person URL:', personUrl);
    console.log('Garment URL:', garmentUrl);

    const response = await fetch('https://api.lightxeditor.com/external/api/v2/aivirtualtryon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': LIGHTX_API_KEY
      },
      body: JSON.stringify({
        imageUrl: personUrl,
        styleImageUrl: garmentUrl
      })
    });

    console.log('\n📥 Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error:', errorText);
      return;
    }

    const data = await response.json();
    console.log('\n✅ Initial response:', JSON.stringify(data, null, 2));

    // Extract orderId
    const orderId = data.body?.orderId || data.orderId;
    
    if (!orderId) {
      console.error('❌ No orderId in response');
      return;
    }

    console.log('\n✅ Got orderId:', orderId);
    console.log('⏳ STEP 2: Waiting 3 seconds...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Poll for result
    console.log('\n🔄 STEP 3: Polling for result...');
    const maxRetries = 15;
    let retries = 0;

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

      if (status === 'completed') {
        const resultUrl = statusData.resultUrl || statusData.body?.resultUrl;
        console.log('\n✅ SUCCESS! Result URL:', resultUrl);
        return;
      } else if (status === 'FAIL' || status === 'failed') {
        console.error('\n❌ Processing failed');
        return;
      }

      console.log('⏳ Still processing, waiting 2 seconds...');
      retries++;
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.error('\n❌ Timeout after', maxRetries, 'attempts');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
  }
};

testTryOn();
