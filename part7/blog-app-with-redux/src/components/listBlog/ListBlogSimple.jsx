import Style from './Blog.module.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ListBlogSimple = () => {
  const { blog } = useSelector((state) => state);

  const blogSort = blog.toSorted((a, b) => b.likes - a.likes);

  return (
    <>
      {blogSort.map((blog) => {
        return <Blog key={blog.id} blog={blog} />;
      })}
    </>
  );
};

const Blog = ({ blog }) => {
  return (
    <>
      <div className={Style['container']}>
        <article className={Style['blogContainer']} data-testid="articleContainer">
          <div style={{ display: 'flex', justifyContent: 'center', padding: '0px 20px', alignItems: 'center' }}>
            <p className={Style['title']}>
              <strong>
                <Link style={{ color: 'white' }} to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </strong>
            </p>
          </div>
        </article>
      </div>
    </>
  );
};

export default ListBlogSimple;
