const express = require('express');
const registerUser = require('../controller/registerUser');
const checkEmail = require('../controller/checkEmail');
const checkPassword = require('../controller/checkPassword');
const userDetails = require('../controller/userDetails');

const router = express.Router();

//create user api
router.post('/register', registerUser);
//check user email
router.post('/email', checkEmail);
// check user password
router.post('/password', checkPassword);
// login user detailes
router.get('/user-details', userDetails);

module.exports = router;
