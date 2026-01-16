//import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./form/NewBook";

const App = () => {
  //const [page, setPage] = useState("authors");

  return (
    <>
      <nav
        style={{
          display: "flex",
          alignContent: "center",
          justifyItems: "center",
          paddingBottom: "5em",
        }}
      >
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
      </nav>

      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="form" element={<NewBook />} />
      </Routes>
    </>
  );
};

export default App;
