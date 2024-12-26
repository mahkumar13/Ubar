const express = require('express');
const router= express.Router();
const  {body} = require('express-validator')
const userController = require('../controllers/user.controller')
const authMiddleware= require('../middlewares/outh.middleware')
 
router.post("/register",[
    body('email').isEmail().withMessage("Please enter valid email address"),
    body("fullName.FirstName").isLength({min:3}).withMessage("Please enter"),
    body("password").isLength({min:8}).withMessage("pls enter valid password")

],userController.registerUser)

router.post("/login",[
    body('email').isEmail().withMessage("Please enter valid email address"),
    body("password").isLength({min:8}).withMessage("pls enter valid password")
],userController.loginUser)

router.get('/profile',authMiddleware.authUser ,userController.getUserProfile)

router.get('/logout',authMiddleware.authUser,userController.logout)

module.exports = router