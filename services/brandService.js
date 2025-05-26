 const slugify = require("slugify");
 const asyncHandler = require("express-async-handler");
 const BrandModel = require("../models/brandModel");
 const ApiError = require("../utils/apiError");

 

// @desc get all brands
// @route GET /api/v1/brands
// @access private
 exports.getAllBrands =asyncHandler( async (req, res ) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const brands = await BrandModel.find({}).skip(skip).limit(limit);

    res.status(200).json({ result: brands.length, limit  , page, data: brands });
 });



// @desc get Brand by id
// @route GET /api/v1/brands/:id
// @access private
 exports.getBrandById =asyncHandler( async (req, res , next) => {
  const { id } = req.params;
  const Brand = await BrandModel.findById(id);
    if (!Brand) { 
      return next(
      new ApiError(`Brand with id  not found`, 404)
    );
    }
    res.status(200).json({ data: Brand });
 });


// @desc create Brand
// @route POST /api/v1/brands
// @access private
 exports.createBrand =asyncHandler( async (req, res , next) => {

    const {name} = req.body;
    const {photo} = req.body;

    if (!name) {
      return next(
        new ApiError(`Brand name is required`, 404)
      );
    }

    const brand = await BrandModel.create({
      name,
      slug: slugify(name, { lower: true }),
      photo
    });

    res.status(201).json({ data: brand });

});


// @desc   update Brand
// @route    PUT /api/v1/brands/:id
// @access private

exports.updateBrand =asyncHandler( async (req, res , next) => {
  const {id} = req.params;
  const {name, photo} = req.body;
  const brand = 
  await BrandModel.findByIdAndUpdate(
    { _id: id},
     {name, slug: slugify(name, { lower: true }), photo,}
    , 
    {new: true}
  );
  if (!brand) {
    return next(
      new ApiError(`Brand with id ${id} not found`, 404)
    );
  }
  res.status(200).json({ data: brand });
});



// @desc delete  brand
// @route DELETE /api/v1/brands/:id
// @access private

exports.deleteBrand =asyncHandler( async (req, res , next) => {
  const {id} = req.params;
  const Brand = await BrandModel.findByIdAndDelete({_id:id});
  if (!Brand) {
    return next(
      new ApiError(`Brand with id ${id} not found`, 404)
    );
  }
  res.status(200).json({ message: "Brand deleted successfully" });
});

 
 







