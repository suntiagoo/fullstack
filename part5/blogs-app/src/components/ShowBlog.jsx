const Blog = ({ blog, user }) => {
    return (
        <>
            <article className="userBlogs" >
                <span>{user.data.username}</span>
                <article className="blog">
                    <h3 ><strong>{blog.title}</strong></h3>
                    <p >Author: <strong>{blog.author}</strong></p>
                    <p >Likes: <strong>{blog.likes}</strong></p>
                    <p > Url: <a href={blog.url} target="_blank">page</a></p>
                </article>
            </article>

        </>

    )
}

export default Blog




