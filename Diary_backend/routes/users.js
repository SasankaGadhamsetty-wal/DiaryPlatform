const express = require('express');
const usersController = require('../controllers/users');
const router = express.Router();
router.post('/signup',usersController.signUpUser);
router.post('/loginuser', usersController.loginUser);
router.get('/', usersController.getAllUsers);
router.get('/:email', usersController.getUserByEmail);

module.exports = router;
