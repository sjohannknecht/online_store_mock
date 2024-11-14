const logger = require("../utils/logger");
const migrator = require("./migrator");
const sequelize = require("./db");

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await migrator.up();
    logger.info("connected to the database");
  } catch (err) {
    logger.error("failed to connect to the database", err.message);
    return process.exit(1);
  }

  return null;
};
module.exports = connectToDatabase;
