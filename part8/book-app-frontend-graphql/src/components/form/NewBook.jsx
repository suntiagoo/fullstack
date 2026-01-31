import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import {
  ADD_BOOK,
  ALL_AUTHORS,
  ALL_BOOKS,
  ALL_BOOK_BY_GENRE,
} from "../../queries";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";
import Style from "../form/form.module.css";

const NewBook = ({ updateCache }) => {
  const { notificationDispatch } = useContext(NotificationContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState(null);
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [createBook] = useMutation(
    ADD_BOOK,
    {
      refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    },
    {
      onError: (error) => {
        notificationDispatch({
          type: "SET_MESSAGE",
          payload: error.graphQLErrors[0].message,
        });
      },
      update: (cache, response) => {
        // cache.updateQuery({ query: ALL_BOOKS }, ({ allbooks }) => {
        //   console.log("response", response);
        //   return {
        //     allbooks: allbooks.concat(response.data.addBook),
        //   };
        // });
        updateCache(response.data.createBook);
      },
    },
  );

  const submit = async (event) => {
    event.preventDefault();
    createBook({ variables: { title, author, published, genres } });
    console.log("add book...");

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div style={{ display: "flex" }}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid #42b2e5",
        }}
        onSubmit={submit}
      >
        <div className={Style["inputForm"]}>
          title
          <input
            className={Style["labelForm"]}
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className={Style["inputForm"]}>
          author
          <input
            className={Style["labelForm"]}
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className={Style["inputForm"]}>
          published
          <input
            className={Style["labelForm"]}
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div className={Style["inputForm"]}>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div className={Style["inputForm"]}>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
