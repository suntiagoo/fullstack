import { gql } from "@apollo/client";

export const RECOMMEND_USER = gql`
  query {
    me {
      favoriteGenre
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allbooks {
      id
      title
      published

      author {
        name
        born
      }
      genres
    }
  }
`;

export const GENRES = gql`
  query {
    __type(name: "Genres") {
      enumValues {
        name
      }
    }
  }
`;

export const ALL_BOOK_BY_GENRE = gql`
  query AllBooksAccordingToGenresAndAuthor($genres: Genres) {
    allBooksAccordingToGenresAndAuthor(genres: $genres) {
      id
      title
      published
      genres
      author {
        name
        born
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      id
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      id
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id
      title
      published
      genres
      author {
        name
        born
      }
    }
  }
`;
