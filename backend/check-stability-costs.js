// Stability AI Credit Costs Reference
// Source: https://platform.stability.ai/docs/api-reference

const STABILITY_COSTS = {
  // Text-to-Image Generation
  'text-to-image': {
    'stable-diffusion-xl-1024-v1-0': 6.5,  // SDXL 1024x1024
    'stable-diffusion-v1-6': 0.2,          // SD 1.6 512x512
    'stable-diffusion-xl-beta-v2-2-2': 6.5 // SDXL Beta
  },
  
  // Image-to-Image
  'image-to-image': {
    'stable-diffusion-xl-1024-v1-0': 6.5,  // SDXL 1024x1024
    'stable-diffusion-v1-6': 0.2,          // SD 1.6 512x512
  },
  
  // Upscaling
  'upscale': {
    'esrgan-v1-x2plus': 0.2,  // 2x upscale
    'stable-diffusion-x4-latent-upscaler': 25  // 4x upscale
  }
};

// Minimum credits needed for operations
const MIN_CREDITS_REQUIRED = {
  'text-to-image-basic': 0.2,      // Minimum for SD 1.6
  'text-to-image-xl': 6.5,         // Minimum for SDXL
  'image-to-image-basic': 0.2,     // Minimum for SD 1.6
  'image-to-image-xl': 6.5,        // Minimum for SDXL
  'recommended-minimum': 10        // Safe minimum for multiple operations
};

console.log('📊 Stability AI Credit Costs\n');
console.log('Text-to-Image:');
console.log('  - SD 1.6 (512x512): 0.2 credits');
console.log('  - SDXL (1024x1024): 6.5 credits');
console.log('\nImage-to-Image:');
console.log('  - SD 1.6 (512x512): 0.2 credits');
console.log('  - SDXL (1024x1024): 6.5 credits');
console.log('\n⚠️ Minimum Credits Needed:');
console.log('  - Basic operation: 0.2 credits');
console.log('  - SDXL operation: 6.5 credits');
console.log('  - Recommended minimum: 10 credits');
console.log('\n💡 Keys with <10 credits are limited to basic operations only');
console.log('💡 Keys with <0.2 credits are completely unusable');
