import Style from '../components/listBlog/Blog.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { increaseLike, removeBlog } from '../reducers/blogReducer';
import fetchBlog from '../services/fetchBlog';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const BlogUnit = () => {
  const { blog, login } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;
  const completeBlog = blog.find((item) => item.id === id);

  const handleLike = (id) => {
    console.log(id);
    dispatch(increaseLike(id, { ...completeBlog, likes: completeBlog.likes + 1 }));
  };

  const remove = (id) => {
    if (window.confirm(`Remove blog You're NOT gonna need it! by ${login.name}`)) {
      fetchBlog.setToken(login.token);
      dispatch(removeBlog(id));
      navigate('/blogs');
    }
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
          <label>
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
          <button onClick={() => remove(completeBlog.id)}>remove</button>
        )}
        <span>
          <p className={Style['paragraph']}>
            User:
            <strong>{completeBlog.user?.username === undefined ? login.username : completeBlog.user?.username}</strong>
          </p>
        </span>
      </article>
    </>
  );
};

export default BlogUnit;
