const { GraphQLError } = require("graphql");
//const mongoose = require("mongoose");
//mongoose.set("strictQuery", false);
const Book = require("../../models/book");
const Author = require("../../models/author");

module.exports = {
  Query: {
    authorCount: async () => await Author.collection.countDocuments(),
    allAuthors: async (root, arg) => {
      const authors = await Author.find({});
      const mountBookByAuthor = authors.map(async (author) => {
        return {
          name: author.name,
          id: author.id,
          born: author.born,
          bookCount: Book.collection.countDocuments({
            author: author._id,
          }),
        };
      });

      return mountBookByAuthor.sort((a, b) => b.bookCount - a.bookCount);

      /* const countBookByAuthor = authors.map((author) => {
            const totalBook = books.filter(
              (book) => book.author === author.name,
            ).length;
            return {
              name: author.name,
              id: author.id,
              born: author.born,
              bookCount: totalBook,
            };
          });
          return countBookByAuthor.sort((a, b) => b.bookCount - a.bookCount);*/
    },
  },
  Mutation: {
    editAuthor: async (root, args) => {
      if (!args.name) {
        throw new GraphQLError("must have a value for author name value", {
          extensions: {
            code: "BAD_USER_INPUT",
            argumentName: "author",
            value: args.name,
          },
        });
      }
      const author = await Author.findOne({ name: args.name });
      author.born = args.born;
      try {
        author.save();
      } catch (excpetion) {
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
      return author;
    },
  },
};
