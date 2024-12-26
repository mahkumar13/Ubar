
const captainModel = require("../Models/captain.model");

module.exports.createCaptain= async ({
  FirstName, LastName, email, password,color,plate,capacity,vehicletype
}) => {
  if (!FirstName || !LastName || !email || !password || !plate|| !capacity || !vehicletype) {
    throw new Error('All fields are required');
  }
  const captain = captainModel.create({
    fullName: {
      FirstName,
      LastName
    },
    password,
    email,
    vehicle:{
        color,
        plate,
        capacity,
        vehicletype
    }
  });
  return captain;
};

