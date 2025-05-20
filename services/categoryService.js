 const CategoryModel = require("../models/categoryModel");
 const slugify = require("slugify");
 const asyncHandler = require("express-async-handler");

 
 // get all categories
 exports.getAllCategories =asyncHandler( async (req, res) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const categories = await CategoryModel.find().skip(skip).limit(limit);

    res.status(200).json({ result: categories.length, page, limit, data: categories });
 });


 // get category by id

 exports.getCategoryById =asyncHandler( async (req, res) => {
    const {id} = req.params;
    const category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json({ data: category });
 });



 exports.createCategory =asyncHandler( async (req, res) => {

    const name = req.body.name;
    const photo = req.body.photo;

    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const category = await CategoryModel.create({
      name,
      slug: slugify(name, { lower: true }),
      photo
    });

    res.status(201).json({ data: category });

});

// update category

exports.updateCategory =asyncHandler( async (req, res) => {
  const {id} = req.params;
  const {name, photo} = req.body;
  const category = 
  await CategoryModel.findByIdAndUpdate(
    { _id: id},
     {name, slug: slugify(name, { lower: true }), photo,}
    , {new: true},
  );
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.status(200).json({ data: category });
});


// delete category

exports.deleteCategory =asyncHandler( async (req, res) => {
  const {id} = req.params;
  const category = await CategoryModel.findByIdAndDelete({_id:id});
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.status(200).json({ message: "Category deleted successfully" });
});

 
 







