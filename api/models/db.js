const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, (err) => {
    if(err) {console.log("cant connect to the database, reason: " + JSON.stringify(err, undefined, 2))}
    else {
        console.log("DB connected!")
    }
    
})

require('./user.model')