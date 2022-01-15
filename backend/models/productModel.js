const mongoose = require('mongoose')
const {
    required
} = require('nodemon/lib/config')
const {
    stringify
} = require('nodemon/lib/utils')
// create schema
const productSchema = mongoose.Schema({
    // object field name
    name: {
        // object field input type default type = string
        type: String,
        // throws error if object field is empty [true,(if it is false it will give message after comma)"blah blah blah"]
        required: [true, "Please enter product name"],
        // dunno this 
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        // maxlength : if input is greater than 8 it will throw error
        maxLength: [8, "Price cannot be greater than 8 figures"]
    },
    ratings: {
        type: Number,
        // we can also give default value
        default: 0
    },
    images: [{
        // use [] to create an array of objects inside an object 
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: [true, "please enter product category"]
    },
    stock: {
        type: Number,
        required: [true, "please enter product stock"],
        maxLength: [5, "stock cannot exceed 5 character"],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"user",
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required: true,
    },
    createdAt: { 
        type: Date,
        // takes date from system
        default: Date.now
    }
})
// exports mongoose model with productschema in "product" collection if such collection is not present it will create
module.exports = mongoose.model("product", productSchema);    