const userModel = require("../Models/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const isBlackListedToken = await userModel.findOne({ token: token })
    if (isBlackListedToken) {
     return res.status(401).json({ message: 'UnAuthorized pls login' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
       // console.log(user);
        req.user = user;
        return next();

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}