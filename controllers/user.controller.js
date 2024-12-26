const userModel = require('../Models/user.model')
const userService = require('../services/user.service')
const { validationResult } = require("express-validator")
const blackListTokenModel=require('../Models/blacklisttoken.module')
module.exports.registerUser = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const { fullName, email, password } = req.body;
    const isUserExist = userModel.findOne({email})
    if (isUserExist) {
        return res.status(400).json({ message: "User already exist" });
    }
    const hashedPassword = await userModel.hashpassword(password)

    const user = await userService.createUser({
        FirstName:fullName.FirstName,
        LastName:fullName.LastName,
        email,
        password: hashedPassword,
    })
   // console.log(user)
    const token =  user.generateAuthToken()
    res.status(200).json({ token, user })

}

module.exports.loginUser = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
     const {email,password}= req.body

     const user= await userModel.findOne({email}).select('+password');
     console.log(user)
     if(!user){
        return res.status(401).json({message:"Invalid email or password"});
     }

     const ismatch =  await user.comparePassword(password);
     if(!ismatch){
        return res.status(401).json({message:"Invalid email or password"});
     }

     const token = user.generateAuthToken()
     res.cookie('token', token)
     res.status(200).json({token, user})

}

module.exports.getUserProfile= async (req, res, next) => {
     res.   status(200).json(req.user);
}

module.exports.logout= async (req, res, next) => {
   res.clearCookie('token');
   const token = req.cookies.token ||req.headers.authorization?.split(' ')[1];
   await blackListTokenModel.create({token});
   res.status(200).json({message:"Logged out"})
}