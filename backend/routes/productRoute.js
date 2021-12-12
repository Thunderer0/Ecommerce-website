const express = require('express')
// takes crud functions from product controller
const { getAllProducts,createProduct,updateProduct,deleteProduct, getProductDetails} = require('../controllers/productController')
// routing function
const router = express.Router()

// requests crud operation with the link 
router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);
// exports routes to app
module.exports = router