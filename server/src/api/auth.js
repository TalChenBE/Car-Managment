const express = require('express');
const userAuth = require('../modules/UserService/userService.service');

const auth = express.Router();

auth.post('/', userAuth.login);

module.exports = auth;
