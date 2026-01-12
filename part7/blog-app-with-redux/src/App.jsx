import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlog } from './reducers/blogReducer';
import { getUsers } from './reducers/userReducer';
import MessageInformation from './components/notification/MessageInformation';
import Login from './components/login/Login';
import Nav from './components/nav/Nav';
import NavBootstrap from './components/nav/navBootstrap';

function App() {
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state);
  useEffect(() => {
    dispatch(initializeBlog());
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: 'login/setLogin' });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  setTimeout(() => {
    dispatch({ type: 'message/setMessage', payload: null });
  }, 6000);
  return (
    <div className="container">
      <MessageInformation />

      {login ? <NavBootstrap /> : <Login />}
    </div>
  );
}
export default App;
