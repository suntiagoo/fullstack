import Style from './BlogForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import fetchBlog from '../../services/fetchBlog';
import { appendBlog } from '../../reducers/blogReducer';

const NewBlog = ({ hidenForm }) => {
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state);

  const handleNewBlog = (event) => {
    event.preventDefault();
    fetchBlog.setToken(login.token);

    const value = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0,
    };
    event.target.title.value = '';
    event.target.author.value = '';
    event.target.url.value = '';

    hidenForm();

    dispatch(appendBlog(value));
  };

  return (
    <>
      <div>
        <form onSubmit={handleNewBlog}>
          <label className={Style['labelForm']}>
            Title:
            <input name="title" className={Style['inputForm']} id="title" data-testid="title" minLength={3} placeholder="e.g. design patterns"></input>
          </label>

          <label className={Style['labelForm']}>
            Author:
            <input className={Style['inputForm']} name="author" id="author" data-testid="author" placeholder="Alfred Muller"></input>
          </label>

          <label className={Style['labelForm']}>
            Url:
            <input className={Style['inputForm']} name="url" id="url" data-testid="url" minLength={5} placeholder="www.blog.com"></input>
          </label>

          <div className={Style['containerButton']}>
            <button className={Style['buttonForm']} type="submit">
              create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewBlog;
