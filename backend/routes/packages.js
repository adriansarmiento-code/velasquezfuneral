const express = require('express');
const router = express.Router();
const Package = require('../models/Package');
const { verifyToken } = require('./admin');

// Public: Get all published packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find({ published: true }).sort({ order: 1 });
    res.json({ success: true, data: packages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin: Get all packages
router.get('/admin/all', verifyToken, async (req, res) => {
  try {
    const packages = await Package.find().sort({ order: 1 });
    res.json({ success: true, data: packages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin: Create package
router.post('/admin/create', verifyToken, async (req, res) => {
  try {
    const package = new Package(req.body);
    await package.save();
    res.status(201).json({ success: true, data: package });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin: Update package
router.put('/admin/update/:id', verifyToken, async (req, res) => {
  try {
    const package = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, data: package });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin: Delete package
router.delete('/admin/delete/:id', verifyToken, async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Package deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;