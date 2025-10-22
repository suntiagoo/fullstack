require('dotenv').config()
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})
    let BlogObject = new Blog(helper.initialBlogs[0])
    await BlogObject.save()
    BlogObject = new Blog(helper.initialBlogs[1])
    await BlogObject.save()
})


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(201)
        .expect('Content-Type', /application\/json/)
})

after(async () => {
    await mongoose.connection.close()
})