const mongoose = require('mongoose');

const AddOnSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String // Emoji or text icon
  },
  image: {
    type: String // Image URL
  },
  link: {
    type: String // Optional external link
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

module.exports = mongoose.model('AddOn', AddOnSchema);