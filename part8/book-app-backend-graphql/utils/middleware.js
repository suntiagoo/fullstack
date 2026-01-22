const logger = require("./logger");
const { ApolloServerErrorCode } = require("@apollo/server/errors");
const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error("messageError:", error.message, "nameError:", error.name);

  if (error.extensions.code === ApolloServerErrorCode.INTERNAL_SERVER_ERROR) {
    return { error: "malformatted id", error };
  } else if (error.name === "ValidationError") {
    return { error: error.message, error };
  } else if (error.name === "MongoServerError") {
    return { error: "expected `username` to be unique", error };
  } else if (error.name === "TokenExpiredError") {
    return { error: `${error.message} - the token expired` };
  } else if (error.name === "JsonWebTokenError") {
    return { error: "token invalid" };
  }
  next(error);
};

module.exports = {
  requestLogger,
  errorHandler,
};
