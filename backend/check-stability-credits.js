import fetch from 'node-fetch';

const STABILITY_KEYS = [
  'sk-hWusW9XAb9Cp9e6Uia3Eul4LoQUlX1UISJ78x4deMajgYKP5',
  'sk-MgbvjXD1tpVbUtNplsJ2u3kaV8OK9AQ8hkHLUvr5XXBYU7GK',
  'sk-6CPsVJOUPlM5OXu2KQpwKFWdAz56qwPtwTDcnur8GrUHhHbY',
  'sk-ahRqeNKQiV4c4R6jmITC8i1aeO55rLgqnT1b4qmjzMI9R3yd',
  'sk-5gHNGszzKcHaHaT1mEzX9jDtvQeDdIhH86nao0hkxmRPFdNU',
  'sk-ZJfITMOUgQLlMzUm5XfcXJ8VGY1AJwW9DZhdxpYLQ6Glqd2y',
  'sk-C7rcHTzmbPPkGnPjgYgvDjOBTzNxcKcFYEKO82tyBHoidSe8',
  'sk-dFpwGon4AVtD3rqW1OFRGrrLLM7SvSrKZT4delDJM7uWDCVO',
  'sk-BBPOpjmS4Y1z1ZZTncylA3YqrxiNCTprrzzfSZFlkvidEuZ6',
  'sk-1XsJBbWKR1PVHyJ2ZwepzIdEXbojrc69w52tNORH3BFdu2fu',
  'sk-SaFrKlakQgkVGEwZ1KyuR8e8JMGQa3Hhx4bEgJen9WJH8taj',
  'sk-aWjMEm7mSbHespyOYZiExLD83ZuhrJgYAm6cieO3wukA5zG2',
  'sk-wmckHl4oeG7F3w9zrWf1QUJVfbmMn4LKgaaJvYl5a5urZzzS',
  'sk-YAZ3ffB23k1G8D39TYlfD2uRmWcUy1YFxn4j1wUjYoXCJn8h',
  'sk-LJc8E1C7HEFBwMjHHthIaSzyw5M3tob3cP2i3uhBWQ3OO0dY'
];

async function checkCredits(apiKey) {
  try {
    const response = await fetch('https://api.stability.ai/v1/user/balance', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    if (!response.ok) {
      return { key: apiKey, credits: 0, error: `HTTP ${response.status}` };
    }

    const data = await response.json();
    return { key: apiKey, credits: data.credits || 0, error: null };
  } catch (error) {
    return { key: apiKey, credits: 0, error: error.message };
  }
}

async function checkAllKeys() {
  console.log('🔍 Checking Stability API key credits...\n');
  
  const results = [];
  
  for (let i = 0; i < STABILITY_KEYS.length; i++) {
    const key = STABILITY_KEYS[i];
    const shortKey = key.substring(0, 15) + '...' + key.substring(key.length - 10);
    
    process.stdout.write(`[${i + 1}/${STABILITY_KEYS.length}] Checking ${shortKey}... `);
    
    const result = await checkCredits(key);
    results.push(result);
    
    if (result.error) {
      console.log(`❌ Error: ${result.error}`);
    } else if (result.credits > 0) {
      console.log(`✅ ${result.credits} credits`);
    } else {
      console.log(`⚠️ No credits`);
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n📊 Summary:');
  console.log('─'.repeat(60));
  
  const withCredits = results.filter(r => r.credits > 0);
  const noCredits = results.filter(r => r.credits === 0);
  
  console.log(`\n✅ Keys with credits: ${withCredits.length}`);
  withCredits.forEach(r => {
    const shortKey = r.key.substring(0, 15) + '...' + r.key.substring(r.key.length - 10);
    console.log(`   ${shortKey}: ${r.credits} credits`);
  });
  
  console.log(`\n⚠️ Keys without credits: ${noCredits.length}`);
  noCredits.forEach(r => {
    const shortKey = r.key.substring(0, 15) + '...' + r.key.substring(r.key.length - 10);
    console.log(`   ${shortKey}`);
  });
  
  return results;
}

checkAllKeys();
