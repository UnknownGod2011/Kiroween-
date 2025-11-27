# API Key Rotation Flow Diagram

## Complete System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│  (React App - Sends requests to backend)                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND ROUTES                                │
│                                                                  │
│  1. POST /generate-design  → Stability Text-to-Image            │
│  2. POST /haunted-image    → Stability Image-to-Image           │
│  3. POST /api/miragic/tryon → Miragic Virtual Try-On           │
│  4. GET /api/miragic/tryon/:id → Check Try-On Status           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   API WRAPPERS                                   │
│              (utils/apiWrappers.js)                             │
│                                                                  │
│  • stabilityTextToImage()                                       │
│  • stabilityImageToImage()                                      │
│  • removeBg()                                                   │
│  • miragicTryOn()                                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              KEY ROTATION MANAGER                                │
│              (utils/keyRotation.js)                             │
│                                                                  │
│  executeWithRotation(service, keys, apiCall)                   │
│                                                                  │
│  ┌──────────────────────────────────────────────────┐          │
│  │  1. Get current index from .key-indices.json     │          │
│  │  2. Try API call with keys[index]                │          │
│  │  3. If success → return result                   │          │
│  │  4. If rotatable error → try keys[index+1]       │          │
│  │  5. If non-rotatable error → throw immediately   │          │
│  │  6. If all keys fail → reset index, throw error  │          │
│  └──────────────────────────────────────────────────┘          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API KEYS LOADER                               │
│                  (utils/apiKeys.js)                             │
│                                                                  │
│  Loads from .env:                                               │
│  • STABILITY_API_KEY(S)                                         │
│  • REMOVE_BG_API_KEY(S)                                         │
│  • MIRAGIC_API_KEY(S)                                           │
│                                                                  │
│  Exports:                                                        │
│  • STABILITY_KEYS = [key1, key2, ...]                          │
│  • REMOVEBG_KEYS = [key1, key2, ...]                           │
│  • MIRAGIC_KEYS = [key1, key2, ...]                            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ENVIRONMENT FILE                              │
│                     (backend/.env)                              │
│                                                                  │
│  STABILITY_API_KEY=sk-wmckHl4oeG7F3w9zrWf1QUJVfbmMn4LKgaaJ...  │
│  REMOVE_BG_API_KEY=kHUZqfQXm78bwozEUbXsnESN                     │
│  MIRAGIC_API_KEY=sk_live_S09r-1230IkIW8D0iq37B1OziRR8GR6_...   │
│                                                                  │
│  🔒 NEVER COMMITTED TO GIT (in .gitignore)                      │
└─────────────────────────────────────────────────────────────────┘
```

## Example: Stability AI Text-to-Image Flow

```
User clicks "Generate Design"
         │
         ▼
Frontend sends POST /generate-design
         │
         ▼
index.sd.js receives request
         │
         ▼
Calls: stabilityTextToImage(prompt, options)
         │
         ▼
apiWrappers.js → keyRotation.executeWithRotation('stability', STABILITY_KEYS, ...)
         │
         ▼
┌────────────────────────────────────────────────────────────┐
│ Rotation Manager:                                          │
│                                                            │
│ Attempt 1: Try STABILITY_KEYS[0]                          │
│   ├─ Success? → Return result ✅                          │
│   └─ Error 402? → Continue to Attempt 2                   │
│                                                            │
│ Attempt 2: Try STABILITY_KEYS[1]                          │
│   ├─ Success? → Return result ✅                          │
│   └─ Error 402? → Continue to Attempt 3                   │
│                                                            │
│ Attempt 3: Try STABILITY_KEYS[2]                          │
│   ├─ Success? → Return result ✅                          │
│   └─ Error 402? → All keys exhausted ❌                   │
│                                                            │
│ All keys failed → Throw error                             │
└────────────────────────────────────────────────────────────┘
         │
         ▼
Error returned to index.sd.js
         │
         ▼
User-friendly error sent to frontend
         │
         ▼
User sees: "All API keys have exhausted their credits"
```

## Example: Miragic Virtual Try-On Flow

```
User uploads photo and clicks "Try On"
         │
         ▼
