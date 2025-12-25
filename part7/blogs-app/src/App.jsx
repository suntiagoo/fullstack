import './App.css'
import { useEffect, useState, useRef } from 'react'
import MessageInformation from './components/MessageInformation'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Blog from './components/Blog'
import loginService from './services/loginService'
import blogService from './services/blogService'
import Togglable from './components/Togglable'
import MainPageStructure from './components/MainPageStructure'
import { useResource } from './hooks'


function App() {
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  /** utilizando useState hook de react */
  const [blog, setBlog] = useState([])

  /** utilizando hook personalizado, hecho por uno */
  const [blog2, setBlog2] = useResource('/api/blogs')

  const blogFormRef = useRef()

  /*  useEffect(() => {
      const blogs = async () => {
        const result = await blogService.getAll()
        setBlog(result.data)
      }
      blogs()
    }, [blog.length])
  */

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setBlog2.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setBlog2.setToken(user.data.token)
      setUser(user)
      setMessage(`Welcome ${user.data.name} to blogApp`)
    } catch (exception) {
      setMessage(exception.response.data.error)
      alert(exception.response.data.error)
    }
  }

  const handlelogOut = async () => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      console.log(window.localStorage.getItem('loggedBlogappUser'))
      setUser(window.localStorage.removeItem('loggedBlogappUser'))
    } catch (exception) {
      console.log(exception.response)
      setMessage(exception.response.data.error)
      alert(exception.response.data.error)
    }
  }

  const addBlog = (newObject) => {
    try {
      setBlog2.setToken(user.data.token)
      blogFormRef.current.toggleVisibility()
      setBlog2.create(newObject)
      //const result = await blogService.getAll()
      //setBlog(result.data)
      setMessage(`a new blog you're NOT gonna need ir! by ${user.data.name} added`)
    } catch (exception) {
      console.log(exception.response)
      setMessage(exception.response.data.error)
      alert(exception.response.data.error)
    }

  }

  const deleteBlog = async (id) => {
    try {
      if (window.confirm(`Remove blog You're NOT gonna need it! by ${user.data.name}`)) {
        setBlog2.setToken(user.data.token)
        await blogService.remove(id)
        // setBlog(blog.filter((blog) => blog.id !== id))
        setBlog(blog2.filter((blog) => blog.id !== id))
      }
    } catch (exception) {
      console.log(exception.response)
      setMessage(exception.response.data.error)
    }
  }

  const addLike = async (id, modifyObject) => {
    try {
      //const result = await blogService.update(id, modifyObject)
      //const aux = blog.filter(blog => blog.id !== id)
      //setBlog(aux.concat([result.data]))
      await blogService.update(id, modifyObject)
      const aux = await blogService.getAll()
      setBlog(aux.data)
    } catch (exception) {
      console.log(exception.response)
      setMessage(exception.response.data.error)
    }
  }
  setTimeout(() => { setMessage(null) }, 5000)


  const login = () => (<>
    <h3>Welcome to blog App</h3>
    <Togglable buttonLabel='Access' >
      <Login onSubmit={handleLogin}></Login>
    </Togglable>
  </>

  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <NewBlog createBlog={addBlog} ></NewBlog>
    </Togglable>)

  const blogSort = () => {
    //const blogSort = blog.sort((a, b) => b.likes - a.likes)
    console.log(blog2)
    const blogSort = blog2.sort((a, b) => b.likes - a.likes)
    return blogSort.map((blog) => { return <Blog key={blog.id} blog={blog} user={user} sumLike={addLike} removeBlog={deleteBlog}></Blog> })
  }

  const mainPage = () => (
    < MainPageStructure user={user} handleLogOut={handlelogOut} >
      {/*<MainPageStructure user={user} blogForm={blogForm()}>*/}
      {blogForm()}
      {/*blog.map((blog) => { return <Blog key={blog.id} blog={blog} user={user} sumLike={addLike}></Blog> })*/}
      {blogSort()}
    </MainPageStructure>
  )

  return (
    <div>
      {message !== null && <MessageInformation message={message}></MessageInformation>}
      {user == null ? login() : mainPage()}
    </div>
  )
}

export default App
/* {user == null ? <Login onSubmit={handleLogin} ></Login> :
   <><h2>BlogApp</h2><p>{`${user.data.name} Logged in`}</p> {blogForm()}  {blog.map((blog) => { return <Blog key={blog.id} blog={blog} user={user}></Blog> })} </>}*/

/*{blog.map((blog) => { return <Togglable key={blog.id}><Blog key={blog.id} blog={blog} user={user}></Blog></Togglable> })}*/