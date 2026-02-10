const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { verifyToken } = require('./admin');

// Upload single image
router.post('/image', verifyToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    res.json({
      success: true,
      url: req.file.path,
      publicId: req.file.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: 'Upload failed' });
  }
});

module.exports = router;