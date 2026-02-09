const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { verifyToken } = require('./admin');

// Public: Get all published blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true })
      .sort({ createdAt: -1 })
      .select('-__v');
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Public: Get single blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ADMIN ROUTES (Protected)

// Get all blogs (including unpublished)
router.get('/admin/all', verifyToken, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create new blog
router.post('/admin/create', verifyToken, async (req, res) => {
  try {
    const { title, slug, excerpt, content, image, category, published } = req.body;

    const blog = new Blog({
      title,
      slug,
      excerpt,
      content,
      image,
      category,
      published
    });

    await blog.save();
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update blog
router.put('/admin/update/:id', verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete blog
router.delete('/admin/delete/:id', verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;