const express= require('express');

const router = express.Router();
const captainController= require("../controllers/captain.controller")

const {body}= require("express-validator")

router.post("/register",[
    body('email').isEmail().withMessage("Please enter valid email address"),
    body("fullName.FirstName").isLength({min:3}).withMessage("Please enter"),
    body("password").isLength({min:8}).withMessage("pls enter valid password"),
    body("vehicle.color").isLength({min:3}).withMessage("vehicle color must be length of 3 charcter"),
    body("vehicle.plate").isLength({min:3}).withMessage("vehicle color must be length of 3 charcter"),
    body("vehicle.capacity").isLength({min:1}).withMessage("vehicle capacity must be length of 1 charcter"),
    body("vehicle.vehicletype").isIn(['car', 'bike', 'auto']).withMessage("invalid vehicle type "),
],captainController.RegisterCaptain);


module.exports =router;