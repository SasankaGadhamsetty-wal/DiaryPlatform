const jwtauthentication = require("../middlewares/authentication");
const { body, param, query, validationResult } = require("express-validator");
const credentials = require("../models").credentials;
exports.getUsersCredentials = [
  async (req, res) => {
    try {
      const users_credentials = await credentials.findAll();
      return res.send({ status: 200, users_credentials });
    } catch (error) {
      return res.send({ status: 500, data: error.message });
    }
  },
];

exports.getCredentialsByEmail = [
  param("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email must be provided correctly"),
  jwtauthentication,
  async (req, res) => {
    const email = req.params.email;
    console.log(email);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
    } else {
      try {
        const findCredentials = await credentials.findAll({
          where: { email },
        });
        return res.send({ status: 200, data: findCredentials });
      } catch (err) {
        return res.send({ status: 500, data: err.message });
      }
    }
  },
];

exports.addNewCredentials = [
  param("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email must be valid"),
  body("platform")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Platform length should be in range 3 and 50"),
  body("emailId")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email must be valid"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage("Password is not strong"),
  jwtauthentication,
  async (req, res) => {
    const email = req.params.email;
    const { platform, emailId, password } = req.body;
    const newCredentials = {
      platform,
      email: emailId,
      password,
    };
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
    } else {
      try {
        const findPlatform=await credentials.findOne({
          where:{platform:platform,email:email}
        });
        if(findPlatform){
          return res.send({ status: 200, data: "This platform credentials are already saved.Please edit if you want to change."});
        }
        else{
          const newCredential = await credentials.create(newCredentials);
          return res.send({
            status: 200,
            data: `Credentials created successfully.`,
            newCredentials:newCredential
          });
        }
      } catch (error) {
        return res.send({ status: 500, data: error.message });
      }
    }
  },
];

exports.deleteCredentials = [
  query("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email must be valid"),
  query("platform")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Platform length should be in range 3 and 50"),
  jwtauthentication,
  async (req, res) => {
    const email = req.query.email;
    const platform = req.query.platform;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
    } else {
      try {
        const findCredentials = await credentials.findOne({
          where: { email: email, platform: platform },
        });
        if (!findCredentials) {
          return res.json({
            status: 200,
            message: "credentials does not exist",
          });
        } else {
          await findCredentials.destroy();
          return res.json({
            status: 200,
            message: "credentials Deleted successfully",
          });
        }
      } catch (error) {
        return res.send({ status: 500, data: error.message });
      }
    }
  },
];

exports.editCredentials = [
  query("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email must be valid"),
  query("platform")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Platform length should be in range 3 and 50"),
  body("platform")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Platform length should be in range 3 and 50"),
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email must be required"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage("Password is not strong"),
  jwtauthentication,
  async (req, res) => {
    const email = req.query.email;
    const platform = req.query.platform;
    console.log(email, platform);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
    } else {
      try {
        const findCredentials = await credentials.findOne({
          where: { email: email, platform: platform },
        });
        if (!findCredentials) {
          return res.send({
            status: 200,
            message: "Cannot update the not existed credentials",
          });
        } else {
          findCredentials.platform = req.body.platform;
          findCredentials.email = req.body.email;
          findCredentials.password = req.body.password;

          await findCredentials.save();
          return res.send({ status: 200, data: findCredentials });
        }
      } catch (error) {
        return res.send({ status: 500, data: error.message });
      }
    }
  },
];
