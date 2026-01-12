import Style from '../components/listBlog/Blog.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { increaseLike, removeBlog, addComment } from '../reducers/blogReducer';
import fetchBlog from '../services/fetchBlog';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useField } from '../hooks';

const BlogUnit = () => {
  const { blog, login } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comment = useField('text');
  const id = useParams().id;
  const completeBlog = blog.find((item) => item.id === id);

  const handleLike = (id) => {
    dispatch(increaseLike(id, { ...completeBlog, likes: completeBlog.likes + 1 }));
  };

  const remove = (id) => {
    if (window.confirm(`Remove blog You're NOT gonna need it! by ${login.name}`)) {
      fetchBlog.setToken(login.token);
      dispatch(removeBlog(id));
      navigate('/blogs');
    }
  };

  const handleComment = async (event) => {
    event.preventDefault();
    fetchBlog.setToken(login.token);
    dispatch(addComment(id, comment.value));
    event.target.value = '';
    comment.onChange(event);
  };

  if (!login || !completeBlog) {
    return null;
  }
  return (
    <>
      <h3>Blog</h3>
      <article className={Style['blog']} data-testid="articleChild">
        {/*<h3><strong >{`${blog.title}`}</strong></h3>*/}
        <p className={Style['paragraph']}>
          Author: <strong>{completeBlog.author}</strong>
        </p>
        <p className={Style['paragraph']}>
          Likes:
          <label style={{ paddingRight: '15px' }}>
            <strong data-tesid="likes">{completeBlog.likes}</strong>
          </label>
          <button className={Style['likeButton']} onClick={() => handleLike(completeBlog.id)}>
            like
          </button>
        </p>
        <p className={Style['paragraph']}>
          Url:
          <a className={Style['link']} href={completeBlog.url} target="_blank">
            <strong>{completeBlog.url}</strong>
          </a>
        </p>
        <p className={Style['paragraph']}>
          ID: <strong>{completeBlog.id}</strong>
        </p>
        {(login.id === completeBlog.user?._id || login.id === completeBlog?.user || login.id === completeBlog.user?.id) && (
          <div className={Style['buttonRemoveContainer']}>
            <button className={Style['removeButton']} onClick={() => remove(completeBlog.id)}>
              remove
            </button>
          </div>
        )}
        <span>
          <p className={Style['paragraph']}>
            User:
            <strong>{completeBlog.user?.username === undefined ? login.username : completeBlog.user?.username}</strong>
          </p>
        </span>
        {
          <div className={Style['commentContainer']}>
            <h4 className={Style['commentTitle']}>Comments:</h4>
            <div style={{ padding: '10px' }}>
              <form onSubmit={handleComment} style={{ display: 'flex', justifyContent: 'left', textAlign: 'center', alignItems: 'center' }}>
                <label className={Style['labelForm']}>
                  Comment:
                  <input className={Style['inputForm']} {...comment} />
                </label>
                <button type="submit" style={{ height: '25px' }}>
                  {' '}
                  add comment
                </button>
              </form>
            </div>
            <ul>
              {completeBlog.comments.map((comment) => {
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
    </>
  );
};

export default BlogUnit;
