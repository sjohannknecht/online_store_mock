const jwt = require("jsonwebtoken");
const router = require("express").Router();
const bcrypt = require("bcrypt");

const { SECRET } = require("../utils/config");
const { User } = require("../db/models");

router.post("/", async (request, response, next) => {
  const { username, password } = request.body;
  try {
    if (typeof password !== "string") {
      return response.status(401).json({
        error: "invalid username or password",
      });
    }

    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: "invalid username or password",
      });
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, SECRET);

    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
