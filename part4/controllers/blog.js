const Blog = require('../models/blog')
const blogRouter = require('express').Router()


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.status(201).json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const newBlog = await blog.save()
    response.status(201).json(newBlog)

})

module.exports = blogRouter