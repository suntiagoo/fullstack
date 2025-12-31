import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import messageReducer from "./reducers/messageReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    blog: blogReducer,
    message: messageReducer,
    users: userReducer,
  },
});

export default store;
