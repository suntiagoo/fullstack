const Blog = require('../models/blog')
const blogRouter = require('express').Router()


blogRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({})
    const blogObject = blogs.map(blog => {
        const blogObject = blog.toObject();
        if (!('likes' in blogObject)) {

            blogObject.likes = 0
            delete blogObject.__v
        }
        return blogObject
    })


    response.status(201).json(blogObject)

})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    //const isLikeByBlog = keys.some(key => ('likes' in key))

    if (!('likes' in blog)) {
        blog.likes = 0
    }

    const newBlog = await blog.save()
    response.status(201).json(newBlog)

})

module.exports = blogRouter