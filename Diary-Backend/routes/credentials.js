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