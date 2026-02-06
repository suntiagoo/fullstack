import type { Blog } from "../types";

const DiaryList = ({ blogs }: Blog) => {
  return (
    <ul>
      {blogs.map((blog) => {
        return (
          <div key={blog.id}>
            <b>{blog.date}</b>

            <p>{blog.weather}</p>
            <p>{blog.visibility}</p>
            <p>{blog.comment && blog.comment}</p>
          </div>
        );
      })}
    </ul>
  );
};

export default DiaryList;
