const mongoose = require('mongoose');
const schema = new mongoose.Schema(
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
  
  const response = doc => {
    const photo =
      doc.photo ||
      'https://res.cloudinary.com/nile-pharmacy/image/upload/v1558858260/assets/placeholder_a1ubee.jpg';
  
    return {
      id: doc.id,
      name: doc.name,
      slug: doc.slug,
   
      photo: photo,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  };

  module.exports = mongoose.model('Category', schema);
