const express = require('express')
const auth = require('../../controllers/auth')

const router = express()

const { register, login } = auth

router.post('/register', register)

module.exports = router
