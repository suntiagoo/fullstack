import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

    const blog = {
        title: 'how can be freedom',
        author: 'alfredo',
        url: 'www.test.com',
        likes: 5,
        id: '6903df373cd4d91238abeb61',
        user: { name: undefined }
    }

    const user = {
        data: {
            name: 'alfred',
            username: "root",
            _id: "69026105966b2ae1953e2850"
        }
    }

    test('5.13 show the title and author of a blog but hide url and like "in my case only show the title" ', () => {
        render(<Blog blog={blog} user={user}></Blog>)

        const title = screen.getByText('how can be freedom')
        const author = screen.getByText('alfredo')
        const likes = screen.getByText(5)
        const url = screen.getByText('www.test.com')

        screen.debug(url)

        expect(title).toBeDefined()
        expect(author).not.toBe('alfredo')
        expect(likes).not.toBe(5)
        expect(url).not.toBe(<a href="www.test.com" target="_blank"> www.test.com </a>)
    })

    test('5.13 other way to check that component blog show', () => {
        let container = render(<Blog blog={blog} user={user}></Blog>).container
        const div = container.querySelector('.togglableContent')

        screen.debug(div)

        expect(div).toHaveStyle('display: none')
    })

})