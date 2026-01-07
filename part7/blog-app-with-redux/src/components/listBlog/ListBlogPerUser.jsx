import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ListBlogPerUser = () => {
  const { blog } = useSelector((state) => state);
  const id = useParams().id;
  const blogs = blog.filter((item) => item.user.id === id || item.user._id === id);
  return (
    <>
      <h4> &emsp;added blogs</h4>
      <ul>
        {blogs.map((blog) => {
          return <Blog key={blog.id} blog={blog} />;
        })}
      </ul>
    </>
  );
};

const Blog = ({ blog }) => {
  return <li>{blog.title}</li>;
};

export default ListBlogPerUser;
