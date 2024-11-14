const { Sequelize } = require("sequelize");

module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable(
      "users",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password_hash: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      { underscored: true },
    );
  },
  async down({ context: queryInterface }) {
    await queryInterface.dropTable("users");
  },
};
