const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, createBlog } = require('./helper')
const { assert } = require('console')
const { json } = require('stream/consumers')
describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', { data: { name: 'test', username: 'test', password: 'test' } })

        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        await page.getByRole('button', { name: 'Access' }).click()
        await expect(page.getByTestId('username')).toBeVisible()
        await expect(page.getByTestId('password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'log in' })).toBeVisible()

    })

    describe('Login', () => {
        /*beforeEach(async ({page}) => {
            await page.getByRole('button',{name:'Access'}).click()
        })*/

        test('succeeds with correct credentials', async ({ page }) => {
            /* await page.getByRole('button', { name: 'Access' }).click()
             await page.getByTestId('username').fill('test')
             await page.getByTestId('password').fill('test')
             await page.getByRole('button', { name: 'log in' }).click()*/
            await login(page, 'test', 'test')
            await expect(page.getByRole('button', { name: 'new blog' })).toBeVisible()
        })


        test('fails with wrong credentials', async ({ page }) => {
            /*await page.getByRole('button', { name: 'Access' }).click()
            await page.getByTestId('username').fill('cucasona')
            await page.getByTestId('password').fill('12345')
            await page.getByRole('button', { name: 'log in' }).click()*/
            await login(page, 'cucasa', '12345')
            await expect(page.getByText('invalid username or password')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await login(page, 'test', 'test')
        })

        test('a new blog can be created', async ({ page }) => {
            /*await page.getByRole('button', { name: 'new blog' }).click()
            await page.getByTestId('title').fill('new blog test')
            await page.getByTestId('author').fill('Sun Shemes')
            await page.getByTestId('url').fill('wwww.test.com')
            await page.getByRole('button', { name: 'create' }).click()
            await page.getByRole('button', { name: 'view' }).click()*/
            await createBlog(page, 'new blog test', 'Sun Shemes', 'wwww.test.com')
            await expect(page.getByRole('listitem')).toHaveCount(4)
            await expect(page.getByTestId('articleContainer')).toHaveCount(1)
            await expect(page.getByText('new blog test.')).toBeVisible()
            await expect(page.getByText('Author: Sun Shemes')).toBeVisible()
            await expect(page.getByText('Url: wwww.test.com')).toBeVisible()
        })

        test('the blog is editing', async ({ page }) => {
            await page.getByRole('button', { name: 'new blog' }).click()
            await expect(page.getByTestId('title')).toBeEditable()
            await expect(page.getByTestId('author')).toBeEditable()
            await expect(page.getByTestId('url')).toBeEditable()
        })
    })
})