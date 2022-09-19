const express = require('express');
const actionController = require('../controllers/actions');

const router = express.Router();

router.post('/delete', actionController.delete);
//router.post('/upload', authController.login);

module.exports = router;