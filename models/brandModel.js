const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
    {
      name: {
        type: String ,
        required: [true, "Name is required"],
        unique: [true, "Name must be unique"],
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [32, "Name must be less than 32 characters long"],
      },

 
      slug: {
        type: String,
        lowercase: true,
   
      },
   
      photo: {
        type: String
      },
   
    },
    { timestamps: true }
  );
  


  module.exports = mongoose.model('Brand', brandSchema);
