import keyRotation from './keyRotation.js';
import { STABILITY_KEYS, REMOVEBG_KEYS, MIRAGIC_KEYS } from './apiKeys.js';
import fetch from 'node-fetch';
import FormData from 'form-data';

/**
 * Stability AI - Text-to-Image with automatic key rotation
 */
export async function stabilityTextToImage(prompt, options = {}) {
  return await keyRotation.executeWithRotation(
    'stability',
    STABILITY_KEYS,
    async (apiKey, attempt) => {
      const formData = new FormData();
      formData.append('prompt', prompt);
      formData.append('aspect_ratio', options.aspectRatio || '1:1');
      formData.append('output_format', options.outputFormat || 'png');

      const response = await fetch(
        'https://api.stability.ai/v2beta/stable-image/generate/core',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Accept': 'application/json'
          },
          body: formData
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        const error = new Error(errorText);
        error.statusCode = response.status;
        throw error;
      }

      return await response.json();
    }
  );
}

/**
 * Stability AI - Image-to-Image with automatic key rotation
 */
export async function stabilityImageToImage(imageStream, prompt, options = {}) {
  return await keyRotation.executeWithRotation(
    'stability',
    STABILITY_KEYS,
    async (apiKey, attempt) => {
      const formData = new FormData();
      formData.append('image', imageStream);
      formData.append('prompt', prompt);
      formData.append('mode', 'image-to-image');
      formData.append('strength', options.strength || '0.65');
      formData.append('output_format', options.outputFormat || 'png');

      const response = await fetch(
        'https://api.stability.ai/v2beta/stable-image/generate/sd3',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Accept': 'application/json'
          },
          body: formData
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        const error = new Error(errorText);
        error.statusCode = response.status;
        throw error;
      }

      return await response.json();
    }
  );
}

/**
 * Remove.bg - Background removal with automatic key rotation
 */
export async function removeBg(imageStream, options = {}) {
  return await keyRotation.executeWithRotation(
    'removebg',
    REMOVEBG_KEYS,
    async (apiKey, attempt) => {
      const formData = new FormData();
      formData.append('image_file', imageStream);
      formData.append('size', options.size || 'auto');

      const response = await fetch(
        'https://api.remove.bg/v1.0/removebg',
        {
          method: 'POST',
          headers: {
            'X-Api-Key': apiKey
          },
          body: formData
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        const error = new Error(errorText);
        error.statusCode = response.status;
        throw error;
      }

      return await response.buffer();
    }
  );
}

/**
 * Miragic - Virtual Try-On with automatic key rotation
 */
export async function miragicTryOn(personImage, clothImage) {
  return await keyRotation.executeWithRotation(
    'miragic',
    MIRAGIC_KEYS,
    async (apiKey, attempt) => {
      const response = await fetch(
        'http://localhost:5000/api/miragic/tryon',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            personImage,
            clothImage
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        const error = new Error(errorText);
        error.statusCode = response.status;
        throw error;
      }

      return await response.json();
    }
  );
}
