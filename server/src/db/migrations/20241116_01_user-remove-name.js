module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.removeColumn("users", "name");
  },
  async down({ context: queryInterface }) {
    await queryInterface.addColumn("users", "name");
  },
};
