// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  comment: String,
  rating: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Review', reviewSchema);
