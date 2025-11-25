import express from 'express';
import fetch from 'node-fetch';
import FormData from 'form-data';

const router = express.Router();

// Get config from environment (loaded by main server)
const getMiragicConfig = () => ({
  apiKey: process.env.MIRAGIC_API_KEY,
  baseUrl: 'https://backend.miragic.ai/api/v1/virtual-try-on',
  testMode: process.env.MIRAGIC_TEST_MODE === 'true'
});

// Log config on first request
let configLogged = false;
const logConfig = () => {
  if (!configLogged) {
    const config = getMiragicConfig();
    console.log('🔑 Miragic API Key loaded:', config.apiKey ? `${config.apiKey.substring(0, 20)}...` : '❌ MISSING');
    if (config.testMode) {
      console.log('⚠️  MIRAGIC TEST MODE ENABLED - Using mock responses');
    }
    configLogged = true;
  }
};

// Helper to convert base64 to buffer
function base64ToBuffer(base64String) {
  const base64Data = base64String.includes(',') 
    ? base64String.split(',')[1] 
    : base64String;
  return Buffer.from(base64Data, 'base64');
}

// Start virtual try-on job
router.post('/tryon', async (req, res) => {
  try {
    logConfig();
    const config = getMiragicConfig();
    
    const { personImage, clothImage } = req.body;

    if (!personImage || !clothImage) {
      return res.status(400).json({ 
        error: 'Missing required images',
        message: 'Both person and cloth images are required' 
      });
    }

    console.log('🎭 Starting Miragic Virtual Try-On...');

    // TEST MODE: Return mock response
    if (config.testMode) {
      console.log('⚠️  TEST MODE: Returning mock jobId');
      const mockJobId = `test-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      return res.json({
        success: true,
        jobId: mockJobId,
        status: 'PENDING',
        message: 'Virtual try-on job started (TEST MODE)'
      });
    }

    // Convert base64 to buffers
    const personBuffer = base64ToBuffer(personImage);
    const clothBuffer = base64ToBuffer(clothImage);

    console.log('📏 Image sizes - Person:', personBuffer.length, 'bytes, Cloth:', clothBuffer.length, 'bytes');

    // Create form data with proper file format
    const formData = new FormData();
    formData.append('garmentType', 'upper_body');
    formData.append('humanImage', personBuffer, {
      filename: 'human_image.jpg',
      contentType: 'image/jpeg'
    });
    formData.append('clothImage', clothBuffer, {
      filename: 'cloth_image.jpg',
      contentType: 'image/jpeg'
    });

    console.log('📤 Sending request to Miragic API...');

    // Call Miragic API
    const response = await fetch(config.baseUrl, {
      method: 'POST',
      headers: {
        'X-API-Key': config.apiKey,
        ...formData.getHeaders()
      },
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Miragic API Error:', errorText);
      return res.status(response.status).json({ 
        error: 'Virtual Try-On API failed',
        message: 'Failed to start try-on job',
        details: errorText
      });
    }

    const data = await response.json();
    
    if (!data.success || !data.data?.jobId) {
      console.error('❌ No jobId in response:', data);
      return res.status(500).json({ 
        error: 'No job ID returned',
        message: 'Failed to create try-on job'
      });
    }

    console.log('✅ Try-on job created:', data.data.jobId);

    res.json({ 
      success: true,
      jobId: data.data.jobId,
      status: data.data.status,
      message: 'Virtual try-on job started'
    });

  } catch (error) {
    console.error('❌ Virtual Try-On Error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: 'Failed to start virtual try-on',
      details: error.message
    });
  }
});

// Poll job status
router.get('/tryon/:jobId', async (req, res) => {
  try {
    logConfig();
    const config = getMiragicConfig();
    
    const { jobId } = req.params;

    console.log('🔍 Checking job status:', jobId);

    // TEST MODE: Return mock completed response
    if (config.testMode && jobId.startsWith('test-')) {
      console.log('⚠️  TEST MODE: Returning mock completed status');
      return res.json({
        success: true,
        status: 'COMPLETED',
        processedUrl: 'http://localhost:5000/temp-uploads/mock-result.png',
        errorMessage: null,
        data: {
          id: jobId,
          status: 'COMPLETED',
          mode: 'SINGLE',
          processedUrl: 'http://localhost:5000/temp-uploads/mock-result.png',
          createdAt: new Date().toISOString()
        }
      });
    }

    const response = await fetch(`${config.baseUrl}/${jobId}`, {
      method: 'GET',
      headers: {
        'X-API-Key': config.apiKey
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Status check error:', errorText);
      return res.status(response.status).json({ 
        error: 'Failed to check status',
        details: errorText
      });
    }

    const data = await response.json();

    if (!data.success) {
      return res.status(500).json({ 
        error: 'Status check failed',
        data
      });
    }

    const jobData = data.data;
    
    console.log(`📊 Job ${jobId} status: ${jobData.status}`);

    res.json({
      success: true,
      status: jobData.status,
      processedUrl: jobData.processedUrl,
      errorMessage: jobData.errorMessage,
      data: jobData
    });

  } catch (error) {
    console.error('❌ Status Check Error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: 'Failed to check job status',
      details: error.message
    });
  }
});

export default router;
