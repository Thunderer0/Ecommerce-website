// takes model for object insertion from prodectmodel
const Product = require("../models/productModel");
const ErrorHandler = require("../utlis/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Apifeatures = require("../utlis/apifeatures");


// create product --admin
// exports.(function_name) = rest of function {way to export functions ;) }
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    // takes json as input and adds to database according to schema
    // Product.create/find are operations on database with help of mongoose.export taken in Product
    const product = await Product.create(req.body);
    // returns status with success and added object in json
    res.status(201).json({
        success: true,
        product
    })
})

// get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const resultPerPage = 5
    const productCount = await Product.countDocuments();

    const apifeature = new Apifeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagiNation(resultPerPage)
    // find function gets all the objects of the collection returns empty object if none is found
    const products = await apifeature.query;
    res.status(200).json({
        success: true,
        products,
        productCount
    })
})
// update product --admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    // takes json and product id as input finds object by that id if such object exists it again finds by id and updates it and returns success with modified object
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        product
    })
})
// delete product --admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    // takes product id finds that id and deletes the object
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: "product deleted"
    })
})
// get one product
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    // takes id as input finds it and if such object exists it returns object 
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }
    res.status(200).json({
        success: true,
        product
    })
})