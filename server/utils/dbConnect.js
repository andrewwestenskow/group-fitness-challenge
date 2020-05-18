const massive = require('massive')
const { CONNECTION_STRING } = process.env

module.exports = (app) => {
  massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false },
  })
    .then((db) => {
      app.set('db', db.fitness_dev)
    })
    .catch((err) => console.log(err))
}
