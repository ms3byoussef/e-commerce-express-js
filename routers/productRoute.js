 const express = require("express");
 
 const router = express.Router();

 const {
    createProduct,
     getAllProducts, 
     getProductById, 
     updateProduct,
     deleteProduct
    } = require("../services/productService");
 
    const {
        getProductValidator,
        createProductValidator,
        updateProductValidator,
        deleteProductValidator,
      } = require("../utils/validators/productValidator");


     
router
.route("/")
.post(createProductValidator,createProduct)
.get(getAllProducts);

router
.route("/:id")
.get(getProductValidator,getProductById)
.put(updateProductValidator,updateProduct)
.delete(deleteProductValidator,deleteProduct);

 module.exports = router;


 