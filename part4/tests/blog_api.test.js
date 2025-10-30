require('dotenv').config()
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const helper = require('./test_helper')
const assert = require('node:assert')

const api = supertest(app)
let token;
describe('route with jwt', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        const res = await api
            .post('/api/login')
            .send({ username: 'root', password: 'sekret' }).expect(201);
        token = res.body.token;
    })

    test('should create a new blog with a valid JWT', async () => {
        const blog = {
            title: "code is hard",
            author: "Angel C. Miguel",
            url: "http://blog.code.com",
            //likes: 22
        }
        const res = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            .expect(201);
        assert.strictEqual(res.body.title, blog.title)
    });
})

describe('route with invalid token', () => {
    test('should return status code 400', async () => {
        const blog = {
            title: "TDD ",
            author: "meryon",
            url: "http://blog.meryon.com",
            likes: 36
        }
        await api
            .post('/api/blogs')
            .send(blog)
            .expect(401);
    })
})

describe('validated id', () => {
    test('check if the id blog call "id"', async () => {
        const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)

        const isIdByBlog = response.body.some(blog => (('id' in blog) && blog.id.length === 24))
        //const id = response.body.map(blog => blog.id)

        assert.strictEqual(isIdByBlog, true)
        //assert.strictEqual(id.includes('6903c6aa1b15383ad505b034'), true)

    })

})

describe('4.8 - get blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs').set('Authorization', `Bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    })
})

describe('check if a blog will add correctly with your properties', () => {

    test(' all notes are returned', async () => {
        const dataStart = await helper.blogsInDb()
        await api.post('/api/blogs/').set('Authorization', `Bearer ${token}`).send({
            title: "arquitecture is hard",
            author: "michaell jordan",
            url: "http://blog.arquitecture.com",
            likes: 15
        }).expect(201).expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
        assert.strictEqual(response.body.length, dataStart.length + 1)
        assert.strictEqual(response.body[response.body.length], dataStart[dataStart.length + 1])
    })

    test('check if url and title properties exist blog', async () => {
        await api.post('/api/blogs/').set('Authorization', `Bearer ${token}`).send({
            title: "code is hard",
            author: "Angel C. Miguel",
            //url: "http://blog.code.com",
            likes: 22
        }).expect(400, { message: 'blog havent the property tittle or url' })
    })
})

describe('succeeds with valid data', () => {
    test('check that exist like property if not put 0', async () => {
        const response = await api.get('/api/blogs/').set('Authorization', `Bearer ${token}`)
        const IsPropertyLikeByBlog = response.body.every(blog => (('likes' in blog)))

        assert.strictEqual(IsPropertyLikeByBlog, true)
        assert.strictEqual(response.body[0].likes, 0)
    })
})

describe('4.13 - delete a blog', () => {
    test('delete a blog with id', async () => {
        const response = await api.get('/api/blogs/').set('Authorization', `Bearer ${token}`)
        await api.del(`/api/blogs/${response._body[1].id}`).set('Authorization', `Bearer ${token}`).expect(204)
        const blogsAtEnd = await api.get('/api/blogs/').set('Authorization', `Bearer ${token}`)
        assert.strictEqual(blogsAtEnd._body.length, response._body.length - 1)
    })
})


describe("update likes' blog ", () => {
    test('set new value to like propiety of blog', async () => {
        const newValueOfLikes = { likes: 55 }
        const responseStart = await helper.blogsInDb()
        await api.put(`/api/blogs/${responseStart[0].id}`).set('Authorization', `Bearer ${token}`).send(newValueOfLikes).expect(200)
        const responsEnd = await api.get('/api/blogs/').set('Authorization', `Bearer ${token}`)
        assert.strictEqual(responsEnd._body[0].likes, 55)
    })
})
after(async () => {
    await mongoose.connection.close()
})
