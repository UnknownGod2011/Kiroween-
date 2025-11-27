# 🔍 API Key Audit Results

**Date**: November 25, 2025  
**Status**: ✅ Complete

---

## 📊 Stability API Keys Summary

### Credit Cost Reference
| Operation | Model | Credits per Generation |
|-----------|-------|----------------------|
| Text-to-Image | SD 1.6 (512x512) | 0.2 credits |
| Text-to-Image | SDXL (1024x1024) | 6.5 credits |
| Image-to-Image | SD 1.6 (512x512) | 0.2 credits |
| Image-to-Image | SDXL (1024x1024) | 6.5 credits |

### Minimum Credit Thresholds
- **0.2 credits**: Absolute minimum (1 basic operation)
- **6.5 credits**: Minimum for SDXL operations
- **10 credits**: Recommended minimum (safe for multiple operations)

### Keys with 10+ Credits (3 total) - FULL CAPABILITY
| # | Key (truncated) | Credits | Capability |
|---|----------------|---------|------------|
| 1 | sk-wmckHl4oeG7F...l5a5urZzzS | 25 | 🟢 **ACTIVE** - All operations |
| 2 | sk-YAZ3ffB23k1G...UjYoXCJn8h | 25 | 🟡 Backup - All operations |
| 3 | sk-LJc8E1C7HEFB...hBWQ3OO0dY | 11 | 🟡 Backup - All operations |

### Keys with 1-9 Credits (6 total) - LIMITED CAPABILITY
| # | Key (truncated) | Credits | Capability |
|---|----------------|---------|------------|
| 4 | sk-hWusW9XAb9Cp...deMajgYKP5 | 1 | ⚠️ Basic only (SD 1.6) |
| 5 | sk-6CPsVJOUPlM5...r8GrUHhHbY | 1 | ⚠️ Basic only (SD 1.6) |
| 6 | sk-5gHNGszzKcHa...hkxmRPFdNU | 1 | ⚠️ Basic only (SD 1.6) |
| 7 | sk-ZJfITMOUgQLl...YLQ6Glqd2y | 1 | ⚠️ Basic only (SD 1.6) |
| 8 | sk-BBPOpjmS4Y1z...FlkvidEuZ6 | 1 | ⚠️ Basic only (SD 1.6) |
| 9 | sk-1XsJBbWKR1PV...RH3BFdu2fu | 1 | ⚠️ Basic only (SD 1.6) |

**Total Available Credits**: ~67 credits  
**Full Capability Keys**: 3 keys (~61 credits)  
**Limited Capability Keys**: 6 keys (~6 credits, basic operations only)

### Keys without Credits (6 total)
| # | Key (truncated) | Status |
|---|----------------|--------|
| 1 | sk-MgbvjXD1tpVb...r5XXBYU7GK | ❌ Exhausted |
| 2 | sk-ahRqeNKQiV4c...mjzMI9R3yd | ❌ Exhausted |
| 3 | sk-C7rcHTzmbPPk...tyBHoidSe8 | ❌ Exhausted |
| 4 | sk-dFpwGon4AVtD...DJM7uWDCVO | ❌ Exhausted |
| 5 | sk-SaFrKlakQgkV...en9WJH8taj | ❌ Exhausted |
| 6 | sk-aWjMEm7mSbHe...O3wukA5zG2 | ❌ Invalid/Expired |

---

## 📁 .env File Organization

### Structure
```
# ============================================
# Stability API Keys - NO credits remaining
# ============================================
[6 exhausted keys - commented out]

# ============================================
# Stability API Keys - ACTIVE (10+ credits)
# ============================================
[1 active key - uncommented]
[2 backup keys - commented out, full capability]

# ============================================
# Stability API Keys - LIMITED (1-9 credits)
# ============================================
[6 limited keys - commented out, basic operations only]

# ============================================
# Remove.bg API Keys
# ============================================
[1 active key - uncommented]
[1 backup key - commented out]

# ============================================
# Miragic API Key
# ============================================
[1 active key - uncommented]

# ============================================
# Other API Keys
# ============================================
[OPENAI, LIGHTX, GEMINI - preserved]
```

### Benefits
✅ Clear separation of working vs exhausted keys  
✅ Easy to activate backup keys  
✅ Credit status visible at a glance  
✅ Ready for automatic rotation implementation  

---

## ⚠️ Credit Thresholds & Usability

### Understanding Credit Requirements

