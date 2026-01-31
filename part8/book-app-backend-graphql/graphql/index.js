const startApolloServer = require("./app");
const config = require("../utils/config");

const main = async () => {
  startApolloServer(config.PORT);
};

main();
