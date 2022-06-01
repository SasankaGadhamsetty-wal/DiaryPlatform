/*const res = require("express/lib/response");

const User = require("../models").users;
console.log("Inside dao");
async function SignUpUser({ name, age, mobile, email, password }) {
 return User.create({
        name,
        age,
        mobile,
        email,
        password,
      });
}

async function getAllUsers() {
  return User.findAll();
}

module.exports = { SignUpUser, getAllUsers };
*/
const jwtauthentication = require('../middlewares/authentication');
const jwt = require('jsonwebtoken');
const users = require("../models").users;
exports.getAllUsers = [
  jwtauthentication,
  async (req, res) => {
    try {
      const all_users = await users.findAll();
      return res.send({ status: 200, all_users });
    } catch (error) {
      return res.send({ status: 500, data: error.message });
    }
  },
];

exports.signUpUser = async (req, res) => {
  const { name, age, mobile, email, password } = req.body;
  const newUser = { name, age, mobile, email, password };
  try {
    const findExistedUser = await users.findOne({
      where: { email },
    });
    if (findExistedUser) {
      return res.send({ status: 200, message: "This user already existed" });
    } else {
      await users.create(newUser);
      return res.send({
        status: 200,
        message: `User with the email ${email} has created an account successfully`,
      });
    }
  } catch (error) {
    return res.send({ status: 500, message: error.message });
  }
};

exports.getUserByEmail = [
  jwtauthentication,
  async (req, res) => {
    const email = req.params.email;
    try {
      const findUser = await users.findOne({
        where: { email },
      });
      return res.send({ status: 200, user: findUser });
    } catch (error) {
      return res.send({ status: 500, data: error.message });
    }
  },
];

exports.userLogin = async (req, res) => {
  console.log("Inside user login");
  const { email, password } = req.body;
  try {
    const userCredentials = await users.findOne({ where: { email } });
    console.log(JSON.stringify(userCredentials,null,2));
    if (!userCredentials) {
      res.status(400).json({ error: "User credentials wrong." });
    } else {
      const payload = {
        userCredentials: {
          email: email,
          password: password,
        },
      };
      const token = jwt.sign(payload, "secret123");
      res.status(200).json({ token, userCredentials });
    }
  } catch (error) {
    res.status(500).json({ error: "Temporary error in backend" });
  }
};
