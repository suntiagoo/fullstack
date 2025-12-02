const { test, expect, beforeEach, describe } = require('@playwright/test')

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
            await page.getByRole('button', { name: 'Access' }).click()
            await page.getByTestId('username').fill('test')
            await page.getByTestId('password').fill('test')
            await page.getByRole('button', { name: 'log in' }).click()
            await expect(page.getByRole('button', { name: 'new blog' })).toBeVisible()
        })


        test('fails with wrong credentials', async ({ page }) => {
            await page.getByRole('button', { name: 'Access' }).click()
            await page.getByTestId('username').fill('cucasona')
            await page.getByTestId('password').fill('12345')
            await page.getByRole('button', { name: 'log in' }).click()
            await expect(page.getByText('invalid username or password')).toBeVisible()
        })
    })
})