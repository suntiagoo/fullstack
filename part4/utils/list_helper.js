const _ = require('lodash');

const dummy = (blogs) => {
    if (Array.isArray(blogs)) {
        return 1
    }
}

const isArrayn = (blogs) => {
    return (Array.isArray(blogs))
}

const isLikeInBlog = (blogs) => {
    const even = (element) => !('likes' in element);
    return blogs.some(even)
}

const filterArrayWithoutPropietyLikes = (blogs) => {
    return blogs.filter(blog => ('likes' in blog))
}

const totalLikes = (blogs) => {
    if (Array.isArray(blogs)) {
        if (blogs.length === 0) {
            return 0;
        } else {
            return Number(blogs.filter(blog => ('likes' in blog)).reduce((acc, blog) => acc + blog.likes, 0));
        }
    } else {
        return null;

    }
}

const favoriteBlog = (blogs) => {
    if (!Array.isArray(blogs)) {
        return null
    } else
        if (blogs.length === 0)
            return 0
        else
            return Number(blogs.filter(blog => ('likes' in blog)).sort((a, b) => a.likes - b.likes).pop().likes)

}

const mostBlogs = (blogs) => {
    if (!Array.isArray(blogs)) {
        return null
    } else
        if (blogs.length === 0)
            return 0
        else {
            const blogWitoutAhuthor = blogs.filter(blog => ('author' in blog))
            if (blogWitoutAhuthor.length === 0) {
                return 'the blogs does not have author'
            }
            const amountBlogByAuthor = _.countBy(blogWitoutAhuthor, 'author')
            const formatTheValue = _.maxBy(Object.keys(amountBlogByAuthor).map((value, key) => { return { author: value, blogs: amountBlogByAuthor[value] } }), 'blogs')
            return formatTheValue
        }
}

const mostLikes = (blogs) => {

    if (!Array.isArray(blogs)) {
        return null
    } else
        if (blogs.length === 0)
            return 0
        else {
            const blogWitoutAhuthor = blogs.filter(blog => ('author' in blog))
            if (blogWitoutAhuthor.length === 0) {
                return 'the blogs does not have author'
            }
            const grupByAuthor = _.groupBy(blogWitoutAhuthor, 'author')
            const formatTheValue = _.maxBy(Object.keys(grupByAuthor).map((value, key) => { return { author: value, likes: Number(_.sumBy(grupByAuthor[value], 'likes')) } }), 'likes')
            return formatTheValue
        }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}