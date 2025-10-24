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
    await Blog.insertMany(helper.initialBlogs)
    //let BlogObject = new Blog(helper.initialBlogs[0])
    //await BlogObject.save()
    //BlogObject = new Blog(helper.initialBlogs[1])
    //await BlogObject.save()
    //BlogObject = new Blog(helper.initialBlogs[2])
    //await BlogObject.save()
    //BlogObject = new Blog(helper.initialBlogs[3])
    //await BlogObject.save()

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

        const response = await api.get('/api/blogs/')
        const NotIdByBlog = response.body.some(blog => (('id' in blog) && blog.id.length === 24))
        const id = response.body.map(blog => blog.id)

        assert.strictEqual(NotIdByBlog, true)
        assert.strictEqual(id.includes('5a422a851b54a676234d17f7'), true)

    })
})

describe('check if a blog will add correctly with your properties', () => {
    test(' all notes are returned', async () => {
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

    test('check if url and title properties exist blog', async () => {
        await api.post('/api/blogs/').send({
            title: "code is hard",
            author: "Angel C. Miguel",
            //url: "http://blog.code.com",
            likes: 22
        }).expect(400, [{ message: 'blog havent the property tittle or url' }])
    })

    describe('succeeds with valid data', () => {
        test('check that exist like property if not put 0', async () => {
            const response = await api.get('/api/blogs/')
            //const response = await helper.blogsInDb()

            const IsPropertyLikeByBlog = response.body.every(blog => (('likes' in blog)))

            assert.strictEqual(IsPropertyLikeByBlog, true)
            assert.strictEqual(response.body[0].likes, 0)
            assert.strictEqual(response.body[1].likes, 0)
        })
    })

    describe('4.13 - delete a blog', () => {
        test('delete a blog with id', async () => {
            const response = await helper.blogsInDb()
            await api.del(`/api/blogs/${response[3].id}`).expect(204)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
        })
    })
})

describe("update likes' blog ", () => {
    test('set new value to like propiety of blog', async () => {
        const newValueOfLikes = { likes: 55 }
        const responseStart = await helper.blogsInDb()
        const result = await api.put(`/api/blogs/${responseStart[3].id}`).send(newValueOfLikes).expect(200)
        const responsEnd = await helper.blogsInDb()
        assert.strictEqual(responsEnd[3].likes, newValueOfLikes.likes)
        assert.deepStrictEqual(result._body, responsEnd[3])

    })
})


after(async () => {
    await mongoose.connection.close()
})
