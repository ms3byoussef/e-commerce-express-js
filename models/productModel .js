const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
      title: {
        type: String ,
        required: [true, "Name is required"],
      
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [200, "Name must be less than 32 characters long"],
      },

 
      slug: {
        type: String,
        lowercase: true,
   
      },
   
      description: {
        type: String,
        required: [true, "Description is required"],

      },
      quantity: {
        type: Number,
        required: [true, "Quantity is required"],
      },
      sold: {
        type: Number,
        default: 0,
      },
      price: {
        type: Number,
        required: [true, "Price is required"],
        trim: true,
        max: [200000, "Price must be less than 20 characters long"],
      
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, 'Product Image cover is required'],
    },
    images: [String],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: 'Brand',
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must be belong to a category"],
    },
    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
        required: [true, "Product must be belong to a subcategories"],
      },
    ],

     
    ratingsAverage: {
      type: Number,
      min: [1, 'Rating must be above or equal 1.0'],
      max: [5, 'Rating must be below or equal 5.0'],
      // set: (val) => Math.round(val * 10) / 10, // 3.3333 * 10 => 33.333 => 33 => 3.3
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    },
    { timestamps: true ,
          // to enable virtual populate

          toJSON: { virtuals: true },
          toObject: { virtuals: true },
    }
  );
  
  // Virtual populate
  // productSchema.virtual('reviews', {
  //   ref: 'Review',
  //   foreignField: 'product',
  //   localField: '_id',
  // });

  // Middleware to populate reviews
  // productSchema.pre('findOne', function(next) {
  //   this.populate('reviews');
  //   next();
  // });
// Mongoose query middleware
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'name -_id',
  });
  next();
});

 // 3) Image URL
const setImageURL = (doc) => {
  if (doc.imageCover) {
    const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
    doc.imageCover = imageUrl;
  }
  if (doc.images) {
    const imagesList = [];
    doc.images.forEach((image) => {
      const imageUrl = `${process.env.BASE_URL}/products/${image}`;
      imagesList.push(imageUrl);
    });
    doc.images = imagesList;
  }
};
// findOne, findAll and update
productSchema.post('init', (doc) => {
  setImageURL(doc);
});

// create
productSchema.post('save', (doc) => {
  setImageURL(doc);
});

  module.exports = mongoose.model('Product', productSchema);
