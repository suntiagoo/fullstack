import "./App.css";
import { useEffect, useState, useRef } from "react";
import MessageInformation from "./components/MessageInformation";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import loginService from "./services/loginService";
import Togglable from "./components/Togglable";
import MainPageStructure from "./components/MainPageStructure";
import { useDispatch } from "react-redux";
import { initializeBlog } from "./reducers/blogReducer";
import fetchBlog from "./services/fetchBlog";
import ListBlog from "./components/ListBlog";

function App() {
  /** ^^^^^ use useEffect and useState HOOKS ^^^^^^^^^^*/
  //const [message, setMessage] = useState(null);
  //const [blog, setBlog] = useState([]);
  const [user, setUser] = useState(null);

  /*useEffect(() => {
    const blogs = async () => {
      const result = await blogService.getAll();
      setBlog(result.data);
    };
    blogs();
  }, [blog.length]);
*/

  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlog());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      fetchBlog.setToken(user.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      fetchBlog.setToken(user.data.token);
      setUser(user);
      dispatch({
        type: "message/setMessage",
        payload: `Welcome ${user.data.name} to blogApp`,
      });
    } catch (exception) {
      dispatch({
        type: "message/setMessage",
        payload: exception.response.data.error,
      });
      alert(exception.response.data.error);
    }
  };

  const handlelogOut = async () => {
    try {
      window.localStorage.removeItem("loggedBlogappUser");
      console.log(window.localStorage.getItem("loggedBlogappUser"));
      setUser(window.localStorage.removeItem("loggedBlogappUser"));
    } catch (exception) {
      console.log(exception.response);
      dispatch({
        type: "message/setMessage",
        payload: exception.response.data.error,
      });
      alert(exception.response.data.error);
    }
  };

  const hidenBlogForm = () => {
    blogFormRef.current.toggleVisibility();
  };

  setTimeout(() => {
    dispatch({ type: "message/setMessage", payload: null });
  }, 5000);

  const login = () => (
    <>
      <h3>Welcome to blog App</h3>
      <Togglable buttonLabel="Access">
        <Login onSubmit={handleLogin}></Login>
      </Togglable>
    </>
  );

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <NewBlog hidenForm={hidenBlogForm} user={user}></NewBlog>
    </Togglable>
  );

  const mainPage = () => (
    <MainPageStructure user={user} handleLogOut={handlelogOut}>
      {/*<MainPageStructure user={user} blogForm={blogForm()}>*/}
      {blogForm()}
      {/*blog.map((blog) => { return <Blog key={blog.id} blog={blog} user={user} sumLike={addLike}></Blog> })*/}
      <ListBlog user={user} />
    </MainPageStructure>
  );

  return (
    <div>
      <MessageInformation />
      {user == null ? login() : mainPage()}
    </div>
  );
}
export default App;