Frontend sends POST /api/miragic/tryon
         │
         ▼
miragic-tryon.js receives request
         │
         ▼
Calls: keyRotation.executeWithRotation('miragic', MIRAGIC_KEYS, ...)
         │
         ▼
┌────────────────────────────────────────────────────────────┐
│ Rotation Manager:                                          │
│                                                            │
│ Attempt 1: Try MIRAGIC_KEYS[0]                            │
│   ├─ Success? → Return jobId ✅                           │
│   └─ Error 401? → Continue to Attempt 2                   │
│                                                            │
│ Attempt 2: Try MIRAGIC_KEYS[1]                            │
│   ├─ Success? → Return jobId ✅                           │
│   └─ Error 401? → Continue to Attempt 3                   │
│                                                            │
│ ... continues for all keys ...                            │
└────────────────────────────────────────────────────────────┘
         │
         ▼
jobId returned to frontend
         │
         ▼
Frontend polls GET /api/miragic/tryon/:jobId
         │
         ▼
miragic-tryon.js checks status (also uses rotation!)
         │
         ▼
Status returned to frontend
         │
         ▼
User sees progress → Final result
```

## Persistent Index Tracking

```
┌─────────────────────────────────────────────────────────────┐
│              .key-indices.json                              │
│                                                             │
│  {                                                          │
│    "stability": 0,    ← Currently using STABILITY_KEYS[0]  │
│    "removebg": 0,     ← Currently using REMOVEBG_KEYS[0]   │
│    "miragic": 2       ← Currently using MIRAGIC_KEYS[2]    │
│  }                                                          │
│                                                             │
│  • Updated after each rotation                             │
│  • Persists across server restarts                         │
│  • Resets to 0 when all keys exhausted                     │
└─────────────────────────────────────────────────────────────┘
```

## Error Handling Flow

```
API Call Made
     │
     ▼
┌─────────────────────────────────────────┐
│ Check Response Status                   │
└─────────────────────────────────────────┘
     │
     ├─ 200 OK → Return result ✅
     │
     ├─ 401/402/403/429 → ROTATABLE ERROR
     │   │
     │   ├─ More keys available?
     │   │   ├─ Yes → Try next key 🔄
     │   │   └─ No → Throw error ❌
     │   │
     │   └─ Error message contains "credit", "quota", etc?
     │       ├─ Yes → Try next key 🔄
     │       └─ No → Throw error ❌
     │
     └─ 500/Network Error → NON-ROTATABLE ERROR
         └─ Throw immediately ❌
```

## Adding More Keys

```
BEFORE (1 key per service):
┌──────────────────────────────────┐
│ .env                             │
│                                  │
│ STABILITY_API_KEY=key1           │
│ REMOVE_BG_API_KEY=key1           │
│ MIRAGIC_API_KEY=key1             │
└──────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Loaded Arrays:                   │
│                                  │
│ STABILITY_KEYS = [key1]          │
│ REMOVEBG_KEYS = [key1]           │
│ MIRAGIC_KEYS = [key1]            │
└──────────────────────────────────┘

AFTER (multiple keys):
┌──────────────────────────────────┐
│ .env                             │
│                                  │
│ STABILITY_API_KEYS=k1,k2,k3      │
│ REMOVE_BG_API_KEYS=k1,k2         │
│ MIRAGIC_API_KEYS=k1,k2,k3,k4     │
└──────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Loaded Arrays:                   │
│                                  │
│ STABILITY_KEYS = [k1, k2, k3]    │
│ REMOVEBG_KEYS = [k1, k2]         │
│ MIRAGIC_KEYS = [k1, k2, k3, k4]  │
└──────────────────────────────────┘
```

## Summary

✅ **Every API call** goes through rotation  
✅ **Automatic failover** on credit/auth errors  
✅ **Persistent tracking** across restarts  
✅ **No code changes** needed to add keys  
✅ **Secure** - keys never exposed on GitHub  

Your rotation system is **production-ready**! 🎉
