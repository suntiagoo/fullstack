import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogReducer';
import messageReducer from './reducers/messageReducer';
import loginReducer from './reducers/loginReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    blog: blogReducer,
    message: messageReducer,
    login: loginReducer,
    user: userReducer,
  },
});

export default store;
