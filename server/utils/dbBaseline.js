require('dotenv').config()
const { RESET_PASSWORD, CONNECTION_STRING } = process.env
const { Client } = require('pg')
const fs = require('fs')

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
})
readline.question(
  'This will erase all db data.\nenter password to continue:\n',
  async (response) => {
    if (response !== RESET_PASSWORD) {
      console.log('Password does not match. Exiting')
      process.exit()
    } else {
      const client = new Client({
        connectionString: CONNECTION_STRING,
        ssl: { rejectUnauthorized: false },
      })
      try {
        await client.connect()

        const dbSeed = fs.readFileSync('db/migrations/seed.sql').toString()

        client.query(dbSeed, (err, res) => {
          if (err) {
            console.log('Could not clear db. Output:\n')
            console.log(err)
          } else {
            console.log('DB Reset')
          }
          process.exit()
        })
      } catch (err) {
        console.log('Error connecting, output:\n')
        console.log(err)
        process.exit()
      }
    }
  }
)
