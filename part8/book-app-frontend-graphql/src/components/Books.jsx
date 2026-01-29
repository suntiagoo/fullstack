import { useQuery, useLazyQuery } from "@apollo/client/react";
import {
  ALL_BOOKS,
  GENRES,
  ALL_BOOK_BY_GENRE,
  RECOMMEND_USER,
} from "../queries";
import { useState, useEffect, useEffectEvent, useContext } from "react";
import NotificationContext from "../components/NotificationContext";

const Books = ({ recommend }) => {
  const allBooks = useQuery(ALL_BOOKS);
  const genres = useQuery(GENRES);
  const recommendUser = useQuery(RECOMMEND_USER);
  const [filterBook, result] = useLazyQuery(ALL_BOOK_BY_GENRE);
  const [bookList, setBookList] = useState(null);
  const [genre, setGenre] = useState("");
  const { favoriteGenre, bookFavoriteList, favoriteGenreDispatch } =
    useContext(NotificationContext);

  const handleGenre = (event, genre) => {
    event.preventDefault();
    setGenre(genre);
    filterBook({
      variables: { genres: genre },
    });
  };

  const selectedBook = useEffectEvent((bookList) => {
    setBookList(bookList);
  });

  useEffect(() => {
    if (recommendUser.data) {
      favoriteGenreDispatch({
        type: "SET_FAVORITE_GENRE",
        payload: recommendUser.data.me?.favoriteGenre,
      });
    }
  }, [recommendUser.data, favoriteGenreDispatch]);

  useEffect(() => {
    if (result.data || allBooks.data) {
      const books =
        genre === "all"
          ? allBooks.data.allbooks
          : result.data?.allBooksAccordingToGenresAndAuthor;

      selectedBook(recommend ? bookFavoriteList : books);
    }
  }, [genre, result, allBooks, bookFavoriteList, recommend]);
  if (
    result.loading ||
    genres.loading ||
    allBooks.loading ||
    recommendUser.loading
  ) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <h2>books</h2>
      {
        <div>
          <p>
            {recommend ? "books in your favorite genre" : "in genre"}{" "}
            <strong>{recommend ? favoriteGenre : genre || null}</strong>
          </p>
        </div>
      }
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>

          {bookList
            ? bookList.map((book) => (
                <tr key={book.id}>
                  {<td>{book.title}</td>}
                  {<td>{book.author.name}</td>}
                  <td>{book.published}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>

      {genres && !recommend
        ? genres.data.__type.enumValues.map((genre) => (
            <button
              key={genre.name}
              onClick={(event) => {
                handleGenre(event, genre.name);
              }}
            >{`${genre.name}`}</button>
          ))
        : null}
      {!recommend && (
        <button
          onClick={() => {
            setGenre("all");
          }}
        >
          all books
        </button>
      )}
    </div>
  );
};

export default Books;
