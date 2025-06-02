const express = require("express");
 

const {   
     getAllSubCategories,
    createSubCategory,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory,
    setCategoryIdToBody,
    createFilterObject
 } = require("../services/subCategoryService");

const {   
     getSubCategoryValidator,
    createSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");


const router = express.Router( {mergeParams: true }); // to access params from parent route


 router
 .route("/") 

 .post(setCategoryIdToBody,createSubCategoryValidator,createSubCategory)
.get(createFilterObject,getAllSubCategories);


router
.route("/:id")
.get(getSubCategoryValidator,getSubCategoryById)
.put(updateSubCategoryValidator,updateSubCategory)
.delete(deleteSubCategoryValidator,deleteSubCategory);

module.exports = router;