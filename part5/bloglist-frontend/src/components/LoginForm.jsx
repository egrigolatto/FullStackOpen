import React, { useState } from "react";

const LoginForm = ({login}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    login({
      username: username,
      password : password
    })
    setUsername("");
    setPassword("");
  };
  return (
    <form onSubmit={handleLogin}>
      <h3>Log in to application</h3>
      <div>
        username{" "}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password{" "}
        <input
          style={{ marginTop: "5px" }}
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <br />
      <button type="submit">login</button>
    </form>
  );
};

export { LoginForm };
