import Style from './Blog.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseLike, removeBlog } from '../../reducers/blogReducer';
import fetchBlog from '../../services/fetchBlog';

const ListBlog = ({ user }) => {
  const { blog } = useSelector((state) => state);

  const blogSort = blog.toSorted((a, b) => b.likes - a.likes);

  return blogSort.map((blog) => {
    return <Blog key={blog.id} blog={blog} user={user} />;
  });
};

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = (id) => {
    dispatch(increaseLike(id, { ...blog, likes: blog.likes + 1 }));
  };

  const remove = (id) => {
    if (window.confirm(`Remove blog You're NOT gonna need it! by ${user.name}`)) {
      fetchBlog.setToken(user.token);
      dispatch(removeBlog(id));
    }
  };

  const handleComment = async (event) => {
    event.preventDefault();
    fetchBlog.setToken(login.token);
    dispatch(addComment(id, comment));
  };
  return (
    <>
      <div className={Style['container']}>
        <article className={Style['blogContainer']} data-testid="articleContainer">
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 20px', alignItems: 'center' }}>
            <p className={Style['title']}>
              <strong>{blog.title}</strong>
            </p>
            <button className={Style['viewButton']} onClick={toggleVisibility}>
              {visible ? 'hide' : 'view'}
            </button>
          </div>
          <div style={showWhenVisible} className="togglableContent">
            <article className={Style['blog']} data-testid="articleChild">
              {/*<h3><strong >{`${blog.title}`}</strong></h3>*/}
              <p className={Style['paragraph']}>
                Author: <strong>{blog.author}</strong>
              </p>
              <p className={Style['paragraph']}>
                Likes:
                <label>
                  <strong data-tesid="likes">{blog.likes}</strong>
                </label>
                <button className={Style['likeButton']} onClick={() => handleLike(blog.id)}>
                  like
                </button>
              </p>
              <p className={Style['paragraph']}>
                Url:
                <a className={Style['link']} href={blog.url} target="_blank">
                  <strong>{blog.url}</strong>
                </a>
              </p>
              <p className={Style['paragraph']}>
                ID: <strong>{blog.id}</strong>
              </p>
              {(user.id === blog.user?._id || user.id === blog.user || user.id === blog.user?.id) && <button onClick={() => remove(blog.id)}>remove</button>}
              <span>
                <p className={Style['paragraph']}>
                  User:
                  <strong>{blog.user?.username === undefined ? user.username : blog.user?.username}</strong>
                </p>
              </span>
              {
                <div className={Style['commentContainer']}>
                  <h4 className={Style['commentTitle']}>Comments:</h4>
                  <div style={{ padding: '10px' }}>
                    <form onSubmit={handleComment} style={{ display: 'flex', justifyContent: 'left', textAlign: 'center', alignItems: 'center' }}>
                      <label className={Style['labelForm']}>
                        Comment:
                        <input className={Style['inputForm']} id="comment" data-testid="comment" value={comment} onChange={({ target }) => setComment(target.value)} />
                      </label>
                      <button type="submit" style={{ height: '25px' }}>
                        {' '}
                        add comment
                      </button>
                    </form>
                  </div>
                  <ul>
                    {blog.comments.map((comment) => {
                      return (
                        <li className={Style['comment']} key={comment.id || comment._id}>
                          {' '}
                          {comment.body}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              }
            </article>
          </div>
        </article>
      </div>
    </>
  );
};

export default ListBlog;
