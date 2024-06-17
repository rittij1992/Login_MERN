const express = require('express');
const Router = express.Router();
const userController = require('../controller/UserController');
const { auth } = require('../middleware/Auth');

Router.post('/register', userController.registeUser);
Router.post('/login', userController.loginUser);
Router.get('/:id', [auth], userController.getUser);


module.exports = Router;