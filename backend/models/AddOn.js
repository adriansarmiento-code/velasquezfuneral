const mongoose = require('mongoose');

const AddOnSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  image: String,
  icon: String,
  link: String,
  order: {
    type: Number,
    default: 0
  },
  published: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AddOn', AddOnSchema);