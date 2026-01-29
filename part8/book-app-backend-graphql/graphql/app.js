const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");
const User = require("./models/user");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const { schema } = require("./entity/index");

const server = new ApolloServer({
  schema,
});

const startApolloServer = async () => {
  await server.start();

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;

        if (auth && auth.startsWith("Bearer ")) {
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET,
          );
          const currentUser = await User.findById(decodedToken.id).populate(
            "team",
            { username: 1, favoriteGenre: 1 },
          );

          return { currentUser };
        }
      },
    }),
  );
  //await server.stop();
};

startApolloServer();

module.exports = app;
