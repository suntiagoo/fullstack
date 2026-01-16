import { useQuery } from "@apollo/client/react";
import { ALL_AUTHORS, EDIT_AUTHOR, ALL_BOOKS } from "../queries";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client/react";
import Select from "react-select";

const Authors = () => {
  const authors = useQuery(ALL_AUTHORS);
  //const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });

  const [selectedOption, setSelectedOption] = useState(null);

  const opcion = authors.data
    ? authors.data.allAuthors.map((author) => {
        return { value: author.name, label: author.name };
      })
    : null;

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log("error");
    }
  });

  const submit = (event) => {
    event.preventDefault();
    editAuthor({ variables: { name, born } });
    //setName("");
    setBorn("");
  };

  if (authors.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          paddingTop: "4em",
          flexDirection: "column",
        }}
      >
        <h3>update born</h3>
        <div
          styles={{
            display: "flex",
            height: "auto",
            flexDirection: "colum",
            padding: "4em",
          }}
        >
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={opcion}
          />
        </div>
        <form
          onSubmit={submit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            border: "1px solid #42b2e5",
            width: "350px",
            height: "100px",
            alignItems: "center",
            marginTop: "20px",
            transition: { marginTop: "0.3s" },
          }}
        >
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            born:{" "}
            <input
              style={{
                display: "flex",
                placeItems: "center",
                justifyContent: "center",
                marginLeft: "0.5em",
                padding: "0.1em",
              }}
              id="born"
              value={born}
              onChange={({ target }) => setBorn(Number(target.value))}
            ></input>
          </label>
          <button style={{ width: "150px" }} type="submit">
            {" "}
            aupdate author
          </button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
