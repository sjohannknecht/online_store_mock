import { fetchWrapper } from "./util/fetchWrapper";

async function login(username, password) {
  return fetchWrapper.post("http://localhost:3001/api/login", {
    username,
    password,
  });
}

export { login };
