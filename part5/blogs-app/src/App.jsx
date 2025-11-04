import './App.css'
import { useEffect, useState } from 'react'
import MessageInformation from './components/MessageInformation'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import ShowBlog from './components/ShowBlog'
import loginService from './services/loginService'
import blogService from './services/blogService'


function App() {
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blog, setBlog] = useState([])


  useEffect(() => {
    const blogs = async () => {
      const result = await blogService.getAll()
      setBlog(result.data)
    }
    blogs()

  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const headleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.data.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user.username)
      setMessage(`Welcome ${user.data.name} to blogApp `)

    } catch (exception) {
      setMessage(exception.response.data.error)
      alert(exception.response.data.error)
    }
    setTimeout(() => { setMessage(null) }, 5000)

  }

  return (
    <div>
      {message !== null && <MessageInformation message={message}></MessageInformation>}
      {user == null ? <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} onSubmit={headleLogin} ></Login> :
        <><h2>BlogApp</h2><p>{`${user.data.name} Logged in`}</p> <NewBlog user={user} blog={blog} setBlog={setBlog} setMessage={setMessage}></NewBlog>  {blog.map((blog) => { return <ShowBlog key={blog.id} blog={blog} user={user}></ShowBlog> })} </>}
    </div>

  )
}

export default App
