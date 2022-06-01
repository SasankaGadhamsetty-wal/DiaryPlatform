/*
const Credential=require("../models").credentials;
console.log("Inside dao");
//Creating credential
async function createCredential({
    platform,email,password
}){
    return Credential.create({
        platform,email,password,
    });
}


module.exports = { createCredential};
*/
const jwtauthentication = require('../middlewares/authentication');
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
  jwtauthentication,
  async (req, res) => {
    const email = req.params.email;
    console.log(email);
    try {
      const findCredentials = await credentials.findOne({
        where: { email },
      });
      return res.send({ status: 200, data: findCredentials });
    } catch (err) {
      return res.send({ status: 500, data: err.message });
    }
  },
];

exports.addNewCredentials = [
  jwtauthentication,
  async (req, res) => {
    const email = req.params.email;
    const { platform, emailId, password } = req.body;
    const newCredentials = {
      platform,
      email: emailId,
      password,
    };
    try {
      const newCredential = await credentials.create(newCredentials);
      return res.send({
        status: 200,
        data: `Credentials created successfully.`,
      });
    } catch (error) {
      return res.send({ status: 500, data: error.message });
    }
  },
];

exports.deleteCredentials = [
  jwtauthentication,
    async (req, res) => {
        const email = req.query.email;
        const platform=req.query.platform;
        try {
            const findCredentials = await credentials.findOne({
                where: { email:email,platform:platform },
            });
            await findCredentials.destroy();
            return res.json({ status: 200, message: 'credentials Deleted successfully' });
        } catch (error) {
            return res.send({ status: 500, data: error.message });
        }
    },
];

exports.editCredentials = [
  jwtauthentication,
      async (req, res) => {
         const email = req.query.email;
         const platform=req.query.platform;
         console.log(email,platform);
         try {
             const findCredentials = await credentials.findOne({
                 where: { email:email,platform:platform },
             });
             findCredentials.platform = req.body.platform;
             findCredentials.email=req.body.email;
             findCredentials.password=req.body.password;
 
             await findCredentials.save();
             return res.send({ status: 200, data: findCredentials });
         } catch (error) {
             return res.send({ status: 500, data: error.message });
         }
     },
 ];