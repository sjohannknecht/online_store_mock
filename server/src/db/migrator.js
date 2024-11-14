const { Umzug, SequelizeStorage } = require("umzug");
const sequelize = require("./db");

const migrator = new Umzug({
  migrations: {
    glob: ["migrations/*.js", { cwd: __dirname }],
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
});

module.exports = migrator;

if (require.main === module) {
  migrator.runAsCLI();
}
