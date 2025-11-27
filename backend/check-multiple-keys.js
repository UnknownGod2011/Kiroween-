import fetch from 'node-fetch';

const keysToTest = [
  'sk-fBf9yachBCKZMmBNkpMmX4QPk3Op6rFRDGZn1iaO7e8FnwfK',
  'sk-LIURoyUgO9rRLOoeQMQLo4fIBTQWGdAu4Rpi2m8N1ipUcZnW',
  'sk-uZTpO2wh1UaWHhrIm8RjLAxx7fAynQTGg5Onwq69GYBgLU4L',
  'sk-KXVDYsPM89Ry008OiLGM9ZYvLXD7sdP1YwhgB9AgeULJSt3v'
];

async function checkStabilityKey(apiKey, index) {
  try {
    console.log(`\n[${index + 1}/${keysToTest.length}] Testing: ${apiKey.substring(0, 20)}...`);
    
    const response = await fetch('https://api.stability.ai/v1/user/balance', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`    ❌ Status: ${response.status} - ${errorText.substring(0, 100)}`);
      return { key: apiKey, valid: false, status: response.status };
    }

    const data = await response.json();
    const credits = data.credits || 0;
    
    let status = '';
    if (credits >= 10) {
      status = '🟢 HIGH';
    } else if (credits >= 0.2) {
      status = '🟡 LOW';
    } else {
      status = '🔴 EMPTY';
    }
    
    console.log(`    ✅ Valid! Credits: ${credits} ${status}`);
    
    return { key: apiKey, valid: true, credits };

  } catch (error) {
    console.log(`    ❌ Error: ${error.message}`);
    return { key: apiKey, valid: false, error: error.message };
  }
}

async function checkAllKeys() {
  console.log('🔍 Checking all keys...\n');
  
  const results = [];
  for (let i = 0; i < keysToTest.length; i++) {
    const result = await checkStabilityKey(keysToTest[i], i);
    results.push(result);
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  
  const validKeys = results.filter(r => r.valid);
  const invalidKeys = results.filter(r => !r.valid);
  
  console.log(`\n✅ Valid Keys: ${validKeys.length}`);
  validKeys.forEach((r, i) => {
    const tier = r.credits >= 10 ? 'HIGH (SDXL)' : r.credits >= 0.2 ? 'LOW (Basic)' : 'EMPTY';
    console.log(`   ${i + 1}. ${r.key.substring(0, 20)}... → ${r.credits} credits (${tier})`);
  });
  
  if (invalidKeys.length > 0) {
    console.log(`\n❌ Invalid Keys: ${invalidKeys.length}`);
    invalidKeys.forEach((r, i) => {
      console.log(`   ${i + 1}. ${r.key.substring(0, 20)}... → ${r.status || r.error}`);
    });
  }
  
  const totalCredits = validKeys.reduce((sum, r) => sum + r.credits, 0);
  console.log(`\n💰 Total Credits: ${totalCredits}`);
  
  return validKeys;
}

checkAllKeys();
