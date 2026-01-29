import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { LOGIN, ALL_AUTHORS, ALL_BOOKS } from "../queries";
import { useContext } from "react";
import NotificationContext from "./NotificationContext";

const Login = () => {
  const { notificationDispatch, tokenDispatch } =
    useContext(NotificationContext);
  const navigate = useNavigate();
  const [login, result] = useMutation(LOGIN, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    onError: (error) => {
      console.log(error);
      notificationDispatch({
        type: "SET_MESSAGE",
        payload: error.graphQLErrors[0].message,
      });
    },
  });
  const [username, setUsername] = useState("");
  const [password, setPasword] = useState("");

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      tokenDispatch({ type: "SET_TOKEN", payload: token });
      localStorage.setItem("bookApp-user-token", token);
    }
  }, [result.data, tokenDispatch]);

  const submit = async (event) => {
    event.preventDefault();
    await login({ variables: { username, password } });

    navigate("/books");

    setUsername("");
    setPasword("");
  };

  return (
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
        usernmae:
        <input
          style={{
            display: "flex",
            placeItems: "center",
            justifyContent: "center",
            marginLeft: "0.5em",
            padding: "0.1em",
          }}
          id="born"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        ></input>
      </label>

      <label
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        password:
        <input
          style={{
            display: "flex",
            placeItems: "center",
            justifyContent: "center",
            marginLeft: "0.5em",
            padding: "0.1em",
          }}
          id="born"
          value={password}
          type="password"
          onChange={({ target }) => setPasword(target.value)}
        ></input>
      </label>
      <button style={{ width: "150px" }} type="submit">
        {" "}
        login
      </button>
    </form>
  );
};

export default Login;
