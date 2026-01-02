import './App.css';
import { useEffect, useRef, useReducer } from 'react';
import UserContext from './UserContext';
import { useQuery } from '@tanstack/react-query';
import fetchBlog, { getAll } from './services/fetchBlog';
import { login } from './services/fetchLogin';
import { userReducer } from './useReducers/userReducer';
import { notificationReducer } from './useReducers/notificationReducer';
import MessageInformation from './components/MessageInformation';
import Login from './components/Login';
import NewBlog from './components/NewBlog';
import Togglable from './components/Togglable';
import MainPageStructure from './components/MainPageStructure';
import ListBlog from './components/ListBlog';

function App() {
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: 'SET_USER', payload: user });
      fetchBlog.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();
  const [notification, notificationDispatch] = useReducer(notificationReducer, '');
  const [user, userDispatch] = useReducer(userReducer, null);

  const blogs = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
  });

  const handleLogin = async (credentials) => {
    const user = await login(credentials);
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
    userDispatch({ type: 'SET_USER', payload: user });
    fetchBlog.setToken(user.token);
  };

  const hidenBlogForm = () => {
    blogFormRef.current.toggleVisibility();
  };

  setTimeout(() => {
    notificationDispatch({ type: 'RESET' });
  }, 5000);

  const logger = () => (
    <>
      <h3>Welcome to blog App</h3>
      <Togglable buttonLabel="Access">
        <Login login={handleLogin} />
      </Togglable>
    </>
  );

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <NewBlog hidenForm={hidenBlogForm}></NewBlog>
    </Togglable>
  );

  const mainPage = () => (
    <MainPageStructure>
      {/*<MainPageStructure user={user} blogForm={blogForm()}>*/}
      {blogForm()}
      {/*blog.map((blog) => { return <Blog key={blog.id} blog={blog} user={user} sumLike={addLike}></Blog> })*/}
      {<ListBlog blog={blogs} />}
    </MainPageStructure>
  );

  return (
    <UserContext.Provider value={{ user, userDispatch, notification, notificationDispatch }}>
      <div>
        <MessageInformation notification={notification} />
        {user == null ? logger() : mainPage()}
      </div>
    </UserContext.Provider>
  );
}
export default App;
