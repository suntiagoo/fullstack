const { Types } = require('mongoose')
const mongoose = require('./index')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
    },
    author: String,
    url: {
        type: String,
        validate: {
            validator: function (v) { return /^(https?:\/\/)?([da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v); },
            message: props => `${props.value} is not a valid URL!`,
        }
    },
    likes: {
        type: Number,
        min: 0
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('Blog', blogSchema)