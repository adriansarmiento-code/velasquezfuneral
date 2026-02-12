const mongoose = require('mongoose');

const CasketSchema = new mongoose.Schema({
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  material: {
    type: String,
    enum: ['Wood', 'Metal', 'Imported'],
    required: true
  },
  regularPrice: {
    type: Number,
    required: true
  },
  discountedPrice: {
    type: Number
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  specifications: {
    type: String // e.g., "27''/190cm"
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  published: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Casket', CasketSchema);