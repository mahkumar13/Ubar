const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema= new mongoose.Schema({
    fullName:{
        FirstName:{
            type:String,
            required:true,
            minlength:[3,'First name should be 3 characters'],
        },
        LastName:{
            type:String,
            required:true,
            minlength:[3,'Last name should be 3 characters'],
        },
       
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:[8,'Password should be at least 8 characters long'],
      
    },
    socketId:{
        type:String,
        
    }
});

 userSchema.methods.generateAuthToken = function(){
    const token= jwt.sign({_id:this._id}, process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
 }

 userSchema.methods.comparePassword =  async function(password){
    console.log(password);
    return  await bcrypt.compare(password,this.password)
 }

 userSchema.statics.hashpassword = async function(password){
    return await  bcrypt.hash(password,10)
 }

 const userModel = mongoose.model("user",userSchema);
 
 module.exports=userModel;
