const ErrorHandler = require("../utlis/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utlis/jwtToken");

// register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const {
        name,
        email,
        password
    } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is sample id",
            url: "this is sample url",
        }
    });
    sendToken(user, 201, res)
})
// login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    // checking if user has goven password and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password"))
    }
    const user = await User.findOne({
        email
    }).select("+password");
    if (!user) {
        next(new ErrorHandler("invalid email"), 401)
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        next(new ErrorHandler("invalid password"), 401)
    }
    sendToken(user, 200, res)
})