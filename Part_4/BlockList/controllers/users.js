const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


// usersRouter.get('/', async (request, response) => {
//   const users = await User.find({})
//   response.json(users)
// })

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User
     .find({}).populate('blogs')
     // .find({}).populate('notes', { content: 1, date: 1 })
     // .find({}).populate('user', { username: 1, name: 1 })
     response.json(users)
  } catch (error) {
    next(error)
}
})


usersRouter.post('/', async (request, response) => {

  const { username, name, password } = request.body

  if (!username || !name || !password) {
    return response.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  if (username.length < 3 || name.length < 3) {
    return response.status(400).json({ error: 'Username y name deben tener al menos 3 caracteres.' });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({ error: 'El username ya está en uso.' });
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username: username,
    name: name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter