const Blog = ({ blog, user }) => {
    console.log('component blog', blog)
    console.log(user.data.username)
    return (
        <div >
            <article className="userBlogs" >
                <article className="blog">
                    <h3><strong>{blog.title}</strong></h3>

                    <p key={blog.id}>Author: <strong>{blog.author}</strong></p>
                    <p key={blog.id}>Likes: <strong>{blog.likes}</strong></p>
                    <p key={blog.id}> Url: <a href={blog.url} target="_blank">page</a></p>

                </article>
            </article>
        </div>
    )
}

export default Blog




