const User = require("../models").users;
console.log("Inside dao");
async function SignUpUser({
    name,
    age,
    mobile,
    email,
    password,
  }) {
    return User.create({
        name,
        age,
        mobile,
        email,
        password,
    });
  }

  async function getAllUsers(){
    return User.findAll();
}
  

  
  module.exports = { SignUpUser,getAllUsers};
  