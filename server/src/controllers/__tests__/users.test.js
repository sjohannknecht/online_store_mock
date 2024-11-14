const supertest = require("supertest");
const app = require("../../app");
const { getUsers, seedUsers, destroyUsers } = require("../../db/util/users");

const api = supertest(app);

beforeEach(async () => {
  await destroyUsers();
  await seedUsers();
});

describe("getting users", () => {
  test("succeeds with status code 200 when authenticated", async () => {
    const response = await api
      .post("/api/login")
      .send({ username: "test_username", password: "test_password" });
    const user = response.body;
    await api
      .get("/api/users")
      .set({ Authorization: `Bearer ${user.token}` })
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .expect((response) => {
        if (response.body.length !== 1) {
          throw new Error("There should only be one user in the DB");
        }
      });
  });

  test("fails with status code 401 when not authenticated", async () => {
    await api
      .get("/api/users")
      .expect(401)
      .expect("Content-Type", /application\/json/)
      .expect((response) => {
        if (response.body.error !== "token invalid") {
          throw new Error();
        }
      });
  });
});

describe("creating users", () => {
  test("succeeds with a fresh username", async () => {
    const usersAtStart = await getUsers();
    const newUser = {
      username: "test_new_username",
      name: "test_new_name",
      password: "test_password",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await getUsers();
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await getUsers();

    const newUser = {
      username: "test_username",
      name: "test_new_name",
      password: "test_password",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await getUsers();
    expect(result.body.error.includes("username must be unique")).toBe(true);

    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test("fails with proper statuscode and message if username is missing", async () => {
    const usersAtStart = await getUsers();

    const newUser = {
      name: "test_new_name",
      password: "test_password",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await getUsers();

    expect(
      result.body.error.includes(
        "notNull Violation: user.username cannot be null",
      ),
    ).toBe(true);
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test("fails with proper statuscode and message if name is missing", async () => {
    const usersAtStart = await getUsers();

    const newUser = {
      username: "test_new_username",
      password: "test_password",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await getUsers();

    expect(
      result.body.error.includes("notNull Violation: user.name cannot be null"),
    ).toBe(true);
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test("fails with proper statuscode and message if password is missing", async () => {
    const usersAtStart = await getUsers();
    const newUser = {
      username: "test_new_username",
      name: "test_new_name",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(422)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await getUsers();
    expect(result.body.error.includes("no password provided")).toBe(true);

    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test("fails with proper statuscode and message if password is shorter than 3", async () => {
    const usersAtStart = await getUsers();

    const newUser = {
      username: "test_new_username",
      name: "test_new_name",
      password: "ab",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(422)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await getUsers();
    expect(
      result.body.error.includes("password needs to be at least 3 characters"),
    ).toBe(true);

    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });
});
