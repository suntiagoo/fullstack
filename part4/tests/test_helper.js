const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        //likes: 7,
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/",
        //likes: 5,
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/transcriptions",
        likes: 12,
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob",
        likes: 10,
    },
]

const initialUser = [
    {
        _id: "5a422a851b54a676234d17f9",
        username: "alfa",
        name: "Michael Chan",
        passwordHash: 'omega'
    },
]


const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}


const usersInDb = async () => {
    const user = await User.find({})
    return user.map(user => user.toJSON())
}
module.exports = {
    initialUser, nonExistingId, blogsInDb, usersInDb,
}
