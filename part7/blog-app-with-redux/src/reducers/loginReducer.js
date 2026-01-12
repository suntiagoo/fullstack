import { createSlice } from '@reduxjs/toolkit';
import fetchBlog from '../services/fetchBlog';
import fetchLogin from '../services/fetchLogin';

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setLogin(state, action) {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
      if (loggedUserJSON) {
        return JSON.parse(loggedUserJSON);
      }

      return action.payload;
    },
  },
});

const { setLogin } = loginSlice.actions;

export const loggin = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await fetchLogin.login(credentials);
      dispatch(setLogin(user));
      dispatch({
        type: 'message/setMessage',
        payload: ` welcome ${user.name} to blog app `,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      fetchBlog.setToken(user.token);
    } catch (exception) {
      dispatch({ type: 'message/setMessage', payload: `${exception}` });
      alert(` ${exception}`);
    }
  };
};

export default loginSlice.reducer;
