const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");

const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
