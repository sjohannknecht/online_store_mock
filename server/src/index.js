const { PORT } = require("./utils/config");
const app = require("./app");
const connectToDatabase = require("./db/connect");
const logger = require("./utils/logger");
const config = require("./utils/config");

logger.info("connecting to", config.DATABASE_URI);

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
