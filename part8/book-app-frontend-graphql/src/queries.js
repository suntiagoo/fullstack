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
      name
      born
      id
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allbooks {
      title
      published
      genres
      id
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
      name
      born
      id
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
      title
      published
      id
      genres
      author {
        name
        born
      }
    }
  }
`;
