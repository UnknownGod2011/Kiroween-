import keyRotation from './utils/keyRotation.js';

console.log('🧪 Testing Universal API Key Rotation System\n');

// Test 1: Successful API call (no rotation)
console.log('Test 1: Successful API call');
try {
  const result = await keyRotation.executeWithRotation(
    'test-service',
    ['key1', 'key2', 'key3'],
    async (apiKey, attempt) => {
      console.log(`  Attempt ${attempt + 1}: Using ${apiKey}`);
      return { success: true, key: apiKey };
    }
  );
  console.log('  ✅ Result:', result);
} catch (error) {
  console.log('  ❌ Error:', error.message);
}

console.log('\nTest 2: First key fails, second succeeds');
try {
  let callCount = 0;
  const result = await keyRotation.executeWithRotation(
    'test-service-2',
    ['key1', 'key2', 'key3'],
    async (apiKey, attempt) => {
      callCount++;
      console.log(`  Attempt ${attempt + 1}: Using ${apiKey}`);
      
      if (callCount === 1) {
        // First call fails with credit error
        const error = new Error('Insufficient credits');
        error.statusCode = 402;
        throw error;
      }
      
      return { success: true, key: apiKey };
    }
  );
  console.log('  ✅ Result:', result);
} catch (error) {
  console.log('  ❌ Error:', error.message);
}

console.log('\nTest 3: All keys fail');
try {
  const result = await keyRotation.executeWithRotation(
    'test-service-3',
    ['key1', 'key2', 'key3'],
    async (apiKey, attempt) => {
      console.log(`  Attempt ${attempt + 1}: Using ${apiKey}`);
      const error = new Error('Payment required');
      error.statusCode = 402;
      throw error;
    }
  );
  console.log('  ✅ Result:', result);
} catch (error) {
  console.log('  ❌ All keys exhausted:', error.message);
}

console.log('\nTest 4: Network error (no rotation)');
try {
  const result = await keyRotation.executeWithRotation(
    'test-service-4',
    ['key1', 'key2', 'key3'],
    async (apiKey, attempt) => {
      console.log(`  Attempt ${attempt + 1}: Using ${apiKey}`);
      throw new Error('Network timeout');
    }
  );
  console.log('  ✅ Result:', result);
} catch (error) {
  console.log('  ❌ Non-rotatable error (expected):', error.message);
}

console.log('\n✅ All tests complete!');
console.log('\nCheck .key-indices.json to see persistent state:');
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const indexFile = path.join(__dirname, '.key-indices.json');

if (fs.existsSync(indexFile)) {
  const indices = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
  console.log(JSON.stringify(indices, null, 2));
}
