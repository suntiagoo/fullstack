const login = async (page, username, password) => {
    await page.getByRole('button', { name: 'Access' }).click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'log in' }).click()

}
const logOut = async (page) => {
    await page.getByRole('button', { name: 'logout' }).click()
}
const createBlog = async (page, title, author, url, user) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill(author)
    await page.getByTestId('url').fill(url)
    await page.getByRole('button', { name: 'create' }).click()
    const viewButton = page.getByTestId('articleContainer').filter({ hasText: `User: ${user}` }).and(page.getByTestId('articleContainer').filter({ hasText: title }))
    await viewButton.getByRole('button', { name: 'view' }).click()

}

export { login, createBlog, logOut }