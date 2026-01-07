import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlog } from './reducers/blogReducer';
import { getUsers } from './reducers/userReducer';
import MessageInformation from './components/notification/MessageInformation';
import Login from './components/login/Login';
import Nav from './components/nav/Nav';

function App() {
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state);

  useEffect(() => {
    dispatch(initializeBlog());
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: 'login/setUser' });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  setTimeout(() => {
    dispatch({ type: 'message/setMessage', payload: null });
  }, 5000);

  return (
    <div>
      <MessageInformation />

      {login == null ? <Login /> : <Nav />}
    </div>
  );
}
export default App;
