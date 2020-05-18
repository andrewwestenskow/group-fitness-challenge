const express = require('express')

module.exports = (app) => {
  app.use(express.json())

  app.use((req, res, next) => {
    const db = req.app.get('db')
    req.db = db
    next()
  })
}
