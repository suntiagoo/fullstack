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
    if (!('title' in blog.toObject()) || !('url' in blog.toObject())) {
        response.status(400).json([{ message: 'blog havent the property tittle or url' }])
    }

    const newBlog = await blog.save()
    response.status(201).json(newBlog)

})

module.exports = blogRouter