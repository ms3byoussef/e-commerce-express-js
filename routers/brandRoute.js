 const express = require("express");
 
 const router = express.Router();

 const {
    createBrand,
     getAllBrands, 
     getBrandById, 
     updateBrand,
     deleteBrand
    } = require("../services/brandService");
 
    const {
        getBrandValidator,
        createBrandValidator,
        updateBrandValidator,
        deleteBrandValidator,
      } = require("../utils/validators/brandValidator");


     
router
.route("/")
.post(createBrandValidator,createBrand)
.get(getAllBrands);

router
.route("/:id")
.get(getBrandValidator,getBrandById)
.put(updateBrandValidator,updateBrand)
.delete(deleteBrandValidator,deleteBrand);

 module.exports = router;


 