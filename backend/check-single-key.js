import fetch from 'node-fetch';

const testKey = 'sk-fBf9yachBCKZMmBNkpMmX4QPk3Op6rFRDGZn1iaO7e8FnwfK';

async function checkStabilityKey(apiKey) {
  try {
    console.log(`\n🔍 Testing key: ${apiKey.substring(0, 20)}...`);
    
    // Try to get account balance
    const response = await fetch('https://api.stability.ai/v1/user/balance', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`❌ Status: ${response.status}`);
      console.log(`❌ Error: ${errorText}`);
      
      if (response.status === 401) {
        return { valid: false, reason: 'Invalid or expired key' };
      } else if (response.status === 403) {
        return { valid: false, reason: 'Forbidden - key may be disabled' };
      } else {
        return { valid: false, reason: `HTTP ${response.status}` };
      }
    }

    const data = await response.json();
    console.log(`✅ Valid Stability AI key!`);
    console.log(`💰 Credits: ${data.credits || 0}`);
    
    return {
      valid: true,
      credits: data.credits || 0,
      isStability: true
    };

  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return { valid: false, reason: error.message };
  }
}

// Run the check
checkStabilityKey(testKey).then(result => {
  console.log('\n📊 Result:', result);
  
  if (result.valid) {
    console.log('\n✅ This IS a valid Stability AI key');
    if (result.credits >= 10) {
      console.log('🟢 HIGH CREDITS - Can handle SDXL operations');
    } else if (result.credits >= 0.2) {
      console.log('🟡 LOW CREDITS - Basic operations only');
    } else {
      console.log('🔴 NO CREDITS - Key is exhausted');
    }
  } else {
    console.log('\n❌ This is NOT a valid Stability AI key');
    console.log(`   Reason: ${result.reason}`);
  }
});
