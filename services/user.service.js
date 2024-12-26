const { model } = require("mongoose");
const userModel = require("../Models/user.model");

module.exports.createUser = async ({
  FirstName, LastName, email, password
}) => {
  if (!FirstName || !LastName || !email) {
    throw new Error('All fields are required');
  }
  const user = userModel.create({
    fullName: {
      FirstName,
      LastName
    },
    password,
    email
  });
  return user;
};

