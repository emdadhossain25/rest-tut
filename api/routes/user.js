const express = require('express');
const route = express.Router();

const authenticate = require('../middleware/authenticate')

const userController = require('../controllers/user')

route.get('/',authenticate,userController.getAllusers)

route.post('/register',userController.registerUserController)

route.post('/login',userController.loginController)

module.exports = route