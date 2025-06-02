 const slugify = require("slugify");
 const asyncHandler = require("express-async-handler");
 const ProductModel = require("../models/productModel ");
 const ApiError = require("../utils/apiError");

 

// @desc get all Products
// @route GET /api/v1/products
// @access private
 exports.getAllProducts =asyncHandler( async (req, res ) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const products = await ProductModel
    .find({})
    .skip(skip).
    limit(limit)
    .populate({path:"category" , select:"name"});

    res.status(200).json({ result: products.length, limit  , page, data: products });
 });



// @desc get product by id
// @route GET /api/v1/products/:id
// @access private
 exports.getProductById =asyncHandler( async (req, res , next) => {
  const { id } = req.params;
  const product = await ProductModel
  .findById(id)
  .populate({path:"category" , select:"name"});

  if (!product) { 
      return next(
          new ApiError(`Product with id  not found`, 404)
    );
    }
    res.status(200).json({ data: product });
 });


// @desc create product
// @route POST /api/v1/products
// @access private
 exports.createProduct =asyncHandler( async (req, res , next) => {

if(req.body.title) {
  req.body.slug = slugify(req.body.title, { lower: true });
}

    const product = await ProductModel.create(req.body);

    res.status(201).json({ data: product });

});


// @desc   update product
// @route    PUT /api/v1/products/:id
// @access private

exports.updateProduct =asyncHandler( async (req, res , next) => {
  req.body.slug = slugify(req.body.title, { lower: true });
  const {id} = req.params;

  const product = 
  await ProductModel.findByIdAndUpdate(
    { _id: id},
      req.body,
    {new: true}
  );
  if (!product) {
    return next(
      new ApiError(`Product with id ${id} not found`, 404)
    );
  }
  res.status(200).json({ data: product });
});



// @desc delete product
// @route DELETE /api/v1/products/:id
// @access private

exports.deleteProduct =asyncHandler( async (req, res , next) => {
  const {id} = req.params;
  const product = await ProductModel.findByIdAndDelete({_id:id});
  if (!product) {
    return next(
      new ApiError(`Product with id ${id} not found`, 404)
    );
  }
  res.status(200).json({ message: "Product deleted successfully" });
});

 
 







