const router = require("express").Router();
const bcrypt = require("bcrypt");
const middleware = require("../utils/middleware");
const { User } = require("../db/models");

router.get("/", middleware.userExtractor, async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.get("/:id", middleware.userExtractor, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.post("/", async (req, res, next) => {
  const { username, password } = req.body;
  // TODO: validate that username is not null
  const saltRounds = 10;
  try {
    if (typeof password !== "string") {
      throw new Error("no password provided");
    }
    if (password.length < 3) {
      throw new Error("password needs to be at least 3 characters");
    }
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      username,
      passwordHash,
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
