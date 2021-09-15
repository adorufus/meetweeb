require('../config/config')
require('./models/db')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const useragent = require('express-useragent')
const app = express()
const routers = require('./routes/index')
const PORT = process.env.PORT

app.use(bodyParser.json())
app.use(cors())
app.use(useragent.express())

app.get('/', (req, res) => {
    res.status(403).json({
        "message": "Access Unauthorized!",
        "ua": req.useragent
    })
})

app.use('/api/v1', routers.authRoute)

app.listen(PORT, () => {
    console.log("app running in port " + PORT)
})