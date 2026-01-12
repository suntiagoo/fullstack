import Style from '../login/Login.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loggin } from '../../reducers/loginReducer';
import { useNavigate } from 'react-router-dom';
import Togglable from '../togglable/Togglable';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const hadleLogin = (event) => {
    event.preventDefault();
    dispatch(loggin({ username, password }));
    setUsername('');
    setPassword('');
    navigate('/');
  };

  return (
    <div className={Style['containerForm']}>
      {/* <Navigate replace to="/login" />*/}
      <h3>Welcome to blog App</h3>
      <Togglable buttonLabel="Access">
        <form onSubmit={hadleLogin}>
          <h4 className={Style['titleForm']}> blog App</h4>
          <label className={Style['labelForm']}>
            User-name:
            <input
              className={Style['inputForm']}
              id="username"
              data-testid="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              minLength={3}
              required
            ></input>
          </label>
          <label className={Style['labelForm']}>
            Password:
            <input
              className={Style['inputForm']}
              id="password"
              data-testid="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              minLength={3}
              required
            ></input>
          </label>
          <div className={Style['buttonBox']}>
            <button className={Style['buttonForm']} type="submit">
              log in
            </button>
          </div>
        </form>
      </Togglable>
    </div>
  );
};

export default Login;
