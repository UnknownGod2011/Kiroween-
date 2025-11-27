import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Persistent index storage file
const INDEX_FILE = path.join(__dirname, '..', '.key-indices.json');

/**
 * Universal API Key Rotation Manager
 * 
 * Features:
 * - Failure-triggered rotation (no pre-validation)
 * - Persistent index tracking across restarts
 * - Automatic retry with next key
 * - Resets to 0 when all keys exhausted
 * - Scales to 50+ keys per provider
 */
class KeyRotationManager {
  constructor() {
    this.indices = this.loadIndices();
  }

  /**
   * Load persistent indices from file
   */
  loadIndices() {
    try {
      if (fs.existsSync(INDEX_FILE)) {
        const data = fs.readFileSync(INDEX_FILE, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      // Ignore errors, start fresh
    }
    return {};
  }

  /**
   * Save indices to persistent storage
   */
  saveIndices() {
    try {
      fs.writeFileSync(INDEX_FILE, JSON.stringify(this.indices, null, 2));
    } catch (error) {
      // Ignore save errors
    }
  }

  /**
   * Get current index for a service
   */
  getCurrentIndex(service) {
    return this.indices[service] || 0;
  }

  /**
   * Increment index and save
   */
  incrementIndex(service, maxKeys) {
    const currentIndex = this.getCurrentIndex(service);
    const nextIndex = (currentIndex + 1) % maxKeys;
    this.indices[service] = nextIndex;
    this.saveIndices();
    return nextIndex;
  }

  /**
   * Reset index to 0 (when all keys exhausted)
   */
  resetIndex(service) {
    this.indices[service] = 0;
    this.saveIndices();
  }

  /**
   * Check if error is credit/auth related (should trigger rotation)
   */
  isRotatableError(error, statusCode) {
    // HTTP status codes that indicate key issues
    const rotatableStatuses = [
      401, // Unauthorized
      402, // Payment Required
      403, // Forbidden
      429  // Too Many Requests / Rate Limit
    ];

    if (rotatableStatuses.includes(statusCode)) {
      return true;
    }

    // Error message patterns
    const errorStr = (error?.message || error?.toString() || '').toLowerCase();
    const rotatablePatterns = [
      'insufficient',
      'credit',
      'quota',
      'payment',
      'unauthorized',
      'forbidden',
      'invalid',
      'expired',
      'disabled',
      'limit',
      'balance'
    ];

    return rotatablePatterns.some(pattern => errorStr.includes(pattern));
  }

  /**
   * Execute API call with automatic key rotation
   * 
   * @param {string} service - Service name (e.g., 'stability', 'removebg', 'miragic')
   * @param {Array} keys - Array of API keys
   * @param {Function} apiCall - Async function that takes (apiKey, attempt) and returns response
   * @returns {Promise} - API response or throws error if all keys fail
   */
  async executeWithRotation(service, keys, apiCall) {
    if (!keys || keys.length === 0) {
      throw new Error(`No API keys configured for ${service}`);
    }

    const maxAttempts = keys.length;
    let lastError = null;
    let startIndex = this.getCurrentIndex(service);

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const currentIndex = (startIndex + attempt) % keys.length;
      const currentKey = keys[currentIndex];

      try {
        // Execute API call with current key
        const result = await apiCall(currentKey, attempt);
        
        // Success! Update index if we rotated
        if (attempt > 0) {
          this.indices[service] = currentIndex;
          this.saveIndices();
        }
        
        return result;

      } catch (error) {
        lastError = error;
        const statusCode = error.statusCode || error.status || error.response?.status;

        // Check if this is a rotatable error
        if (this.isRotatableError(error, statusCode)) {
          // Try next key
          if (attempt < maxAttempts - 1) {
            continue;
          }
        } else {
          // Non-rotatable error (network, etc.) - throw immediately
          throw error;
        }
      }
    }

    // All keys exhausted - reset to 0 for next time
    this.resetIndex(service);

    // Throw the last error (will be caught by caller)
    throw lastError;
  }
}

// Singleton instance
const keyRotation = new KeyRotationManager();

export default keyRotation;
