const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const blogRouter = require('express').Router()


const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}


blogRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

    const blogObject = blogs.map(blog => {
        const blogObject = blog.toObject();
        if (!('likes' in blogObject)) {

            blogObject.likes = 0
            delete blogObject.__v
        }
        blogObject.id = blogObject._id
        delete blogObject._id
        return blogObject
    })

    /*const blogObjectOpcion2 = blogs.map(blog =>{
        //const blogObject =  blog.toObject();
        blogObject ={
            title : blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes || 0
        }
        return blogObject
    })*/

    response.status(201).json(blogObject)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body
    //console.log(body)
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user.id
    })
    if (!('title' in blog.toObject()) || !('url' in blog.toObject())) {
        response.status(400).json([{ message: 'blog havent the property tittle or url' }])
    }

    const newBlog = await blog.save()
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()
    response.status(201).json(newBlog)

})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        _id: body.id,
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    const result = await Blog.findByIdAndUpdate(request.params.id, { $set: { likes: body.likes } }, { new: true })
    response.status(200).json(result)

})

module.exports = blogRouter