require('../config/config')
require('./models/db')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const routers = require('./routes/index')
const PORT = process.env.PORT

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(403).json({
        "message": "Access Unauthorized!"
    })
})

app.use('/api/v1', routers.authRoute)

app.listen(PORT, () => {
    console.log("app running in port " + PORT)
})