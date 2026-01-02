import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import userContext from '../UserContext';
import fetchBlog, { create } from '../services/fetchBlog';

const NewBlog = ({ hidenForm }) => {
  const { user, notificationDispatch } = useContext(userContext);

  const queryClient = useQueryClient();

  const newBlogMutation = useMutation({
    mutationFn: create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog));
    },
    onError: (error) => {
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: { error: error } });
    },
  });

  const handleNewBlog = async (event) => {
    try {
      event.preventDefault();
      fetchBlog.setToken(user.token);

      const value = {
        title: event.target.title.value,
        author: event.target.author.value,
        url: event.target.url.value,
        likes: 0,
      };

      event.target.title.value = '';
      event.target.author.value = '';
      event.target.url.value = '';
      newBlogMutation.mutate(value);
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: `${user.name} addd a new blog` });
      hidenForm();
    } catch (exception) {
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: exception });
    }
  };

  return (
    <>
      <form onSubmit={handleNewBlog}>
        <label className="label-form">
          Title:
          <input name="title" className="input-form" id="title" data-testid="title" minLength={3} placeholder="e.g. design patterns"></input>
        </label>

        <label className="label-form">
          Author:
          <input className="input-form" name="author" id="author" data-testid="author" placeholder="Alfred Muller"></input>
        </label>

        <label className="label-form">
          Url:
          <input className="input-form" name="url" id="url" data-testid="url" minLength={5} placeholder="www.blog.com"></input>
        </label>

        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </>
  );
};

export default NewBlog;
