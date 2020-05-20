const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    const {
      email,
      password,
      firstName: first_name,
      lastName: last_name,
    } = req.body

    const [existingUser] = await req.db.users_auth.find({ email })

    if (existingUser) {
      return res.status(409).send('Email already exists')
    }

    const salt = bcrypt.genSaltSync(10)

    const hash = bcrypt.hashSync(password, salt)

    const newUser = await req.db.users_auth.insert({ email, hash })

    const newUserDetails = await req.db.users.insert({
      auth_id: newUser.user_auth_id,
      first_name,
      last_name,
    })

    const userObj = { ...newUserDetails, email: newUser.email }

    req.session.currentUser = res.status(200).send(userObj)
  },
  login: (req, res) => {},
}
