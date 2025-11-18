import fetch from "node-fetch";
import FormData from "form-data";

// All Stability AI keys from .env (including commented ones)
const STABILITY_KEYS = [
  { name: "Key 1 (commented)", key: "sk-hWusW9XAb9Cp9e6Uia3Eul4LoQUlX1UISJ78x4deMajgYKP5" },
  { name: "Key 2 (commented)", key: "sk-MgbvjXD1tpVbUtNplsJ2u3kaV8OK9AQ8hkHLUvr5XXBYU7GK" },
  { name: "Key 3 (commented)", key: "sk-6CPsVJOUPlM5OXu2KQpwKFWdAz56qwPtwTDcnur8GrUHhHbY" },
  { name: "Key 4 (commented)", key: "sk-ahRqeNKQiV4c4R6jmITC8i1aeO55rLgqnT1b4qmjzMI9R3yd" },
  { name: "Key 5 (commented)", key: "sk-5gHNGszzKcHaHaT1mEzX9jDtvQeDdIhH86nao0hkxmRPFdNU" },
  { name: "Key 6 (commented)", key: "sk-ZJfITMOUgQLlMzUm5XfcXJ8VGY1AJwW9DZhdxpYLQ6Glqd2y" },
  { name: "Key 7 (commented)", key: "sk-C7rcHTzmbPPkGnPjgYgvDjOBTzNxcKcFYEKO82tyBHoidSe8" },
  { name: "Key 8 (commented)", key: "sk-dFpwGon4AVtD3rqW1OFRGrrLLM7SvSrKZT4delDJM7uWDCVO" },
  { name: "Key 9 (commented)", key: "sk-BBPOpjmS4Y1z1ZZTncylA3YqrxiNCTprrzzfSZFlkvidEuZ6" },
  { name: "Key 10 (commented)", key: "sk-1XsJBbWKR1PVHyJ2ZwepzIdEXbojrc69w52tNORH3BFdu2fu" },
  { name: "Key 11 (commented)", key: "sk-SaFrKlakQgkVGEwZ1KyuR8e8JMGQa3Hhx4bEgJen9WJH8taj" },
  { name: "Key 12 (ACTIVE)", key: "sk-aWjMEm7mSbHespyOYZiExLD83ZuhrJgYAm6cieO3wukA5zG2" },
];

console.log("🔍 Testing ALL Stability AI Keys...\n");
console.log("Total keys to test:", STABILITY_KEYS.length);
console.log("=".repeat(70) + "\n");

async function testStabilityKey(keyInfo, index) {
  const { name, key } = keyInfo;
  
  console.log(`[${index + 1}/${STABILITY_KEYS.length}] Testing ${name}`);
  console.log(`    Key: ${key.substring(0, 15)}...`);
  
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
          Authorization: `Bearer ${key}`,
          Accept: "application/json",
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`    ❌ FAILED - Status: ${response.status}`);
      
      // Parse error for more details
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.name === "unauthorized") {
          console.log(`    Error: Invalid or expired key`);
        } else {
          console.log(`    Error: ${errorJson.name || errorText.substring(0, 50)}`);
        }
      } catch {
        console.log(`    Error: ${errorText.substring(0, 100)}`);
      }
      return { ...keyInfo, status: "FAILED", error: errorText };
    }

    const data = await response.json();
    console.log(`    ✅ SUCCESS - Key is working!`);
    return { ...keyInfo, status: "SUCCESS" };
    
  } catch (error) {
    console.log(`    ❌ EXCEPTION - ${error.message}`);
    return { ...keyInfo, status: "EXCEPTION", error: error.message };
  } finally {
    console.log(""); // Empty line for readability
  }
}

// Test all keys sequentially
(async () => {
  const results = [];
  
  for (let i = 0; i < STABILITY_KEYS.length; i++) {
    const result = await testStabilityKey(STABILITY_KEYS[i], i);
    results.push(result);
    
    // Small delay between requests to avoid rate limiting
    if (i < STABILITY_KEYS.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // Summary
  console.log("=".repeat(70));
  console.log("📊 FINAL RESULTS:");
  console.log("=".repeat(70));
  
  const working = results.filter(r => r.status === "SUCCESS");
  const failed = results.filter(r => r.status === "FAILED");
  const exceptions = results.filter(r => r.status === "EXCEPTION");
  
  console.log(`\n✅ Working Keys: ${working.length}`);
  working.forEach(r => {
    console.log(`   - ${r.name}: ${r.key.substring(0, 20)}...`);
  });
  
  console.log(`\n❌ Failed Keys: ${failed.length}`);
  if (failed.length > 0) {
    console.log("   (These keys are invalid or expired)");
  }
  
  console.log(`\n⚠️  Exception Keys: ${exceptions.length}`);
  if (exceptions.length > 0) {
    console.log("   (Network or other errors)");
  }
  
  console.log("\n" + "=".repeat(70));
  
  if (working.length > 0) {
    console.log("\n💡 RECOMMENDATION:");
    console.log(`   Use this key in your .env file:`);
    console.log(`   STABILITY_API_KEY=${working[0].key}`);
    console.log(`   (${working[0].name})`);
  } else {
    console.log("\n⚠️  NO WORKING KEYS FOUND!");
    console.log("   You need to generate a new API key from:");
    console.log("   https://platform.stability.ai/account/keys");
  }
  
  console.log("\n");
})();
