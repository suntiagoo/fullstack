import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  //createHttpLink,
  HttpLink,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { ApolloProvider } from "@apollo/client/react";
import App from "./App.jsx";
import { NotificationContextProvider } from "./components/NotificationContext.jsx";

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem("bookApp-user-token");
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : null,
//     },
//   };
// });

const authLink = new SetContextLink((prevContext) => {
  const token = localStorage.getItem("bookApp-user-token");
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  // defaultOptions: {
  //   query: {
  //     fetchPolicy: "cache-and-network",
  //   },
  // },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <NotificationContextProvider>
        <Router>
          <App />
        </Router>
      </NotificationContextProvider>
    </ApolloProvider>
  </StrictMode>,
);
