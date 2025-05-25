const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubCategoryModel = require("../models/subCategoryModel");
const ApiError = require("../utils/apiError");



// create subCategory

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
