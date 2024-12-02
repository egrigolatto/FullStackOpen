import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../reducers/usersReducer";
import { z } from "zod"; // Importa Zod
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const userSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(20, "Username cannot exceed 20 characters"),
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name cannot exceed 50 characters"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

const Register = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    const result = userSchema.safeParse({ username, name, password });

    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    dispatch(createUser({ username, name, password }));
    navigate("/login")
  };

  return (
    <Container className="mt-5 w-50">
      <h2>Register New User</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            placeholder="Enter username"
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
            placeholder="Enter name"
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Enter password"
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export { Register };
