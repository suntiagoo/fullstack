import { useContext, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client/react";
import { useLazyQuery, useSubscription } from "@apollo/client/react";
import { ALL_BOOK_BY_GENRE, BOOK_ADDED, ALL_BOOKS } from "./queries";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/form/NewBook";
import Login from "./components/Login";
import Notification from "./components/Notification";
import NotificationContext from "./components/NotificationContext";

const App = () => {
  const client = useApolloClient();
  const { token, tokenDispatch, favoriteGenre, bookFavoriteListDispatch } =
    useContext(NotificationContext);

  const [filterBook, result] = useLazyQuery(ALL_BOOK_BY_GENRE);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("bookApp-user-token");
    if (loggedUserJSON) {
      tokenDispatch({ type: "SET_TOKEN", payload: loggedUserJSON });
    }
  }, [tokenDispatch]);

  useEffect(() => {
    if (result.data) {
      bookFavoriteListDispatch({
        type: "BOOKS_FAVORITE",
        payload: result.data.allBooksAccordingToGenresAndAuthor,
      });
    }
  }, [result, bookFavoriteListDispatch]);

  const updateCacheWith = (bookAdded) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allbooks, bookAdded)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allbooks: dataInStore.allbooks.concat(bookAdded) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log("socket", data);
      const addedBook = data.data.bookAdded;
      alert(`${addedBook.title} added`);
      updateCacheWith(addedBook);
    },
  });

  const handleLogout = () => {
    if (token) {
      tokenDispatch({ type: "CLEAR_TOKEN", payload: null });
      localStorage.clear();
      client.resetStore();
    }
  };

  const handleBookListFavorite = async () => {
    await filterBook({
      variables: { genres: favoriteGenre },
    });
  };

  return (
    <>
      <Notification />
      <nav
        style={{
          display: "flex",
          alignContent: "center",
          justifyItems: "center",
          paddingBottom: "5em",
        }}
      >
        {
          <Link
            style={{
              paddingLeft: "1em",
              paddingRight: "3em",
              textDecoration: "none",
              color: "turquoise",
            }}
            to="authors"
          >
            Authors
          </Link>
        }
        <Link
          style={{
            paddingLeft: "1em",
            paddingRight: "3em",
            textDecoration: "none",
            color: "turquoise",
          }}
          to="books"
        >
          Books
        </Link>
        {token ? (
          <>
            <Link
              style={{
                paddingLeft: "1em",
                paddingRight: "3em",
                textDecoration: "none",
                color: "turquoise",
              }}
              to="form"
            >
              Add Book
            </Link>
            <Link
              style={{
                paddingLeft: "1em",
                paddingRight: "3em",
                textDecoration: "none",
                color: "turquoise",
              }}
              to="/recommend"
              onClick={() => {
                handleBookListFavorite();
              }}
            >
              recommend
            </Link>
          </>
        ) : null}
        {
          <Link
            style={{
              paddingLeft: "1em",
              paddingRight: "3em",
              textDecoration: "none",
              color: "turquoise",
            }}
            to="/"
            onClick={() => handleLogout()}
          >
            {token ? "logout" : "login"}
          </Link>
        }
      </nav>

      <Routes>
        {/*<Route path="/authors" element={token ? <Authors /> : <Navigate replace to="/login" />}/>*/}
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books recommend={false} />} />
        <Route
          path="/form"
          element={<NewBook updateChache={updateCacheWith} />}
        />
        <Route path="/" element={<Login />} />
        <Route path="/recommend" element={<Books recommend={true} />} />
      </Routes>
    </>
  );
};

export default App;
