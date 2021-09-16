const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const _ = require('lodash')

var User = mongoose.model('User')

module.exports.getUser = function getUserDetails(req, res) {

    var userId = req.query.id

    if (!userId) {
        User.findOne({ _id: req._id }, (err, user) => {
            if (!user) return res.status(400).json({
                status: "error", message: "No User Found!"
            })
            else return res.status(200).json({ status: "success", data: _.pick(user, ["_id", "fullName", "email", "username", "birthDate"]) })
        })
    } else {
        User.findOne({ _id: userId }, (err, user) => {
            if (!user) return res.status(400).json({
                status: "error", message: "No User Found!"
            })
            else return res.status(200).json({ status: "success", data: _.pick(user, ["_id", "fullName", "email", "username", "birthDate"]) })
        })
    }
}