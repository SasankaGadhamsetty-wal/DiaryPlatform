const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const noteDao=require("../dao/note");

router.post("/",jsonParser,async(req,res)=>{
    console.log("Inside note routes");
    console.log(req.body);
    try{
        const newNote=await noteDao.createNote(req.body);
        res.json({
            message:`Created a new note for this user ${newNote.email}`,
        })
    }
    catch(err){
        res.json({
            error: err.toString(),
        });
    }
});

module.exports = router;