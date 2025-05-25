const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,      
      trim: true,
    required: [true, "Name is required"],
    unique: [true, "Name must be unique"],
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [32, "Name must be less than 32 characters long"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, "subCategory must be belong to a parent category"],
  },

}, { timestamps: true });

module.exports = mongoose.model('SubCategory', subCategorySchema);