import { useState } from "react";
import { login } from "../../services/api/login";
import { useNavigate, useOutletContext } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useOutletContext();

  const navigate = useNavigate();

  async function handleLogin() {
    const user = await login(username, password);
    console.log(user);
    console.log(setUser);
    setUser(user);
    navigate("/user");
  }
  return (
    <>
      <h1>Login </h1>
      <form id="login-form">
        <label htmlFor="username">Benutzername:</label>
        <input
          type="text"
          id="username-input"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label htmlFor="password">Passwort:</label>
        <input
          type="password"
          id="password-input"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="button" onClick={handleLogin}>
          Anmelden
        </button>
      </form>
    </>
  );
}

export default Login;
