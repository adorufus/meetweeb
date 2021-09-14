const express = require('express')
const authRoute = express.Router()
const authControllers = require('../controllers/auth/index')

authRoute.post('/auth/login', authControllers.loginController)

authRoute.post('/auth/register', authControllers.registerController)

module.exports = authRoute