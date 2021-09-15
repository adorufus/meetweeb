const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { use } = require('../../routes/auth')
const useragent = require('express-useragent')

const User = mongoose.model('User')

const register = async (req, res, next) => {
  var user = new User()

  var { fullName, username, password, email, birthDate, from } = req.body

  if (username && password && email) {
    if (password.length <= 8) {
      res.status(400).json({
        status: 'error',
        message: 'Password at least 8 characters long',
      })
    } else {
      var salt = await bcrypt.genSalt(10)

      user.username = username
      user.email = email
      user.password = await bcrypt.hash(password, salt)
      user.saltSecret = salt
      user.birthDate = birthDate
      user.fullName = fullName
      user.registerDate = Date.now()
      user.registered_from = from ? from : "undefined"
      user.save((err, doc) => {
        if (err) {
          if(err.code == 11000){
            res.status(400).json({
                status: 'error',
                message: "Email or Username Already Registered",
                error: err
              })
          } else {
              return next(err)
          }
        } else {
            res.status(201).json({
                status: 'success',
                message: 'user created!',
                data: doc,
              })
        }
        
      })
    }
  } else {
    res.status(400).json({
      status: 'error',
      message: 'Some Input Required!',
    })
  }
}

module.exports = register
