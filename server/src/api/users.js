const express = require('express');
const userAuth = require('../modules/UserService/userService.service');
const verifyJWT = require('../middleware/verifyJWT');

const users = express.Router();

users.post('/auth', userAuth.login);
users.post('/forget_password', userAuth.forgetPassword);
users.post('/register', userAuth.signup);

users.use(verifyJWT);

users.get('/logout', userAuth.logout);

module.exports = users;
