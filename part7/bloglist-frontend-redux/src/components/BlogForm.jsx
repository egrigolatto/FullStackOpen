import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { Form, Button, Container } from "react-bootstrap";
import { createBlog } from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom";

// esquema de validación con Zod
const blogSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  author: z
    .string()
    .min(1, "Author is required")
    .max(50, "Author cannot exceed 50 characters"),
  url: z.string().url("Invalid URL format"),
});

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState({}); // Para manejar los errores de validación

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNewBlog = async (event) => {
    event.preventDefault();

    const result = blogSchema.safeParse({ title, author, url });

    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    dispatch(
      createBlog({
        title: title,
        author: author,
        url: url,
      })
    );

    setTitle("");
    setAuthor("");
    setUrl("");

    navigate("/");
  };

  return (
    <Container className="mt-5 w-50">
      <h2>Create a New Blog</h2>
      <Form onSubmit={handleNewBlog}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Write title here"
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="Write author here"
            isInvalid={!!errors.author}
          />
          <Form.Control.Feedback type="invalid">
            {errors.author}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formURL">
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="Write URL here"
            isInvalid={!!errors.url}
          />
          <Form.Control.Feedback type="invalid">
            {errors.url}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </Container>
  );
};

export { BlogForm };
