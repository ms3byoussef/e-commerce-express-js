 const express = require("express");
 
 const router = express.Router();

 const {
    createCategory,
     getAllCategories , 
     getCategoryById, 
     updateCategory,
     deleteCategory 
    } = require("../services/categoryService");
 
    const {
        getCategoryValidator,
        createCategoryValidator,
        updateCategoryValidator,
        deleteCategoryValidator,
      } = require("../utils/validators/categoryValidator");


      const subCategoryRoute =require ("./subCategoryRoute");

      
      // nested route 

      router.use("/:categoryId/subcategories" , subCategoryRoute); 

      
     
router
.route("/")
.post(createCategoryValidator,createCategory)
.get(getAllCategories);

router
.route("/:id")
.get(getCategoryValidator,getCategoryById)
.put(updateCategoryValidator,updateCategory)
.delete(deleteCategoryValidator,deleteCategory);

 module.exports = router;


 