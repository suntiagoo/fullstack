const dummy = (blogs) => {
    if (Array.isArray(blogs)) {
        return 1
    }
}

const isLikeInBlog = (blogs) => {
    const even = (element) => !('likes' in element);
    return blogs.some(even)
}

const filterArrayWithoutPropietyLikes = (blogs) => {
    return blogs.filter(blog => ('likes' in blog))
}

const totalLikes = (blogs) => {
    if (!Array.isArray(blogs)) {
        return 'check if the value that you get is e array'
    } else {
        if (blogs.length === 0) {
            return 0
        } else
            return blogs.filter(blog => ('likes' in blog)).reduce((acc, blog) => acc + blog.likes, 0)
    }

}


module.exports = {
    dummy,
    totalLikes
}