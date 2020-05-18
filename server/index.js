const express = require('express')
const app = express()
require('dotenv').config()
const applyMiddleware = require('./middleware/applyMiddleware')
const massive = require('massive')
const dbConnect = require('./utils/dbConnect')
const { SERVER_PORT, CONNECTION_STRING } = process.env

applyMiddleware(app)

dbConnect(app)

app.get('/', (req, res) => res.send('Hello'))

app.listen(SERVER_PORT, () => console.log(`Getting fit on port ${SERVER_PORT}`))
