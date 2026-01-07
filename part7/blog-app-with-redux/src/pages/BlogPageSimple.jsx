import { useRef } from 'react';
import ListBlogSimple from '../components/listBlog/ListBlogSimple';
import NewBlog from '../components/blogForm/BlogForm';
import Togglable from '../components/togglable/Togglable';

const BlogPageSimple = () => {
  const blogFormRef = useRef();
  const hidenBlogForm = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlog hidenForm={hidenBlogForm}></NewBlog>
      </Togglable>
      <ListBlogSimple />
    </div>
  );
};

export default BlogPageSimple;
