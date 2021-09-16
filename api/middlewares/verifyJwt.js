const jwt = require('jsonwebtoken')

module.exports.verifyToken = function verfyJwt(req, res, next) {
    var token;
    if ('authorization' in req.headers) {
        token = req.headers['authorization'].split(' ')[1]
    }

    if (!token) {
        return res.status(403).json({
            status: "error",
            message: "No JWT Provided!"
        })
    }
    else {
        jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
            if (err) return res.status(500).json({ status: "error", message: "Failed To Authenticate", error: err })
            else {
                req._id = result._id
                next()
            }
        })
    }
}