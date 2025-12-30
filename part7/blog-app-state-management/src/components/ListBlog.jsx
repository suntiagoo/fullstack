import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseLike, removeBlog } from "../reducers/blogReducer";
import fetchBlog from "../services/fetchBlog";

const ListBlog = ({ user, removeBlog }) => {
  const { blog } = useSelector((state) => state);
  const blogSort = blog.toSorted((a, b) => b.likes - a.likes);

  return blogSort.map((blog) => {
    return <Blog key={blog.id} blog={blog} user={user} />;
  });
};

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = (id) => {
    dispatch(increaseLike(id, { ...blog, likes: blog.likes + 1 }));
  };

  const remove = (id) => {
    if (
      window.confirm(
        `Remove blog You're NOT gonna need it! by ${user.data.name}`,
      )
    ) {
      fetchBlog.setToken(user.data.token);
      dispatch(removeBlog(id));
    }
  };
  return (
    <>
      <div>
        <article className="userBlogs" data-testid="articleContainer">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>
              <strong>{blog.title}</strong>
            </p>
            <button onClick={toggleVisibility}>
              {visible ? "hide" : "view"}
            </button>
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
                <button onClick={() => handleLike(blog.id)}>like</button>
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
              {(user.data.id === blog.user?._id ||
                user.data.id === blog.user ||
                user.data.id === blog.user?.id) && (
                <button onClick={() => remove(blog.id)}>remove</button>
              )}
              <span>
                <p>
                  User:
                  {blog.user?.username === undefined
                    ? user.data?.username
                    : blog.user?.username}
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
