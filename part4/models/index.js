const config = require('../utils/config')
const mongoose = require('mongoose')

//const mongoUrl = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

module.exports = mongoose