import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from backend/.env
dotenv.config({ path: path.join(__dirname, '..', '.env') });

/**
 * API Keys loaded from environment variables
 * 
 * To use rotation:
 * 1. Add multiple keys to .env with suffixes:
 *    STABILITY_API_KEY=key1
 *    STABILITY_API_KEY_2=key2
 *    STABILITY_API_KEY_3=key3
 * 
 * 2. Or use comma-separated values:
 *    STABILITY_API_KEYS=key1,key2,key3
 */

// Helper to load multiple keys from env
function loadKeys(prefix) {
  const keys = [];
  
  // Try comma-separated first (e.g., STABILITY_API_KEYS=key1,key2,key3)
  const multiKey = process.env[`${prefix}S`];
  if (multiKey) {
    return multiKey.split(',').map(k => k.trim()).filter(k => k.length > 0);
  }
  
  // Try single key (e.g., STABILITY_API_KEY=key1)
  const singleKey = process.env[prefix];
  if (singleKey) {
    keys.push(singleKey);
  }
  
  // Try numbered keys (e.g., STABILITY_API_KEY_2=key2)
  let i = 2;
  while (process.env[`${prefix}_${i}`]) {
    keys.push(process.env[`${prefix}_${i}`]);
    i++;
  }
  
  return keys.filter(k => k && k.length > 0);
}

// Export key arrays
export const STABILITY_KEYS = loadKeys('STABILITY_API_KEY');
export const REMOVEBG_KEYS = loadKeys('REMOVE_BG_API_KEY');
export const MIRAGIC_KEYS = loadKeys('MIRAGIC_API_KEY');

// Log key counts (not the actual keys!)
console.log('🔑 API Keys Loaded:');
console.log(`  - Stability AI: ${STABILITY_KEYS.length} key(s)`);
console.log(`  - Remove.bg: ${REMOVEBG_KEYS.length} key(s)`);
console.log(`  - Miragic: ${MIRAGIC_KEYS.length} key(s)`);

// Validate at least one key exists for each service
if (STABILITY_KEYS.length === 0) {
  console.warn('⚠️  No Stability AI keys found in .env');
}
if (REMOVEBG_KEYS.length === 0) {
  console.warn('⚠️  No Remove.bg keys found in .env');
}
if (MIRAGIC_KEYS.length === 0) {
  console.warn('⚠️  No Miragic keys found in .env');
}
