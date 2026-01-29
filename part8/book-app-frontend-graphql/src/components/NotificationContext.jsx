import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return action.payload;
    case "CLEAN":
      return "";
    default:
      return state;
  }
};

const tokenReducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return action.payload;
    case "CLEAR_TOKEN":
      return action.payload;
  }
};

const genreReducer = (state, action) => {
  switch (action.type) {
    case "SET_FAVORITE_GENRE":
      return action.payload;
  }
};

const bookFavoriteListReducer = (state, action) => {
  switch (action.type) {
    case "BOOKS_FAVORITE":
      return action.payload;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    "",
  );
  const [token, tokenDispatch] = useReducer(tokenReducer, null);
  const [favoriteGenre, favoriteGenreDispatch] = useReducer(genreReducer, "");
  const [bookFavoriteList, bookFavoriteListDispatch] = useReducer(
    bookFavoriteListReducer,
    null,
  );
  return (
    <NotificationContext.Provider
      value={{
        notification,
        notificationDispatch,
        token,
        tokenDispatch,
        favoriteGenre,
        favoriteGenreDispatch,
        bookFavoriteList,
        bookFavoriteListDispatch,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
