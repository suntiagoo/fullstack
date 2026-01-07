import { useRef } from 'react';
import { useSelector } from 'react-redux';
import ListBlog from '../components/listBlog/ListBlog';
import Togglable from '../components/togglable/Togglable';
import NewBlog from '../components/blogForm/BlogForm';

const PageBlog = () => {
  const blogFormRef = useRef();
  const { login } = useSelector((state) => state);

  const hidenBlogForm = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlog hidenForm={hidenBlogForm} user={login}></NewBlog>
      </Togglable>
      <ListBlog user={login} />
    </div>
  );
};

export default PageBlog;
