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

        <form onSubmit={hadleLogin} >
            <h4>blog App</h4>
            <label className="label-form" >
                User-name:<input className="input-form" id="username" data-testid="username" value={username} onChange={({ target }) => setUsername(target.value)} minLength={3} required></input>
            </label>
            <label className="label-form">
                Password:<input className="input-form" id="password" data-testid="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} minLength={3} required></input>
            </label>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button type="submit">log in</button>
            </div>
        </form>

    )

}

export default Login