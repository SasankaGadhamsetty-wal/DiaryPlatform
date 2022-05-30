const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const userDao=require("../dao/user");


router.post("/", jsonParser, async (req, res) => {
  console.log("Inside user routes");
  console.log(req.body);
  try {
    const newUser = await userDao.createUser(req.body);
    res.json({
      message: `Created a new user with new email ${newUser.email}`,
    });
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});



module.exports = router;
