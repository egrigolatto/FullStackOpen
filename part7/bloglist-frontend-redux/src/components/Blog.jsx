import { useDispatch } from "react-redux";
import {
  likeBlog,
  deleteBlog,
  addCommentToBlog,
} from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { z } from "zod";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(blog?.comments || []);
  const [error, setError] = useState("");

  const commentSchema = z.object({
    comment: z.string().min(1, { message: "Comment cannot be empty" }),
  });

  // useEffect para mantener los comentarios actualizados
  useEffect(() => {
    if (blog && blog.comments) {
      setComments(blog.comments);
    }
  }, [blog]);


  const handleLike = () => {
    if (user) {
      dispatch(likeBlog(blog.id));
    } else {
      alert("You must be logged in to like a blog.");
    }
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de que deseas eliminar el blog "${blog.title}"?`
    );
    if (confirmDelete) {
      dispatch(deleteBlog(blog.id));
      navigate("/");
    }
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    // Validar el comentario con Zod
    const result = commentSchema.safeParse({ comment });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    dispatch(addCommentToBlog(blog.id, comment));

    setComments([...comments, { text: comment }]);
    setComment("");
    setError("");
  };

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card shadow" style={{ maxWidth: "600px", width: "100%" }}>
        <div className="card-body">
          <h4 className="card-title">{blog.title}</h4>
          <h6 className="card-subtitle mb-2 text-muted">
            Author: {blog.author}
          </h6>
          <p className="card-text">
            <strong>URL:</strong>{" "}
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </a>
          </p>
          <p className="card-text">
            <strong>Likes:</strong> {blog.likes}{" "}
            <button
              className="btn btn-sm btn-outline-primary ms-2"
              onClick={handleLike}
            >
              Like
            </button>
          </p>
          <p className="card-text">
            <strong>User:</strong> {blog.user ? blog.user.name : "Loading..."}
          </p>

          {user?.username === blog.user?.username && (
            <button
              className="btn btn-sm btn-outline-danger mt-2"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}

          <div className="mt-4">
            <h5>Comments:</h5>
            <ul className="list-group">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <li key={index} className="list-group-item">
                    {comment.text}
                  </li>
                ))
              ) : (
                <li className="list-group-item text-muted">No comments yet.</li>
              )}
            </ul>
          </div>

          {user && (
            <form className="mt-3" onSubmit={handleCommentSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit" className="btn btn-outline-secondary">
                  Add Comment
                </button>
              </div>
            </form>
          )}
          {error && <div className="alert alert-danger mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export { Blog };
