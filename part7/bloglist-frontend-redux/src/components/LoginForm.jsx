import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { handleLogin } from "../reducers/userReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLoginForm = (event) => {
    event.preventDefault();
    dispatch(
      handleLogin({
        username: username,
        password: password,
      })
    );
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleLoginForm}>
      <h3>Log in to application</h3>
      <div>
        username{" "}
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password{" "}
        <input
          id="password"
          style={{ marginTop: "5px" }}
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <br />
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func,
};

export { LoginForm };
