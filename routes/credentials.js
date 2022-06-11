const express = require('express');
const credentialsController = require('../controllers/credentials');
const router = express.Router();
router.get('/', credentialsController.getUsersCredentials);
router.get('/:email', credentialsController.getCredentialsByEmail);
router.post('/add/:email', credentialsController.addNewCredentials);
router.put('/edit', credentialsController.editCredentials);
router.delete('/', credentialsController.deleteCredentials);


module.exports = router;
