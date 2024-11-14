const sequelize = require("../db");
const bcrypt = require("bcrypt");
const { User } = require("../../db/models");

const getUsers = async () => {
  const users = await User.findAll();
  return users.map((u) => u.toJSON());
};

const seedUsers = async () => {
  const passwordHash = await bcrypt.hash("test_password", 2);
  await sequelize.getQueryInterface().bulkInsert("users", [
    {
      username: "test_username",
      name: "test_name",
      created_at: new Date(),
      updated_at: new Date(),
      password_hash: passwordHash,
    },
  ]);
};

const destroyUsers = async () => {
  await User.destroy({
    truncate: true,
  });
};

module.exports = { getUsers, destroyUsers, seedUsers };
