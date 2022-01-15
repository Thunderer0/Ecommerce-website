const {
    Router
} = require("express")
const express = require("express")
const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassoword,
    updateProfile,
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUserRole
} = require("../controllers/userController")
const {
    isAuthenticatedUser,
    authorizeRoles,
    authorizedRoles
} = require("../middleware/auth")
const router = express.Router()

router.route("/register").post(registerUser);

router.route("/login").post(loginUser)

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout)

router.route("/me").get(isAuthenticatedUser, getUserDetails)

router.route("/password/update").put(isAuthenticatedUser, updatePassoword)

router.route("/me/update").put(isAuthenticatedUser, updateProfile)

router.route("/admin/users").get(isAuthenticatedUser,authorizedRoles("admin"), getAllUser)

router.route("/admin/user/:id").get(isAuthenticatedUser,authorizedRoles("admin"), getSingleUser)

router.route("/admin/user/:id").delete(isAuthenticatedUser,authorizedRoles("admin"), deleteUser)

router.route("/admin/user/:id").put(isAuthenticatedUser,authorizedRoles("admin"), updateUserRole)

module.exports = router;