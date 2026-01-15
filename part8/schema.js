const { v1: uuid } = require("uuid");
let { authors, books } = require("./data");

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
  bookCount: Int
  }


  type Mutation{
  addBook(
  title: String!
  published: Int!
  author: String!
  genres: [String!]!): Book
  editAuthor(
  name: String!
  born: Int!
  bookCount: Int): Author
  } 

  type Query {
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author!]!
    allbooks: [Book!]!
    allBooksWIthArg(author: String!):[Book]
    allBooksAccordingToGenresAndAuthor(genres: Genres, author: String):[Book!]!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => books.length,
    allAuthors: (root, arg) => {
      const countBoogByAuthor = authors.map((author) => {
        const totalBook = books.filter(
          (book) => book.author === author.name
        ).length;
        return {
          name: author.name,
          id: author.id,
          born: author.born,
          bookCount: totalBook,
        };
      });
      return countBoogByAuthor.sort((a, b) => b.bookCount - a.bookCount);

      /*const counts = new Map();
      books.forEach((book) => {
        if (counts.has(book.author)) {
          counts.set(book.author, counts.get(book.author) + 1);
        } else counts.set(book.author, 1);
      });

      const authorWithNumberOfBook = [];
      for (const count of counts) {
        const author = books.find((book) => book.author === count[0]);
        authorWithNumberOfBook.push({
          name: author.author,
          bookCount: count[1],
        });
      }
      console.log(authorWithNumberOfBook);
      return authorWithNumberOfBook;
      */
    },
    allbooks: () => books,
    allBooksWIthArg: (root, arg) => {
      if (!arg.author) {
        return books;
      }
      return books.filter((book) => book.author === arg.author);
    },
    allBooksAccordingToGenresAndAuthor: (root, arg) => {
      const bookGenre2 = (book) => {
        if (arg.author === book.author || book.genres.includes(arg.genres)) {
          return book;
        }
      };
      return arg.author || arg.genres ? books.filter(bookGenre2) : books;
    },
  },

  /*Book: {
    author: (root) => {
      return {
        name: root.name,
        born: root.born,
        id: root.id,
      };
    },
  },*/
  Mutation: {
    addBook: (root, arg) => {
      if (!books.find((book) => book.author === arg.author)) {
        const author = {
          name: arg.author,
          born: null,
          id: uuid(),
          bookCount: 1,
        };
        authors = [...authors, author];
        //authors = authors.concat(author);
      }
      // const author = authors.find(author=> author.name === arg.author)
      //const totalBook = books.filter(book=> book.author === arg.author).length
      //updateAuthor = {...author, bookCount: totalBook}
      //authors.map(author=> author.name === arg.author? updateAuthor:author)
      const book = { ...arg, id: uuid() };
      books = [...books, book];
      return book;
    },
    editAuthor: (root, arg) => {
      const author = authors.find((author) => author.name === arg.name);
      if (!author) {
        return null;
      }
      const editAuthor = { ...author, born: arg.born };
      authors = authors.map((author) =>
        author.name === arg.name ? editAuthor : author
      );
      return editAuthor;
    },
  },
};

module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers,
};
