const config = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["dotenv/config"],
  globalTeardown: "<rootDir>/src/tests/teardown.js",
};

module.exports = config;
