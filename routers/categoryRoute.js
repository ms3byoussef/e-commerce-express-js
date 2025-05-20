 const express = require("express");
 const {createCategory, getAllCategories , getCategoryById, updateCategory,deleteCategory } = require("../services/categoryService");
 
 const router = express.Router();

router.route("/").post(createCategory).get(getAllCategories);
router.route("/:id").get(getCategoryById).put(updateCategory);
router.route("/:id").delete(deleteCategory);

 module.exports = router;


 