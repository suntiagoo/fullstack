const path = require("path");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const typesArray = loadFilesSync(path.join(__dirname, "./**/*.graphql"));
const mergedTypeDefs = mergeTypeDefs(typesArray);

const resolversArray = loadFilesSync(
  path.join(__dirname, "./**/*.resolvers.*"),
);
const mergedResolvers = mergeResolvers(resolversArray);

const schema = makeExecutableSchema({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
});

module.exports = {
  schema,
};