#### Text-to-Image Generation
- **SD 1.6 (512x512)**: 0.2 credits per image
- **SDXL (1024x1024)**: 6.5 credits per image

#### Image-to-Image Generation
- **SD 1.6 (512x512)**: 0.2 credits per image
- **SDXL (1024x1024)**: 6.5 credits per image

### Key Usability Levels

| Credits | Status | Capability |
|---------|--------|------------|
| 10+ | ✅ **Full** | Can handle both SD 1.6 and SDXL operations |
| 6.5-9.9 | ⚠️ **Limited** | Can do 1 SDXL OR multiple SD 1.6 operations |
| 0.2-6.4 | ⚠️ **Basic Only** | Can only do SD 1.6 operations (no SDXL) |
| <0.2 | ❌ **Unusable** | Cannot perform any operations |

### Current Key Distribution
- **Full Capability (10+)**: 3 keys = ~61 credits
- **Limited (1-9)**: 6 keys = ~6 credits (basic only)
- **Unusable (<0.2)**: 6 keys = 0 credits

### Important Notes
⚠️ Keys with 1 credit can only do **5 basic operations** (SD 1.6)  
⚠️ Keys with 1 credit **cannot** do SDXL operations (requires 6.5)  
⚠️ Keys become **completely unusable** when credits drop below 0.2  
✅ Recommended to rotate keys before they drop below 10 credits  

---

## 🔄 Rotation Strategy (Future)

### Current Setup
- **Active**: 1 key with 25 credits (full capability)
- **Full Capability Backup**: 2 keys (25 + 11 = 36 credits)
- **Limited Capability Backup**: 6 keys (~6 credits, basic only)
- **Total Capacity**: ~67 credits available

### When Active Key Exhausts
1. Automatically switch to next backup key
2. Continue seamlessly without user interruption
3. Only show error when ALL 9 keys are exhausted

### Key Rotation Order
```
1. sk-wmckHl4oeG7F...l5a5urZzzS (25 credits) ← Current
2. sk-YAZ3ffB23k1G...UjYoXCJn8h (25 credits)
3. sk-LJc8E1C7HEFB...hBWQ3OO0dY (11 credits)
4. sk-hWusW9XAb9Cp...deMajgYKP5 (1 credit)
5. sk-6CPsVJOUPlM5...r8GrUHhHbY (1 credit)
6. sk-5gHNGszzKcHa...hkxmRPFdNU (1 credit)
7. sk-ZJfITMOUgQLl...YLQ6Glqd2y (1 credit)
8. sk-BBPOpjmS4Y1z...FlkvidEuZ6 (1 credit)
9. sk-1XsJBbWKR1PV...RH3BFdu2fu (1 credit)
```

---

## 🛠️ Tools Created

### 1. Credit Checker Script
**File**: `backend/check-stability-credits.js`

**Usage**:
```bash
cd backend
node check-stability-credits.js
```

**Features**:
- Checks all Stability API keys
- Shows credit balance for each
- Identifies exhausted keys
- Provides summary report

### 2. Implementation Plan
**File**: `backend/API_KEY_ROTATION_PLAN.md`

**Contents**:
- Phase 1: Credit detection (✅ Complete)
- Phase 2: Automatic rotation (📋 Planned)
- Phase 3: Multi-service support (📋 Planned)
- Code examples and architecture

---

## 📈 Recommendations

### Immediate Actions
1. ✅ **Done**: Reorganized .env file
2. ✅ **Done**: Documented credit status
3. ✅ **Done**: Created rotation plan

### Short-term (Optional)
- Add more Stability API keys to increase capacity
- Implement Phase 2 rotation when needed
- Set up credit monitoring alerts

### Long-term
- Extend rotation to Remove.bg keys
- Extend rotation to Miragic keys
- Create admin dashboard for key management
- Implement usage analytics

---

## 🎯 Impact

### Before Audit
- ❌ Mixed active/exhausted keys
- ❌ No visibility of credit status
- ❌ Manual key switching required
- ❌ Service interruption on exhaustion

### After Audit
- ✅ Clear organization by credit status
- ✅ Full visibility of available credits
- ✅ Ready for automatic rotation
- ✅ 9 keys available for seamless operation

---

## 📝 Notes

- All keys checked on November 25, 2025
- Credit balances may change with usage
- Re-run `check-stability-credits.js` to update status
- Exhausted keys kept for reference (can be deleted if needed)

---

**Audit Completed By**: Kiro AI Assistant  
**Next Review**: When implementing Phase 2 rotation
