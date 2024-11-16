import { useState } from "react";
import { login } from "../../services/api/login";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const { setUser } = useOutletContext();

  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const user = await login(username, password);
      setUser(user);
      navigate("/users");
    } catch (err) {
      setErrorMessage(err);
    }
  }
  return (
    <>
      <h1>Login </h1>
      <form id="login-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username-input"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password-input"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <div className="Login__error-message">{errorMessage}</div>
      <Link to="/signup">Not signed up yet? Click here</Link>
    </>
  );
}

export default Login;
