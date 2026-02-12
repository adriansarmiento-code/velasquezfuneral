const dns = require("node:dns/promises");
dns.setServers(["8.8.8.8", "1.1.1.1"]); 

const mongoose = require('mongoose');
require('dotenv').config();
const Package = require('../models/Package');

const packages = [
  {
    name: 'Basic Package',
    category: 'Basic',
    tagline: 'Essential Services with Dignity',
    description: 'Our Basic Package provides all essential funeral services with the same care and professionalism that Velasquez is known for.',
    features: [
      'Professional embalming services',
      'Transfer to funeral home',
      'Basic venue preparation',
      'Wake coordination support',
      'Burial arrangement assistance',
      'Professional staff throughout',
      '30% down payment option available'
    ],
    displayOrder: 1,
    published: true
  },
  {
    name: 'Semi-Elegant Package',
    category: 'Semi-Elegant',
    tagline: 'Enhanced Comfort and Care',
    description: 'The Semi-Elegant Package offers enhanced services and upgraded selections for families seeking additional comfort.',
    features: [
      'Advanced embalming and care',
      'Climate-controlled transfer',
      'Enhanced venue decoration',
      'Extended wake coordination',
      'Comprehensive burial services',
      'Memorial program printing',
      'Guest register and condolence book',
      'Flexible payment arrangements'
    ],
    displayOrder: 2,
    published: true
  },
  {
    name: 'Elegant Package',
    category: 'Elegant',
    tagline: 'Premium Service Excellence',
    description: 'Our Elegant Package provides the highest level of service, ensuring every detail reflects the importance of your loved one\'s life.',
    features: [
      'Premium preservation services',
      'VIP transfer and handling',
      'Chapel venue with full decoration',
      'Complete wake management',
      'Full burial coordination',
      'Custom memorial programs',
      'Professional photography service',
      'Floral arrangement coordination',
      'Memorial video presentation',
      'Personalized service options',
      'Priority scheduling and support'
    ],
    displayOrder: 3,
    published: true
  }
];

async function seedPackages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Package.deleteMany({});
    console.log('Cleared existing packages');

    const result = await Package.insertMany(packages);
    console.log(`✅ Successfully seeded ${result.length} packages`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding packages:', error);
    process.exit(1);
  }
}

seedPackages();