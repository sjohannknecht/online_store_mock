const Sequelize = require("sequelize");

const { DATABASE_URI } = require("../utils/config");

const sequelize = new Sequelize(DATABASE_URI, { logging: false });

module.exports = sequelize;
