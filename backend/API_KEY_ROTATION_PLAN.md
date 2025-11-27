# 🔄 API Key Rotation Implementation Plan

## ✅ Current Status (Completed)

### Phase 1: Credit Detection & Organization
- ✅ Scanned all Stability API keys in .env
- ✅ Checked remaining credits for each key
- ✅ Reorganized .env file:
  - **NO credits section**: 6 keys (commented out)
  - **ACTIVE credits section**: 9 keys (1 active, 8 backup)
  - **Other API keys**: Preserved unchanged

### Credit Summary
```
Active Key:  sk-wmckHl4oeG7F...l5a5urZzzS (25 credits)
Backup Keys: 8 keys available
  - sk-YAZ3ffB23k1G...UjYoXCJn8h (25 credits)
  - sk-LJc8E1C7HEFB...hBWQ3OO0dY (11 credits)
  - sk-hWusW9XAb9Cp...deMajgYKP5 (1 credit)
  - sk-6CPsVJOUPlM5...r8GrUHhHbY (1 credit)
  - sk-5gHNGszzKcHa...hkxmRPFdNU (1 credit)
  - sk-ZJfITMOUgQLl...YLQ6Glqd2y (1 credit)
  - sk-BBPOpjmS4Y1z...FlkvidEuZ6 (1 credit)
  - sk-1XsJBbWKR1PV...RH3BFdu2fu (1 credit)

Total Available: ~62 credits
```

---

## 🚀 Phase 2: Automatic Key Rotation (Future Implementation)

### Overview
Implement intelligent API key rotation to automatically switch to backup keys when credits are exhausted.

### Implementation Strategy

#### 1. Key Management System
```javascript
// backend/utils/keyManager.js
class APIKeyManager {
  constructor() {
    this.stabilityKeys = [
      'sk-wmckHl4oeG7F3w9zrWf1QUJVfbmMn4LKgaaJvYl5a5urZzzS',
      'sk-YAZ3ffB23k1G8D39TYlfD2uRmWcUy1YFxn4j1wUjYoXCJn8h',
      'sk-LJc8E1C7HEFBwMjHHthIaSzyw5M3tob3cP2i3uhBWQ3OO0dY',
      // ... other keys with credits
    ];
    this.currentKeyIndex = 0;
    this.loadLastUsedIndex();
  }

  getCurrentKey() {
    return this.stabilityKeys[this.currentKeyIndex];
  }

  rotateToNextKey() {
    this.currentKeyIndex = (this.currentKeyIndex + 1) % this.stabilityKeys.length;
    this.saveCurrentIndex();
    return this.getCurrentKey();
  }

  async checkAndRotate() {
    const currentKey = this.getCurrentKey();
    const hasCredits = await this.checkCredits(currentKey);
    
    if (!hasCredits) {
      return this.rotateToNextKey();
    }
    
    return currentKey;
  }

  saveCurrentIndex() {
    // Persist to file or database
    fs.writeFileSync('.key-index', this.currentKeyIndex.toString());
  }

  loadLastUsedIndex() {
    // Load from file or database
    if (fs.existsSync('.key-index')) {
      this.currentKeyIndex = parseInt(fs.readFileSync('.key-index', 'utf8'));
    }
  }
}
```

#### 2. Integration with Stability API Calls
```javascript
// backend/index.sd.js (modified)
import { APIKeyManager } from './utils/keyManager.js';

const keyManager = new APIKeyManager();

app.post('/generate-design', async (req, res) => {
  let attempts = 0;
  const maxAttempts = keyManager.stabilityKeys.length;

  while (attempts < maxAttempts) {
    try {
      const apiKey = await keyManager.checkAndRotate();
      
      const response = await fetch('https://api.stability.ai/v1/generation/...', {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      if (response.status === 402) {
        // Payment required - no credits
        console.log(`Key exhausted, rotating to next key...`);
        keyManager.rotateToNextKey();
        attempts++;
        continue;
      }

      // Success - return result
      return res.json({ success: true, ... });

    } catch (error) {
      attempts++;
    }
  }

  // All keys exhausted
  return res.status(402).json({
    error: 'All API keys have exhausted their credits. Please add more credits or keys.'
  });
});
```

