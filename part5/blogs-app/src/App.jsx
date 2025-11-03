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

  const headleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.data.token)
      console.log('usuario', user.data.username)
      setUser(user)

      setUsername('')
      setPassword('')
      setMessage(` ESTE ES EL USUARIO: ${user.data.username}`)
    } catch (exception) {
      console.log(exception.response.data.error)
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
