const supertest = require("supertest");
const app = require("../../app");
const { seedUsers, destroyUsers } = require("../../db/util/users");

const api = supertest(app);

beforeEach(async () => {
  await destroyUsers();
  await seedUsers();
});

describe("logging in", () => {
  test("is successfull and returns token if existing username and correct password are provided", async () => {
    const response = await api
      .post("/api/login")
      .send({ username: "test_username", password: "test_password" })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body.username).toBe("test_username");
    expect(response.body).toHaveProperty("token");
  });

  test("fails if no password is provided", async () => {
    const response = await api
      .post("/api/login")
      .send({ username: "test_username" })
      .expect(401)
      .expect("Content-Type", /application\/json/);
    expect(response.body.error).toBe("invalid username or password");
    expect(response.body).not.toHaveProperty("token");
  });

  test("fails if password is wrong", async () => {
    const response = await api
      .post("/api/login")
      .send({ username: "test_username", password: "wrong_password" })
      .expect(401)
      .expect("Content-Type", /application\/json/);
    expect(response.body.error).toBe("invalid username or password");
    expect(response.body).not.toHaveProperty("token");
  });

  test("fails if username does not exist in database", async () => {
    const response = await api
      .post("/api/login")
      .send({ username: "not_existing_user", password: "test_password" })
      .expect(401)
      .expect("Content-Type", /application\/json/);
    expect(response.body.error).toBe("invalid username or password");
    expect(response.body).not.toHaveProperty("token");
  });
});
