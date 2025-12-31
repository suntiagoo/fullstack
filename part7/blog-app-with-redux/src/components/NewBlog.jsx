import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchBlog from "../services/fetchBlog";
import { appendBlog } from "../reducers/blogReducer";
//import blogService from "../services/blogService"

const NewBlog = ({ hidenForm, user }) => {
  const dispatch = useDispatch();

  const handleNewBlog = (event) => {
    event.preventDefault();
    fetchBlog.setToken(user.token);

    const value = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0,
    };
    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";

    hidenForm();

    dispatch(appendBlog(value));
  };

  return (
    <>
      <form onSubmit={handleNewBlog}>
        <label className="label-form">
          Title:
          <input
            name="title"
            className="input-form"
            id="title"
            data-testid="title"
            minLength={3}
            placeholder="e.g. design patterns"
          ></input>
        </label>

        <label className="label-form">
          Author:
          <input
            className="input-form"
            name="author"
            id="author"
            data-testid="author"
            placeholder="Alfred Muller"
          ></input>
        </label>

        <label className="label-form">
          Url:
          <input
            className="input-form"
            name="url"
            id="url"
            data-testid="url"
            minLength={5}
            placeholder="www.blog.com"
          ></input>
        </label>

        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </>
  );
};

export default NewBlog;
