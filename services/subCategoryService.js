const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubCategoryModel = require("../models/subCategoryModel");
const ApiError = require("../utils/apiError");


exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category)   req.body.category = req.params.categoryId;
  next();
}

 //@ desc create  SubCategory  
 // @route  POST /api/v1/subcategories/
 // @access  public
exports.createSubCategory =asyncHandler( async (req, res , next) => {


    const {name,category} = req.body;


    if (!name) {
      return next(
        new ApiError(`SubCategory name is required`, 404)
      );
    }

    const subCategory = await SubCategoryModel.create({
      name,
      slug: slugify(name, { lower: true }),
      category,
    });

    res.status(201).json({ data: subCategory });

});

//@ desc get All SubCategories By Category
 // @route  GET /api/v1/categories/:categoryId/subcategories
 // @access  public

 exports.createFilterObject = (req, res, next) => {
    // eslint-disable-next-line prefer-const
    let filterObject  = {};
    if (req.params.categoryId ) 
      filterObject = { category: req.params.categoryId };
    req.filterObject= filterObject ;
     next();

  }

 //@ desc get All SubCategories 
 // @route  GET /api/v1/subcategories/
 // @access  public

exports.getAllSubCategories =asyncHandler( async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    console.log(req.params);

    
    const subCategories = await SubCategoryModel
    .find(req.filterObject)
    .skip(skip)
    .limit(limit)
    .populate({'path':'category','select':'name'});
    res.status(200).json({ result: subCategories.length, page,data: subCategories });
 });

 



 //@ desc get subCategory by id
 // @route  GET /api/v1/subcategories/:id
 // @access  public
exports.getSubCategoryById =asyncHandler( async (req, res, next) => {

    const {id} = req.params;
    const subCategory = await SubCategoryModel.findById(id)
    .populate({'path':'category','select':'name  -_id'});
    if (!subCategory) {
      return next(
        new ApiError(`SubCategory with id ${id} not found`, 404)
      );
    }
    res.status(200).json({ data: subCategory });
});

 //@ desc update subCategory by id
 // @route  PUT /api/v1/subcategories/:id
 // @access  public
exports.updateSubCategory =asyncHandler( async (req, res, next) => {

    const {id} = req.params;
    const {name, category} = req.body;

    const subCategory = await SubCategoryModel.findOneAndUpdate(
      {_id: id},
      {name, slug: slugify(name), category},
      {new: true}
    ) 
    if (!subCategory) {
      return next(
        new ApiError(`SubCategory with id ${id} not found`, 404)
      );  
    }
    res.status(200).json({ data: subCategory });
});


 //@ desc delete subCategory y 
 // @route  DELETE /api/v1/subcategories/:id
 // @access  public
 
exports.deleteSubCategory =asyncHandler( async (req, res, next) => {

    const {id} = req.params;
    const subCategory = await SubCategoryModel.findByIdAndDelete(id);
    if (!subCategory) {
      return next(
        new ApiError(`SubCategory with id ${id} not found`, 404)
      );
    }
    res.status(204).send("deleted");
});


