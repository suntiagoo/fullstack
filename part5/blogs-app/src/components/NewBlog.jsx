import { useState } from "react"
//import blogService from "../services/blogService"

const NewBlog = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: '',
        likes: 0
    })

    const headleNewBlog = (event) => {
        event.preventDefault()
        createBlog(newBlog)
        setNewBlog({
            title: '',
            author: '',
            url: '',
            likes: 0
        })
        //blogService.setToken(user.data.token)
        //const result = await blogService.create(newBlog)
        //setBlog(blog.concat([result.data]))
    }

    return (
        <>
            <div className="wrapper">
                <form onSubmit={headleNewBlog}>

                    <label className="label-form" >
                        Title: <input className="input-form" id="title" value={newBlog.title} onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })} minLength={3} ></input>
                    </label>

                    <label className="label-form">
                        Author: <input className="input-form" id="author" type="text" value={newBlog.author} onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}  ></input>
                    </label>

                    <label className="label-form">
                        Url: < input className="input-form" id="url" type="text" value={newBlog.url} onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })} minLength={5} ></input>
                    </label>

                    <div>
                        <button type="submit">Create</button>
                    </div>
                </form >

            </div>

        </>


    )

}

export default NewBlog