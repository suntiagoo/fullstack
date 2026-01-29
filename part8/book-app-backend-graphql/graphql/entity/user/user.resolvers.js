const { GraphQLError } = require("graphql");
//const mongoose = require("mongoose");
//mongoose.set("strictQuery", false);
const User = require("../../models/user");
const bcrypt = require("bcrypt");

module.exports = {
  Query: {
    me: (root, args, { currentUser }) => {
      console.log(currentUser);
      return currentUser;
    },
  },
  Mutation: {
    createUser: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      if (args.username?.length < 3) {
        throw new GraphQLError(
          "Invalid argument value the username must be more long than 3",
          {
            extensions: {
              code: "BAD_USER_INPUT",
              argumentName: "username",
              value: args.username,
            },
          },
        );
      }

      if (args.password?.length <= 8) {
        throw new GraphQLError(
          "Invalid argument value, the password's user must be at least 8 characters long",
          {
            extensions: {
              code: "BAD_USER_INPUT",
              argumentName: "password",
              value: args.password,
            },
          },
        );
      }
      let userExists = await User.findOne({ username: args.username });
      if (userExists) {
        throw new GraphQLError(
          `Invalid argument value, ready exist ${args.username}`,
          {
            extensions: {
              code: "BAD_USER_INPUT",
              argumentName: "username",
              value: args.username,
            },
          },
        );
      }
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(args.password, saltRounds);
      const user = new User({
        username: args.username,
        passwordHash: passwordHash,
        favoriteGenre: args.favoriteGenre,
        team: [],
      });

      const aux = await user.save();
      if (currentUser) {
        currentUser.team = currentUser?.team.concat(aux._id);
        await currentUser.save();
      }

      return aux;
    },
  },
};
