const express = require('express');
const router = express.Router();
const AddOn = require('../models/AddOn');
const { verifyToken } = require('./admin');

// Public: Get all published add-ons
router.get('/', async (req, res) => {
  try {
    const addons = await AddOn.find({ published: true }).sort({ order: 1 });
    res.json({ success: true, data: addons });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin: Get all add-ons
router.get('/admin/all', verifyToken, async (req, res) => {
  try {
    const addons = await AddOn.find().sort({ order: 1 });
    res.json({ success: true, data: addons });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin: Create add-on
router.post('/admin/create', verifyToken, async (req, res) => {
  try {
    const addon = new AddOn(req.body);
    await addon.save();
    res.status(201).json({ success: true, data: addon });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin: Update add-on
router.put('/admin/update/:id', verifyToken, async (req, res) => {
  try {
    const addon = await AddOn.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, data: addon });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin: Delete add-on
router.delete('/admin/delete/:id', verifyToken, async (req, res) => {
  try {
    await AddOn.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Add-on deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;