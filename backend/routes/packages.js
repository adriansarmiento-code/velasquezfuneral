const express = require('express');
const router = express.Router();
const Package = require('../models/Package');
const { verifyToken } = require('./admin');

// Get all published packages (PUBLIC) - THIS IS IMPORTANT
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find({ published: true })
      .sort({ displayOrder: 1 });
    
    res.json({ success: true, data: packages });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all packages (ADMIN)
router.get('/admin/all', verifyToken, async (req, res) => {
  try {
    const packages = await Package.find().sort({ displayOrder: 1 });
    res.json({ success: true, data: packages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create package (ADMIN)
router.post('/admin/create', verifyToken, async (req, res) => {
  try {
    const package = new Package(req.body);
    await package.save();
    res.json({ success: true, data: package, message: 'Package created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update package (ADMIN)
router.put('/admin/update/:id', verifyToken, async (req, res) => {
  try {
    const package = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!package) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }
    
    res.json({ success: true, data: package, message: 'Package updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete package (ADMIN)
router.delete('/admin/delete/:id', verifyToken, async (req, res) => {
  try {
    const package = await Package.findByIdAndDelete(req.params.id);
    
    if (!package) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }
    
    res.json({ success: true, message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;