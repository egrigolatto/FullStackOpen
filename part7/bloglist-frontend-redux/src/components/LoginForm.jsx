import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { handleLogin } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

// esquema de validación con Zod
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginForm = (event) => {
    event.preventDefault();

    const result = loginSchema.safeParse({ username, password });

    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const user = dispatch(handleLogin({ username, password }));

    if (user) {
      setUsername("");
      setPassword("");
      navigate("/");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center " >
      <form
        onSubmit={handleLoginForm}
        className="p-4 border rounded shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-4">Log in to application</h3>

        {errors.general && (
          <div className="alert alert-danger">{errors.general}</div>
        )}

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        <button
          id="login-button"
          type="submit"
          className="btn btn-primary w-100"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export { LoginForm };
