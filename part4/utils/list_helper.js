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


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}