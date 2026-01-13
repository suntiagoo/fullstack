const { authors, books } = require("./data");

const typeDefs = `#graphql
  enum Genres {
  refactoring
  agile
  patterns
  design
  classic
  crime
  revolution
  }

  type Book{
  title: String!
  published: Int!
  author: String!
  id: ID!
  genres: [String!]!
  }

  type Author{
  name: String!
  id: ID!
  born: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allbooks: [Book!]!
    allBooksWIthArg(author: String!):[Book]
    allBooksAccordingToGenres(genres: Genres, author: String):[Book!]!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allbooks: () => books,
    allBooksWIthArg: (root, arg) => {
      if (!arg.author) {
        return books;
      }
      books.filter((book) => book.author === arg.author);
    },
    allBooksAccordingToGenres: (root, arg) => {
      const bookGenre2 = (book) => {
        if (arg.author === book.author || book.genres.includes(arg.genres)) {
          return book;
        }
      };
      return arg.author || arg.genres ? books.filter(bookGenre2) : books;
    },
  },
};

module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers,
};
