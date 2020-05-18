const express = require('express')
const app = express()
require('dotenv').config()
const router = require('./router')
const applyMiddleware = require('./middleware/applyMiddleware')
const dbConnect = require('./utils/dbConnect')
const { SERVER_PORT } = process.env

applyMiddleware(app)

dbConnect(app)

app.use('/api', router)

app.listen(SERVER_PORT, () => console.log(`Getting fit on port ${SERVER_PORT}`))
