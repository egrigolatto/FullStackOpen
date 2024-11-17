import { useState, useEffect } from "react";

const Blog = ({ blog, addLike, handleDelete, currentUser }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleShow}>{show ? "hide" : "view"}</button>
      </div>
      {show && (
        <div>
          Author: {blog.author} <br />
          URL: {blog.url} <br />
          Likes: {blog.likes}{" "}
          <button onClick={() => addLike(blog)} disabled={!currentUser}>
            like
          </button>
          <br />
          User: {blog.user.name} <br />
          {currentUser && currentUser.username === blog.user.username && (
            <button onClick={() => handleDelete(blog)}>delete</button>
          )}
        </div>
      )}
    </div>
  );
};


export { Blog };
