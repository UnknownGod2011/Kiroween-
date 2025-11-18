const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

router.post('/haunted-image', async (req, res) => {
  try {
    const { imageData, additionalPrompt = '' } = req.body;

    if (!imageData) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    // Remove data URL prefix if present
    const base64Image = imageData.replace(/^data:image\/\w+;base64,/, '');

    // Construct the prompt - always prepend "make this image haunted"
    const fullPrompt = `make this image haunted${additionalPrompt ? ' ' + additionalPrompt : ''}`;

    // Prepare Gemini API request
    const requestBody = {
      contents: [{
        parts: [
          {
            text: fullPrompt
          },
          {
            inline_data: {
              mime_type: 'image/jpeg',
              data: base64Image
            }
          }
        ]
      }],
      generationConfig: {
        temperature: 0.9,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      }
    };

    console.log('Sending request to Gemini API...');
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API error:', data);
      return res.status(response.status).json({ 
        error: 'Gemini API error', 
        details: data 
      });
    }

    // Extract the generated image from response
    // Note: Gemini returns text descriptions, not images directly
    // For image generation, we need to use a different approach
    
    if (data.candidates && data.candidates[0]) {
      const content = data.candidates[0].content;
      
      // Check if there's an image in the response
      if (content.parts && content.parts[0]) {
        const part = content.parts[0];
        
        if (part.inline_data) {
          // Return the generated image
          return res.json({
            success: true,
            imageData: `data:${part.inline_data.mime_type};base64,${part.inline_data.data}`,
            prompt: fullPrompt
          });
        } else if (part.text) {
          // Gemini returned text description instead of image
          return res.json({
            success: true,
            description: part.text,
            prompt: fullPrompt,
            note: 'Gemini provided a text description. Image generation may require a different model.'
          });
        }
      }
    }

    return res.status(500).json({ 
      error: 'Unexpected response format from Gemini',
      data 
    });

  } catch (error) {
    console.error('Error in haunted-image endpoint:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
});

module.exports = router;
