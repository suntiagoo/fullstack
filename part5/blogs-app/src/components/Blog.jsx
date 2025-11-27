import { useState } from 'react'

const Blog = ({ blog, user, sumLike }) => {


    const [visible, setVisible] = useState(false)


    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const addLike = (id) => {
        sumLike(id, { ...blog, likes: blog.likes + 1 })
    }

    return (
        <>
            <div >
                <article className="userBlogs">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}> <p ><strong >{blog.title}</strong></p> <button onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button></div>
                    <div style={showWhenVisible}>
                        <article className="blog">
                            <h3 ><strong>{blog.title}</strong></h3>
                            <p >Author: <strong>{blog.author}</strong></p>
                            <p >Likes: <strong>{blog.likes}</strong> <button onClick={() => addLike(blog.id)}>like</button></p>
                            <p > Url: <a href={blog.url} target="_blank">page</a></p>
                            <p >ID: <strong>{blog.id}</strong></p>
                            <span> <p>User: {blog.user.name === undefined ? user.data.name : blog.user.name}</p> </span>
                        </article>
                    </div>
                </article>
            </div>
        </>
    )
}

// onClick={(blog) => { addLike(blog.id) }}

/*const Blog = ({ blog, user }) => {
    //console.log('el usuario es:', user.data.name)
    //console.log('el usuario es:', blog.user.name)
    return (
        <div  >
            <article className="userBlogs"  >
                <p style={{ display: 'inline' }} ><strong >{blog.title}</strong></p> <ShowBlog key={blog.id} buttonLabel='View' >
                    <article className="blog">
                        <h3 ><strong>{blog.title}</strong></h3>
                        <p >Author: <strong>{blog.author}</strong></p>
                        <p >Likes: <strong>{blog.likes}</strong> <button onClick={() => { }}>like</button></p>
                        <p > Url: <a href={blog.url} target="_blank">page</a></p>
                        <span> <p>User: {blog.user.name === undefined ? user.data.name : blog.user.name}</p>  </span>
                    </article>
                </ShowBlog>
            </article>
        </div >
    )
}*/

/*const ShowBlog = ({ blog, user }) => {

    return (

        <>{blog.map((blog) => {
            return (
                <div key={blog.id}>
                    <article className="userBlogs" >
                        <span>{blog.user.name === undefined ? user.data.name : blog.user.name} <button onClick={() => { }}> hidden</button> </span>
                        <article className="blog" >
                            <h3 ><strong>{blog.title}</strong></h3>
                            <p >Author: <strong>{blog.author}</strong></p>
                            <p >Likes: <strong>{blog.likes}</strong> <button onClick={() => { }}>like</button></p>
                            <p > Url: <a href={blog.url} target="_blank">page</a></p>
                        </article>
                    </article>
                </div >

            )
        })
        }</>


    )
}*/
export default Blog




