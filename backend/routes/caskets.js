const express = require('express');
const router = express.Router();
const Casket = require('../models/Casket');
const { verifyToken } = require('./admin');

// Get all published caskets by package (PUBLIC)
router.get('/package/:packageId', async (req, res) => {
  try {
    const caskets = await Casket.find({ 
      packageId: req.params.packageId,
      published: true 
    }).sort({ displayOrder: 1 });
    
    res.json({ success: true, data: caskets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all caskets (ADMIN)
router.get('/admin/all', verifyToken, async (req, res) => {
  try {
    const caskets = await Casket.find()
      .populate('packageId', 'name category')
      .sort({ displayOrder: 1 });
    
    res.json({ success: true, data: caskets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get caskets by package (ADMIN)
router.get('/admin/package/:packageId', verifyToken, async (req, res) => {
  try {
    const caskets = await Casket.find({ packageId: req.params.packageId })
      .sort({ displayOrder: 1 });
    
    res.json({ success: true, data: caskets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create casket (ADMIN)
router.post('/admin/create', verifyToken, async (req, res) => {
  try {
    const casket = new Casket(req.body);
    await casket.save();
    
    res.json({ success: true, data: casket, message: 'Casket created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update casket (ADMIN)
router.put('/admin/update/:id', verifyToken, async (req, res) => {
  try {
    const casket = await Casket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!casket) {
      return res.status(404).json({ success: false, message: 'Casket not found' });
    }
    
    res.json({ success: true, data: casket, message: 'Casket updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete casket (ADMIN)
router.delete('/admin/delete/:id', verifyToken, async (req, res) => {
  try {
    const casket = await Casket.findByIdAndDelete(req.params.id);
    
    if (!casket) {
      return res.status(404).json({ success: false, message: 'Casket not found' });
    }
    
    res.json({ success: true, message: 'Casket deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;