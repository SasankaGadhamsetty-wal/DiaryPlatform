const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const userDao=require("../controllers/users");


router.post("/", jsonParser, async (req, res) => {
  console.log("Inside user routes");
  console.log(req.body);
  try {
    const newUser = await userDao.SignUpUser(req.body);
    res.send({
      status:200,message: `Created a new user with new email ${newUser.email}`,
    });
  } catch (err) {
    res.send({
      status:500,error: err.toString(),
    });
  }
});

router.get("/", async (req, res) => {
  console.log(`Email:${req.query.email}`);
try {
  const Users = await userDao.getAllUsers();
  res.send({message:`All Users are`,Users});
} catch (err) {
  res.send({
    error: err.toString(),
  });
}
});


module.exports = router;
