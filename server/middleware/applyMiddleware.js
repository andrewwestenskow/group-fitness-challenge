const express = require('express')
const session = require('express-session')
const { SESSION_SECRET } = process.env

module.exports = (app) => {
  app.use(express.json())

  app.use(
    session({
      secret: SESSION_SECRET,
      saveUninitialized: true,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 31,
      },
    })
  )

  app.use((req, res, next) => {
    const db = req.app.get('db')
    req.db = db

    next()
  })
}
