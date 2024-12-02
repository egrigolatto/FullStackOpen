import React from "react";
import { Link } from "react-router-dom";

const User = ({ user }) => {

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{user.name}</h2>
      <h3>Added Blogs</h3>
      {user.blogs.length > 0 ? (
        <ul className="list-group">
          {user.blogs.map((blog) => (
            <Link
              key={blog.id}
              className="list-group-item list-group-item-action"
              to={`/blogs/${blog.id}`}
            >
              {blog.title}
            </Link>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No blogs added by this user.</p>
      )}
    </div>
  );
};

export { User };
