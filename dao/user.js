const User = require("../models/user");
console.log("inside dao");
async function createUser({
    name,
    age,
    mobile_no,
    email,
    password,
  }) {
    return User.create({
        name,
        age,
        mobile_no,
        email,
        password,
    });
  }
  

  
  module.exports = { createUser};
  