#### 3. Credit Monitoring
```javascript
// backend/utils/creditMonitor.js
class CreditMonitor {
  async checkAllKeys() {
    const results = [];
    
    for (const key of keyManager.stabilityKeys) {
      const credits = await this.getCredits(key);
      results.push({ key, credits });
    }
    
    return results;
  }

  async getCredits(apiKey) {
    const response = await fetch('https://api.stability.ai/v1/user/balance', {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    
    const data = await response.json();
    return data.credits || 0;
  }

  async logCreditStatus() {
    const results = await this.checkAllKeys();
    console.log('📊 Credit Status:');
    results.forEach((r, i) => {
      console.log(`  Key ${i + 1}: ${r.credits} credits`);
    });
  }
}
```

---

## 🔧 Phase 3: Multi-Service Key Rotation

### Extend to Other Services

#### 1. Remove.bg API Keys
```javascript
class RemoveBGKeyManager extends APIKeyManager {
  constructor() {
    super();
    this.keys = [
      'kHUZqfQXm78bwozEUbXsnESN',
      'xTa8e9CMGcm9564XvhDeP8Pn',
      // Add more keys
    ];
  }
}
```

#### 2. Miragic API Keys
```javascript
class MiragicKeyManager extends APIKeyManager {
  constructor() {
    super();
    this.keys = [
      'sk_live_S09r-1230IkIW8D0iq37B1OziRR8GR6_0p4aa8WCZkY',
      // Add more keys
    ];
  }
}
```

#### 3. Unified Key Manager
```javascript
// backend/utils/unifiedKeyManager.js
class UnifiedKeyManager {
  constructor() {
    this.stability = new StabilityKeyManager();
    this.removeBG = new RemoveBGKeyManager();
    this.miragic = new MiragicKeyManager();
  }

  getKey(service) {
    switch(service) {
      case 'stability': return this.stability.getCurrentKey();
      case 'removebg': return this.removeBG.getCurrentKey();
      case 'miragic': return this.miragic.getCurrentKey();
    }
  }

  async rotateKey(service) {
    switch(service) {
      case 'stability': return this.stability.rotateToNextKey();
      case 'removebg': return this.removeBG.rotateToNextKey();
      case 'miragic': return this.miragic.rotateToNextKey();
    }
  }
}
```

---

## 📋 Implementation Checklist

### Phase 2: Basic Rotation
- [ ] Create `backend/utils/keyManager.js`
- [ ] Implement `APIKeyManager` class
- [ ] Add persistence for current key index
- [ ] Integrate with `backend/index.sd.js`
- [ ] Test rotation on credit exhaustion
- [ ] Add logging for key switches

### Phase 3: Advanced Features
- [ ] Create `backend/utils/creditMonitor.js`
- [ ] Add scheduled credit checks (daily)
- [ ] Implement email/notification on low credits
- [ ] Create admin dashboard for key status
- [ ] Add key performance metrics

### Phase 4: Multi-Service Support
- [ ] Extend to Remove.bg keys
- [ ] Extend to Miragic keys
- [ ] Create unified key manager
- [ ] Add service-specific error handling
- [ ] Implement cross-service credit tracking

---

## 🎯 Benefits

### Current Benefits (Phase 1)
✅ Clear visibility of key status  
✅ Organized .env structure  
✅ Easy to add new keys  
✅ Credit summary at a glance  

### Future Benefits (Phase 2-4)
🚀 Zero downtime on credit exhaustion  
🚀 Automatic failover to backup keys  
🚀 Persistent key rotation state  
🚀 Multi-service key management  
🚀 Credit monitoring and alerts  
🚀 Optimized key usage  

---

## 📝 Notes

### Error Handling
- Current error message preserved: "Credits exhausted"
- Only shown when ALL keys are exhausted
- No UI changes required

### Constraints
- No refactoring of unrelated code
- Maintain existing API response format
- Keep current error messages
- Zero breaking changes

### Scalability
- Easy to add new keys to .env
- Automatic detection of new keys
- Support for unlimited backup keys
- Service-agnostic architecture

---

**Status**: Phase 1 Complete ✅  
**Next**: Implement Phase 2 when ready  
**Priority**: Medium (current setup works, rotation adds resilience)
