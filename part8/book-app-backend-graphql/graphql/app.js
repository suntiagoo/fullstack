const logger = require("../utils/logger");
const { createServer } = require("http");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} = require("@apollo/server/plugin/landingPage/default");
const { ApolloServer } = require("@apollo/server");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/use/ws");
const { expressMiddleware } = require("@as-integrations/express5");
const User = require("./models/user");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const { schema } = require("./entity/index");

const startApolloServer = async (port) => {
  const app = express();
  const httpServer = createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({
        embed: true,
        endpointIsEditable: true,
        footer: false,
      }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/graphql",
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

  httpServer.listen(port, () =>
    logger.info(`Server is now running on http://localhost:${port}`),
  );
  //await server.stop();
};

module.exports = startApolloServer;
