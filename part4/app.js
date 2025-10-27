require('dotenv').config()
const express = require('express')
//require('express-async-errors')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')



app.use(express.json())
app.use(cors())
app.use(express.json())
app.use(middleware.getTokenFrom)
app.use(middleware.requestLogger)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app
