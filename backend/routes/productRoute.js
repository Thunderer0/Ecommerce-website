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

router.route("/admin/product/new").post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);

router.route("/admin/product/:id").put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct).delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);

router.route("/products:id").get(getProductDetails);
// exports routes to app
module.exports = router;