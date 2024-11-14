require("dotenv").config({
  path: process.env.NODE_ENV === "test" && "../../.env",
});
module.exports = {
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
  DATABASE_URI:
    process.env.NODE_ENV === "test?"
      ? process.env.TEST_DATABASE_URI
      : process.env.DATABASE_URI,
};
