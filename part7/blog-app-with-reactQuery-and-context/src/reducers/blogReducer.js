/*import { createSlice } from "@reduxjs/toolkit";
import fetchBlog from "../services/fetchBlog";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createBlog(state, action) {
      const content = action.payload;
      return [...state, content];
    },
    addLike(state, action) {
      const id = action.payload.id;
      state = state.filter((blog) => blog.id !== id);
      return [...state, action.payload];
    },
    setBlog(state, action) {
      return action.payload;
    },
    deleteBlog(state, action) {
      const id = action.payload;
      state = state.filter((blog) => blog.id !== id);
      return [...state];
    },
  },
});

const { createBlog, addLike, setBlog, deleteBlog } = blogSlice.actions;

export const initializeBlog = () => {
  return async (dispatch) => {
    const blogs = await fetchBlog.getAll();
    dispatch(setBlog(blogs));
  };
};

export const appendBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await fetchBlog.create(content);
      dispatch(createBlog(newBlog));
      dispatch({
        type: "message/setMessage",
        payload: `a new blog you're NOT gonna need ir! by "ahi debe ir el nombre del usuario" ${newBlog.id} added`,
      });
      setTimeout(() => {
        dispatch({ type: "message/setMessage", payload: null });
      }, 5000);
    } catch (exception) {
      dispatch({ type: "message/setMessage", payload: `${exception}` });
      setTimeout(() => {
        dispatch({ type: "message/setMessage", payload: null });
      }, 5000);
      alert(exception.response);
    }
  };
};

export const increaseLike = (id, content) => {
  return async (dispatch) => {
    try {
      const updateBlog = await fetchBlog.update(id, content);
      dispatch(addLike(updateBlog));
    } catch (exception) {
      dispatch({ type: "message/setMessage", payload: `${exception}` });
      setTimeout(() => {
        dispatch({ type: "message/setMessage", payload: null });
      }, 5000);
      alert(exception.response);
    }
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await fetchBlog.remove(id);
      dispatch(deleteBlog(id));
    } catch (exception) {
      dispatch({ type: "message/setMessage", payload: `${exception}` });
      alert(exception);
    }
  };
};

export default blogSlice.reducer;
*/
