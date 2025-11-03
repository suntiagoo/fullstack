//import loginService from '../services/loginService'
//import blogService from '../services/blogService'

const Login = ({ username, setUsername, password, setPassword, onSubmit }) => {

    return (
        <form onSubmit={onSubmit}>
            <div className="form-box">
                <label className="form-box" >
                    User-name<input className="label-input" id="username" value={username} onChange={({ target }) => setUsername(target.value)} minLength={3} required></input>
                </label>
                <br />
                <label className="form-box">
                    Password<input className="label-input" id="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} minLength={3} required></input>
                </label>

            </div>
            <button type="submit">Login</button>




        </form>
    )

}

export default Login