const { GraphQLError } = require("graphql");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Book = require("../../models/book");
const Author = require("../../models/author");

module.exports = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    allbooks: async () => {
      return (
        await Book.find({}).populate("author", { name: 1, born: 1, _id: 0 })
      ).map((book) => {
        return {
          title: book.title,
          published: book.published,
          genres: book.genres,
          author: book.author.name,
          born: book.author.born,
        };
      });
    },
    allBooksWIthArg: async (root, args) => {
      const books = (
        await Book.find({}).populate({
          path: "author",
          select: "name born -_id",
        })
      )
        .filter((book) => {
          return book.author.name === args.author;
        })
        .map((book) => {
          return {
            title: book.title,
            published: book.published,
            genres: book.genres,
            author: book.author?.name,
            born: book.author?.born,
          };
        });
      if (!args.author) {
        (
          await Book.find({}).populate("author", { name: 1, born: 1, _id: 0 })
        ).map((book) => {
          return {
            title: book.title,
            published: book.published,
            genres: book.genres,
            author: book.author?.name,
            born: book.author?.born,
          };
        });
      }
      return books;
    },
    allBooksAccordingToGenresAndAuthor: async (root, args) => {
      const books = await Book.find({}).populate("author", {
        name: 1,
        born: 1,
        _id: 0,
      });

      const bookGenre = (book) => {
        if (
          args.author === book.author.name ||
          book.genres.includes(args.genres)
        ) {
          return book;
        }
      };
      return args.author || args.genres
        ? books.filter(bookGenre).map((book) => {
            return {
              title: book.title,
              published: book.published,
              genres: book.genres,
              author: book.author?.name,
              born: book.author?.born,
            };
          })
        : books;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      if (args.title.length < 5) {
        throw new GraphQLError(
          "Invalid argument value the title must be more long than 5",
          {
            extensions: {
              code: "BAD_USER_INPUT",
              argumentName: "title",
              value: args.title,
            },
          },
        );
      }

      if (args.author.length <= 3) {
        throw new GraphQLError(
          "Invalid argument value, the author's name must be at least 3 characters long",
          {
            extensions: {
              code: "BAD_USER_INPUT",
              argumentName: "author",
              value: args.author,
            },
          },
        );
      }

      let authorExists = await Author.findOne({ name: args.author });
      if (!authorExists) {
        const authorNew = new Author({
          name: args.author,
          born: null,
        });
        authorExists = await authorNew.save();
      }
      const book = new Book({
        title: args.title,
        published: args.published,
        author: authorExists._id,
        genres: args.genres,
      });

      try {
        return await book.save();
      } catch (excpetion) {
        throw new GraphQLError(excpetion.name, {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
          },
        });
      }
    },
  },
  Book: {
    author: (root) => {
      return {
        name: root.author,
        born: root.born,
      };
    },
  },
};
