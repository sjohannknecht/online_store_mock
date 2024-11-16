import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { createUser } from "../../services/api/user";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();

  const arePasswordsMatching = password === repeatedPassword;

  async function handleSignUp() {
    try {
      const user = await createUser(username, password);
      navigate(`/user/${user.id}`);
    } catch (err) {
      setErrorMessage(err);
    }
  }
  return (
    <>
      <h1>Sign up </h1>
      <form id="signup-form">
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
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <label htmlFor="password">Repeat Password:</label>
        <input
          type="password"
          id="password-reapeated-input"
          name="password-repeated"
          onChange={(e) => setRepeatedPassword(e.target.value)}
        ></input>
        {arePasswordsMatching && <span>Password is valid</span>}
        <button type="button" onClick={handleSignUp}>
          Register
        </button>
      </form>
      <div className="Login__error-message">{errorMessage}</div>
    </>
  );
}

export default SignUp;
