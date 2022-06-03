const jwtauthentication = require("../middlewares/authentication");
const { body, param, query, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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

exports.signUpUser = [
  body("name").trim().isAlpha().notEmpty().withMessage("Name must be provided"),
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email must be provided correctly"),
  body("age").isNumeric(),
  body("password")
    .trim()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage("Password is not strong"),
  body("mobile").trim().notEmpty().withMessage("Mobile number is required"),
  async (req, res) => {
    const { name, age, mobile, email, password } = req.body;
    const newUser = { name, age, mobile, email, password };
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
    } else {
      try {
        const findExistedUser = await users.findOne({
          where: { email },
        });
        if (findExistedUser) {
          return res.send({
            status: 200,
            message: "This user already existed",
          });
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
    }
  },
];
exports.getUserByEmail = [
  param("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email must be provided correctly"),
  jwtauthentication,
  async (req, res) => {
    const email = req.params.email;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
    } else {
      try {
        const findUser = await users.findOne({
          where: { email },
        });
        return res.send({ status: 200, user: findUser });
      } catch (error) {
        return res.send({ status: 500, data: error.message });
      }
    }
  },
];



exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(`request: ${req.body.email} password: ${password}`);
  try {
      const userDetails = await users.findOne({ where: { email } });
      console.log(userDetails.dataValues);
      if (userDetails) {
          const passCorrect = await bcrypt.compareSync(password, userDetails.password);
           if (!passCorrect) {
              console.log(passCorrect);
              console.log(password);
              console.log(userDetails.password);
              res.status(400).json({ error: 'user credentials wrong' });
          } else {
              const payload = {
                  userDetails: {
                      email: email,
                      password: password,
                  },
              };
              const token = jwt.sign(payload, 'secret123', { expiresIn: 5200 });
              res.status(200).json({ token, userDetails });
          }
      } else {
          res.status(400).json({ error: 'email not exist' });
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'temporary error in backend' });
  }
};

/*
exports.userLogin = async (req, res) => {
  console.log("Inside user login");
  const { email, password } = req.body;
  try {
    const userCredentials = await users.findOne({
      where: { email: email, password: password },
    });
    console.log(JSON.stringify(userCredentials, null, 2));
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
*/