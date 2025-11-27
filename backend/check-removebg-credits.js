import fetch from 'node-fetch';

const apiKey = 'xTa8e9CMGcm9564XvhDeP8Pn';

async function checkRemoveBgCredits() {
  try {
    console.log('🔍 Checking Remove.bg API credits...\n');
    
    // Remove.bg account info endpoint
    const response = await fetch('https://api.remove.bg/v1.0/account', {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey
      }
    });

    console.log(`Status: ${response.status}\n`);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ Error:', errorText);
      return;
    }

    const data = await response.json();
    
    console.log('✅ Account Information:');
    console.log(JSON.stringify(data, null, 2));
    
    // Parse credits info
    if (data.data) {
      const account = data.data.attributes;
      console.log('\n📊 Credit Summary:');
      console.log(`  API Calls: ${account.api?.free_calls || 0} free calls remaining`);
      console.log(`  Credits: ${account.credits?.total || 0} total credits`);
      
      if (account.api?.sizes) {
        console.log('\n📏 Available Sizes:');
        console.log(`  ${account.api.sizes}`);
      }
    }
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

checkRemoveBgCredits();
