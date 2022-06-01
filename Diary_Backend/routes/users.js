/*const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const userDao=require("../controllers/users");


router.post("/signup", jsonParser, async (req, res) => {
  console.log("Inside user routes");
  console.log(req.body);
  try {
    const newUser = await userDao.SignUpUser(req.body);
    res.send({
      message: `Created a new user with new email ${newUser.email}`,
    });
  } catch (err) {
    res.send({
      error: err.toString(),
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
*/

const express = require('express');
const usersController = require('../controllers/users');
const router = express.Router();
router.post('/signup',usersController.signUpUser);
router.post('/login', usersController.userLogin);
router.get('/', usersController.getAllUsers);
router.get('/:email', usersController.getUserByEmail);

module.exports = router;
