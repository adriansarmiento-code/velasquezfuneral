// 1. DNS FIX - MUST BE AT THE VERY TOP
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
// Note: Using the SRV string (mongodb+srv://) in your .env is now safe with the DNS fix above
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch(err => {
    console.log('❌ MongoDB connection error:');
    // This will tell us if it's still a DNS issue or an IP Whitelist issue
    if (err.message.includes('ECONNREFUSED')) {
      console.error('👉 Status: DNS still failing or Port 27017 blocked.');
    } else if (err.message.includes('MongooseServerSelectionError')) {
      console.error('👉 Status: Connection reached Atlas, but your IP is likely not whitelisted.');
    }
    console.error(err);
  });

// Routes
app.use('/api/contact', require('./routes/contact'));
app.use('/api/blogs', require('./routes/blogs'));

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
      contact: '/api/contact',
      blogs: '/api/blogs',
      health: '/health'
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});