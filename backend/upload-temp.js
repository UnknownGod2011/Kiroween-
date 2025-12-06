import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const router = express.Router();
const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;

// Create temp uploads directory
const uploadsDir = path.join(__dirname, 'temp-uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Cleanup old files every hour
const CLEANUP_INTERVAL = 1000 * 60 * 60; // 1 hour
const FILE_LIFETIME = 1000 * 60 * 60 * 2; // 2 hours

function cleanupOldFiles() {
  const now = Date.now();
  fs.readdir(uploadsDir, (err, files) => {
    if (err) return;
    files.forEach((file) => {
      const filePath = path.join(uploadsDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) return;
        if (now - stats.mtimeMs > FILE_LIFETIME) {
          fs.unlink(filePath, () => {});
        }
      });
    });
  });
}
setInterval(cleanupOldFiles, CLEANUP_INTERVAL);

// Upload endpoint - converts Base64 to file and returns URL
router.post('/upload-temp', (req, res) => {
  try {
    const { imageBase64, filename } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    // Remove data URL prefix if present
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Generate unique filename
    const uniqueFilename = `${Date.now()}-${filename || 'image.png'}`;
    const filepath = path.join(uploadsDir, uniqueFilename);

    // Save file
    fs.writeFileSync(filepath, buffer);

    // Return public URL
    const publicUrl = `${BASE_URL}/temp-uploads/${uniqueFilename}`;
    
    console.log('✅ Uploaded temp file:', uniqueFilename);

    res.json({ url: publicUrl });

  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({ error: 'Upload failed', message: error.message });
  }
});

export default router;
