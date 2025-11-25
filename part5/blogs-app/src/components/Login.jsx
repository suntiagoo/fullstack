//import loginService from '../services/loginService'
//import blogService from '../services/blogService'
import { useState } from "react"

const Login = ({ onSubmit }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const hadleLogin = (event) => {
        event.preventDefault()
        onSubmit(username, password)
        setUsername('')
        setPassword('')
    }

    return (
        <div className="wrapper">

            <form onSubmit={hadleLogin}>
                <h4>Welcome to blog App</h4>
                <label className="label-form" >
                    User-name:<input className="input-form" id="username" value={username} onChange={({ target }) => setUsername(target.value)} minLength={3} required></input>
                </label>

                <label className="label-form">
                    Password:<input className="input-form" id="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} minLength={3} required></input>
                </label>

                <button type="submit">Login</button>
            </form>

        </div>

    )

}

export default Login