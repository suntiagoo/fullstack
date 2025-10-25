const bcrypt = require('bcrypt')
const User = require('../models/user')
const userRouter = require('express').Router()

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    response.status(201).json(users)
})

userRouter.post('/', async (request, response) => {

    const { username, name, password } = request.body
    const saltRounds = 10

    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User(
        {
            username,
            name,
            passwordHash,
        }
    )
    const newUser = await user.save()
    response.status(201).json(newUser)
})

userRouter.delete('/:id', async (request, response) => {
    await User.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

userRouter.put('/:id', async (request, response) => {
    const body = request.body

    /* const user =  {
         username,
         name,
         password: body.password,
         note: body.note
 
     }*/

    const result = await User.findByAndUpdate(request.params.id, { $set: { name: body.name } }, { new: true })
    response.status(200).json(result)
})

module.exports = userRouter