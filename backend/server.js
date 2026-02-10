// 1. DNS FIX - MUST BE AT THE VERY TOP TO WORK
const dns = require("node:dns/promises");
dns.setServers(["8.8.8.8", "1.1.1.1"]); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// Routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/packages', require('./routes/packages'));
app.use('/api/addons', require('./routes/addons'));
app.use('/api/upload', require('./routes/upload')); // NEW upload route

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Velasquez Funeral API is running' });
});

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Velasquez Funeral & Chapel API',
    version: '1.0.0',
    endpoints: {
      admin: '/api/admin',
      contact: '/api/contact',
      blogs: '/api/blogs',
      packages: '/api/packages',
      addons: '/api/addons',
      health: '/health'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});