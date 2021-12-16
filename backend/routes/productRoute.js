const express = require('express')
// takes crud functions from product controller
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails
} = require('../controllers/productController')
// routing function
const router = express.Router()
const {
    isAuthenticatedUser,
    authorizedRoles
} = require("../middleware/auth")

// requests crud operation with the link 
router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);
router.route("/product/:id").put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct).delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct).get(getProductDetails);
// exports routes to app
module.exports = router;