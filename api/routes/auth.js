const express = require('express')
const authRoute = express.Router()
const authControllers = require('../controllers/auth/index')
const middlewares = require('../middlewares/index')

authRoute.post('/auth/login', authControllers.loginController)

authRoute.post('/auth/register', authControllers.registerController)

authRoute.get('/user', middlewares.verifyJwt.verifyToken, authControllers.userController.getUser)

module.exports = authRoute