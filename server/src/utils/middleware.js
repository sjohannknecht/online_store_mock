const logger = require("./logger");
const { User } = require("../db/models");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" });
  } else if (error.name === "SequelizeUniqueConstraintError") {
    return response.status(400).json({
      error:
        error.errors && Array.isArray(error.errors) && error.errors[0].message,
    });
  } else if (error.name === "SequelizeValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  } else if (error.message.includes("no password provided")) {
    return response.status(422).json({ error: "no password provided" });
  } else if (
    error.message.includes("password needs to be at least 3 characters")
  ) {
    return response
      .status(422)
      .json({ error: "password needs to be at least 3 characters" });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }
  next();
};

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, config.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }
    request.user = await User.findByPk(decodedToken.id);
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
