const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullName: {
        FirstName: {
            type: String,
            required: true,
            minlength: [3, 'First name should be 3 characters'],
        },
        LastName: {
            type: String,
            minlength: [3, 'Last name should be 3 characters'],
        },

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [8, 'Password should be at least 8 characters long'],

    },
    socketId: {
        type: String,

    },
    status: {
        type: String,
        default: 'inactive',
        enum: ['active', 'inactive']
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "color must be  3 charcters"]
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "plate must be  6 charcters"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vehicletype: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto']
        }
    },
    location: {
        lat: {
            type: Number,
        },
        long: {
            type: Number,
        }
    }
});



captainSchema.methods.generateAuthToken= function(){
  const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
  return token;
}
 captainSchema.methods.comparePassword =  async function(password){
    console.log(password);
    return  await bcrypt.compare(password,this.password)
 }
 captainSchema.statics.hashpassword = async function(password){
     return await  bcrypt.hash(password,10)
  }

 const captainModel = mongoose.model("captain",captainSchema);

 module.exports=captainModel;