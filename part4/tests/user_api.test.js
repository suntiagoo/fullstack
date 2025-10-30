require('dotenv').config()
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const User = require('../models/user')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const assert = require('node:assert')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'alfred', passwordHash })

    await user.save()
})

describe('view the users ', () => {
    test('blogs are returned as json', async () => {
        await api.get('/api/users').expect(201).expect('Content-Type', /application\/json/)
    })

    test('GET all Users', async () => {
        const result = await api.get('/api/users')
        const dbResult = await helper.usersInDb()
        assert.deepStrictEqual(result.body, dbResult)
        assert.strictEqual(result.body.length, dbResult.length)
    })
})

describe('creation succeeds with a fresh usernam', () => {


    test('valid username', async () => {
        const newUser = {
            username: 'co',
            name: 'Roni Feiman',
            password: 'cools',
        }

        await api.post('/api/users').send(newUser).expect(400)
    })

    test('unique username', async () => {
        const newUser = { username: 'root', name: 'alfred', password: 'alfa' }

        await api.post('/api/users').send(newUser).expect(400)
    })

    test('POST user', async () => {
        const dbResult = await helper.usersInDb()

        const newUser = {
            username: 'Cols',
            name: 'Roni Feiman',
            password: 'cools',
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAfterAdded = await helper.usersInDb()
        assert.strictEqual(usersAfterAdded.length, dbResult.length + 1)
        const usernames = usersAfterAdded.map(user => user.username)
        assert(usernames.includes(newUser.username))
    })

})

after(async () => {
    await mongoose.connection.close()
})

