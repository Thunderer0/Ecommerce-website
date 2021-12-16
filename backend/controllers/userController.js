const ErrorHandler = require("../utlis/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utlis/jwtToken");
const sendEmail = require("../utlis/sendEmail")

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
// logout user
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "user logged out"
    })
})
// forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({
        email: req.body.email,
    })
    if (!user) {
        return next(new ErrorHandler("user not found", 404))
    }
    // get resetPassword Token
    const resetToken = await user.getResetPasswordToken();
    await user.save({
        validateBeforeSave: false
    });
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
    const message = `ypur password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then please ignore it`;
    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password recovery`,
            message,
        })
        res.status(200).json({
            success: true,
            message: `email sent to ${user.email} successfully`,
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({
            validateBeforeSave: false
        });
        return next(new ErrorHandler(error.message, 500))
    }
})