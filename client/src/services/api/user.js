import { fetchWrapper } from "./util/fetchWrapper";

async function getUser(id) {
  return fetchWrapper.get(`http://localhost:3001/api/users/${id}`);
}

async function getUsers() {
  return fetchWrapper.get("http://localhost:3001/api/users");
}

async function createUser(username, password) {
  return fetchWrapper.post("http://localhost:3001/api/users", {
    username,
    password,
  });
}

export { getUser, getUsers, createUser };
