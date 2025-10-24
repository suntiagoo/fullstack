require('dotenv').config()
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const assert = require('node:assert')

const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})
    let BlogObject = new Blog(helper.initialBlogs[0])
    await BlogObject.save()
    BlogObject = new Blog(helper.initialBlogs[1])
    await BlogObject.save()
    BlogObject = new Blog(helper.initialBlogs[2])
    await BlogObject.save()
    BlogObject = new Blog(helper.initialBlogs[3])
    await BlogObject.save()

})



describe('4.8 - get blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(201)
            .expect('Content-Type', /application\/json/)
    })
})

describe('4.9 - check the name of blog id', () => {
    test('check if the id blog call "id"', async () => {

        const response = await api.get('/api/blogs')
        const NotIdByBlog = response.body.some(blog => (('id' in blog) && blog.id.length === 24))
        const id = response.body.map(blog => blog.id)

        assert.strictEqual(NotIdByBlog, true)
        assert.strictEqual(id.includes('5a422a851b54a676234d17f7'), true)

    })
})

describe('4.10 - POST blog', () => {
    test('check if a blog will add correctly', async () => {
        await api.post('/api/blogs/').send({
            title: "code is hard",
            author: "Angel C. Miguel",
            url: "http://blog.code.com",
            likes: 22
        }).expect(201).expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
        assert.strictEqual(response.body[response.body.length], helper.initialBlogs[helper.initialBlogs.length + 1])
    })
})

describe('4.11* check like propierty exist in blog', () => {
    test('check that exist like property if not put 0', async () => {
        const response = await api.get('/api/blogs')
        const IsPropertyLikeByBlog = response.body.every(blog => (('likes' in blog)))

        assert.strictEqual(IsPropertyLikeByBlog, true)
        assert.strictEqual(response.body[0].likes, 0)
        assert.strictEqual(response.body[1].likes, 0)
    })
})

describe('4.12* - POST verificate url and title properties', () => {
    test('check if url and title properties exist blog', async () => {
        await api.post('/api/blogs').send({
            title: "code is hard",
            author: "Angel C. Miguel",
            //url: "http://blog.code.com",
            likes: 22
        }).expect(400, [{ message: 'blog havent the property tittle or url' }])
    })
})

after(async () => {
    await mongoose.connection.close()
})
