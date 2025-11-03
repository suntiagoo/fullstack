import './App.css'
import { useEffect, useState } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import MessageInformation from './components/MessageInformation'
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
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
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
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.data.token)
      setUser(user)

      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage(exception.response.data.error)
      alert(exception.response.data.error)
    }
    setTimeout(() => { setMessage(null) }, 5000)

  }



  return (
    <>
      <MessageInformation message={message}></MessageInformation>
      {user == null ? <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} onSubmit={headleLogin} ></Login> : <div><p>{user.data.username}</p>
        {blog.map((blog) => { return <Blog blog={blog} user={user}></Blog> })}
      </div>}

    </>
  )
}

export default App
