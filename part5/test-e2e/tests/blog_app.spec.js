const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, createBlog, logOut } = require('./helper')
const { assert } = require('console')
const { json } = require('stream/consumers')
describe('Blog app', () => {

    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', { data: { name: 'root', username: 'root', password: 'root' } })
        await request.post('/api/users', { data: { name: 'test', username: 'test', password: 'test' } })
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        await page.getByRole('button', { name: 'Access' }).click()
        await expect(page.getByTestId('username')).toBeVisible()
        await expect(page.getByTestId('password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'log in' })).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await login(page, 'test', 'test')
            await expect(page.getByRole('button', { name: 'new blog' })).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await login(page, 'cucasa', '12345')
            await expect(page.getByText('invalid username or password')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await login(page, 'test', 'test')
        })

        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'new blog test', 'Sun Shemes', 'wwww.test.com', 'test')
            await expect(page.getByTestId('articleContainer')).toHaveCount(1)
            await expect(page.getByTestId('articleContainer')).toBeVisible()
            await expect(page.getByText('Author: Sun Shemes')).toBeVisible()
            await expect(page.getByText('Url: wwww.test.com')).toBeVisible()
        })

        test('the blog is editing', async ({ page }) => {
            await page.getByRole('button', { name: 'new blog' }).click()
            await expect(page.getByTestId('title')).toBeEditable()
            await expect(page.getByTestId('author')).toBeEditable()
            await expect(page.getByTestId('url')).toBeEditable()
        })

        test('the user who create a blog can delete it', async ({ page }) => {
            await createBlog(page, 'code blog', 'Thiago Talias', 'wwww.code.com', 'test')
            await createBlog(page, 'new blog test2', 'Sun Shemes2', 'wwww.test2.com', 'test')

            page.on("dialog", async dialog => {
                console.log(dialog.message())
                await dialog.accept()
            })
            await expect(page.getByTestId('articleChild').filter({ has: page.getByText('User: test') }).and(page.getByTestId('articleChild').filter({ has: page.getByRole('button', { name: 'remove' }) })).and(page.getByTestId('articleChild').filter({ has: page.getByText('code blog') }))).toBeVisible()
            const removeButton = page.getByTestId('articleChild').filter({ has: page.getByText('User: test') }).and(page.getByTestId('articleChild').filter({ has: page.getByRole('button', { name: 'remove' }) })).and(page.getByTestId('articleChild').filter({ has: page.getByText('code blog') }))
            removeButton.getByRole('button', { name: 'remove' }).click()
            const articleTotal = await page.getByTestId('articleContainer').count().then(value => value - 1)
            await expect(page.getByTestId('articleContainer')).toHaveCount(articleTotal)
            await expect(page.getByText('Thiago Talias')).not.toBeVisible()
        })

        test('only the user who created a blog can see the remove button', async ({ page }) => {
            await createBlog(page, 'code blog', 'Thiago Talias', 'wwww.code.com', 'test')
            await createBlog(page, 'new blog test2', 'Sun Shemes2', 'wwww.test2.com', 'test')
            await logOut(page)
            await login(page, 'root', 'root')
            await createBlog(page, 'ROOT', 'TOOT', 'wwww.root.com', 'root')
            await expect(page.getByTestId('articleChild').filter({ has: page.getByText('User: test') }).and(page.getByTestId('articleChild').filter({ has: page.getByRole('button', { name: 'remove' }) })).and(page.getByTestId('articleChild').filter({ has: page.getByText('code blog') }))).not.toBeVisible()
            await logOut(page)
            await login(page, 'test', 'test')
            const viewButton = page.getByTestId('articleContainer').filter({ hasText: 'User: test' }).and(page.getByTestId('articleContainer').filter({ hasText: 'code blog' }))
            await viewButton.getByRole('button', { name: 'view' }).click()

            /* page.on("dialog", async dialog => {
                 console.log(dialog.message())
                 await dialog.accept()
             })*/
            await expect(page.getByTestId('articleChild').filter({ has: page.getByText('User: test') }).and(page.getByTestId('articleChild').filter({ has: page.getByRole('button', { name: 'remove' }) })).and(page.getByTestId('articleChild').filter({ has: page.getByText('code blog') }))).toBeVisible()
            /*const removeButton = page.getByTestId('articleChild').filter({ has: page.getByText('User: test') }).and(page.getByTestId('articleChild').filter({ has: page.getByRole('button', { name: 'remove' }) })).and(page.getByTestId('articleChild').filter({ has: page.getByText('code blog') }))
            removeButton.getByRole('button', { name: 'remove' }).click()
            const articleTotal = await page.getByTestId('articleContainer').count().then(value => value - 1)
            await expect(page.getByTestId('articleContainer')).toHaveCount(articleTotal)
            await expect(page.getByText('Thiago Talias')).not.toBeVisible()*/
        })
    })
})
