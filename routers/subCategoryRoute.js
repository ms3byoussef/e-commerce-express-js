const express = require("express");
 
const router = express.Router();

const {
    createSubCategory,
 } = require("../services/subCategoryService");

const {
    createSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");


 
router("/").post(createSubCategoryValidator,createSubCategory);

module.exports = router;