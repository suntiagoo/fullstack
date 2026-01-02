import { useState, useContext } from 'react';
import UserContext from '../UserContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import fetchBlog, { update, remove } from '../services/fetchBlog';

const ListBlog = ({ blog }) => {
  const { user, notificationDispatch } = useContext(UserContext);

  if (blog.isLoading) {
    return <div>loading data...</div>;
  }

  const blogSort = blog.data.toSorted((a, b) => b.likes - a.likes);

  return blogSort.map((blog) => {
    return <Blog key={blog.id} blog={blog} user={user} notificationDispatch={notificationDispatch} />;
  });
};

const Blog = ({ blog, user, notificationDispatch }) => {
  const [visible, setVisible] = useState(false);
  const queryClient = useQueryClient();

  const showWhenVisible = { display: visible ? '' : 'none' };

  const updateBlogMutation = useMutation({
    mutationFn: update,
    onSuccess: (modifyBlog) => {
      const blogs = queryClient.getQueriesData(['blogs']);
      const aux = blogs[0][1].filter((blog) => {
        return blog.id !== modifyBlog.id;
      });
      queryClient.setQueriesData(['blogs'], aux.concat(modifyBlog));
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: ` ${user.name} voted the blog` });
    },
    onError: (error) => {
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: { error: error } });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: `the blog was removed` });
    },
    onError: (error) => {
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: { error: error } });
    },
  });

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = (blog) => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
  };

  const handleRemove = (id) => {
    if (window.confirm(`Remove blog You're NOT gonna need it! by ${user.name}`)) {
      fetchBlog.setToken(user.token);
      deleteBlogMutation.mutate(id);
    }
  };
  return (
    <>
      <div>
        <article className="userBlogs" data-testid="articleContainer">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>
              <strong>{blog.title}</strong>
            </p>
            <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
          </div>
          <div style={showWhenVisible} className="togglableContent">
            <article className="blog" data-testid="articleChild">
              {/*<h3><strong >{`${blog.title}`}</strong></h3>*/}
              <p>
                Author: <strong>{blog.author}</strong>
              </p>
              <p>
                Likes:
                <label>
                  <strong data-tesid="likes">{blog.likes}</strong>
                </label>
                <button onClick={() => handleLike(blog)}>like</button>
              </p>
              <p>
                Url:
                <a href={blog.url} target="_blank">
                  {blog.url}
                </a>
              </p>
              <p>
                ID: <strong>{blog.id}</strong>
              </p>
              {(user.id === blog.user?._id || user.id === blog.user || user.id === blog.user?.id) && <button onClick={() => handleRemove(blog.id)}>remove</button>}
              <span>
                <p>
                  User:
                  {blog.user?.username === undefined ? user.data?.username : blog.user?.username}
                </p>
              </span>
            </article>
          </div>
        </article>
      </div>
    </>
  );
};

export default ListBlog;
