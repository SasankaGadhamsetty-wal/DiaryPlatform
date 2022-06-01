/*
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const credentialsDao=require("../controllers/credentials");

router.post("/",jsonParser,async(req,res)=>{
    console.log("Inside  credentials routes");
    console.log(req.body);
    try{
        const newCredential=await credentialsDao.createCredential(req.body);
        res.json({
            message:`Created a new credential for this user ${newCredential.email}`,
        })
    }
    catch(err){
        res.json({
            error: err.toString(),
        });
    }
});

module.exports = router;
*/

const express = require('express');
const credentialsController = require('../controllers/credentials');
const router = express.Router();
router.get('/', credentialsController.getUsersCredentials);
router.get('/:email', credentialsController.getCredentialsByEmail);
router.post('/:email', credentialsController.addNewCredentials);
router.put('/', credentialsController.editCredentials);
router.delete('/', credentialsController.deleteCredentials);


module.exports = router;
