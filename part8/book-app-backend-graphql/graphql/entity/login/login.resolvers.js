const { GraphQLError } = require("graphql");
//const mongoose = require("mongoose");
//mongoose.set("strictQuery", false);
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  Mutation: {
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      const isPasswordCorrect =
        user === null
          ? false
          : await bcrypt.compare(args.password, user.passwordHash);

      if (!(user && isPasswordCorrect)) {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};
