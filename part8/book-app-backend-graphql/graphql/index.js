const app = require("./app");
//const { ApolloServer } = require("@apollo/server");
//const { startStandaloneServer } = require("@apollo/server/standalone");
//const { typeDefs, resolvers } = require("./schema");

const logger = require("../utils/logger");
const config = require("../utils/config");

/*const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: config.PORT },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
  logger.info(`Server ready at ${url}`);
});
*/

try {
  app.listen(process.env.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
  });
} catch (excpetion) {
  console.log(excpetion);
}
