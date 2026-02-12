const dns = require("node:dns/promises");
dns.setServers(["8.8.8.8", "1.1.1.1"]); 

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const Admin = require('../models/Admin');

async function resetPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const username = 'admin';
    const newPassword = 'admin123';

    // Find admin
    const admin = await Admin.findOne({ username });

    if (!admin) {
      console.log('❌ Admin not found');
      process.exit(1);
    }

    // Hash password manually
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update directly (bypass pre-save hook)
    await Admin.updateOne(
      { username },
      { $set: { password: hashedPassword } }
    );

    console.log('✅ Password reset successfully!');
    console.log(`Username: ${username}`);
    console.log(`Password: ${newPassword}`);

    // Verify the password works
    const updatedAdmin = await Admin.findOne({ username });
    const isMatch = await bcrypt.compare(newPassword, updatedAdmin.password);
    
    console.log('✅ Password verification:', isMatch ? 'SUCCESS' : 'FAILED');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

resetPassword();