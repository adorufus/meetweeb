const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

var userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  birthDate: {
    type: Date,
  },
  password: {
    type: String,
    required: true,
  },
  registered_from: String,
  registerDate: {
    type: Date,
    default: Date.now(),
  },
  saltSecret: String,
})

userSchema.path('email').validate((val) => {
    emailRegex = /^[\/\!#\$\%&'\*\+\-\=\?\^_`\{\|\}~A-Za-z0-9]+[\.-]?[\/\!#\$\%&'\*\+\-\=\?\^_`\{\|\}~A-Za-z0-9]*@\w+([\.-]?\w+)*(\.\w{2,40})+$/
    return emailRegex.test(val);
}, 'Invalid Email Format!')

mongoose.model('User', userSchema)
