import { createSlice } from '@reduxjs/toolkit';
import fetchUser from '../services/fetchUser';

const userSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    getAll(state, action) {
      return action.payload;
    },
  },
});

const { getAll } = userSlice.actions;

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const users = await fetchUser.getAll();
      dispatch(getAll(users));
    } catch (exception) {
      dispatch({ type: 'message/setMessage', payload: `${exception}` });
    }
  };
};

export default userSlice.reducer;
