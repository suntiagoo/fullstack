import "./App.css";
import { useEffect, useRef } from "react";
import MessageInformation from "./components/MessageInformation";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import Togglable from "./components/Togglable";
import MainPageStructure from "./components/MainPageStructure";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlog } from "./reducers/blogReducer";

import ListBlog from "./components/ListBlog";

function App() {
  const blogFormRef = useRef();

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);

  useEffect(() => {
    dispatch(initializeBlog());
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: "users/setUser" });
  }, [dispatch]);

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
        <Login />
      </Togglable>
    </>
  );

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <NewBlog hidenForm={hidenBlogForm} user={users}></NewBlog>
    </Togglable>
  );

  const mainPage = () => (
    <MainPageStructure user={users}>
      {/*<MainPageStructure user={user} blogForm={blogForm()}>*/}
      {blogForm()}
      {/*blog.map((blog) => { return <Blog key={blog.id} blog={blog} user={user} sumLike={addLike}></Blog> })*/}
      <ListBlog user={users} />
    </MainPageStructure>
  );

  return (
    <div>
      <MessageInformation />
      {users == null ? login() : mainPage()}
    </div>
  );
}
export default App;
