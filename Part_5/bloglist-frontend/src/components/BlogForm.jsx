import React, { useState } from "react";

const BlogForm = ({ createBlog, handleError, handleNotification }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();

    if (!title || !author || !url) {
      handleError("Debe completar todos los campos");
      return;
    }
    createBlog({
      title: title,
      author: author,
      url: url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");

    handleNotification(`A new blog ${title} by ${author}`);
    
  };

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
         Title:{" "}
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        Author:{" "}
        <input
          id="author"
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />
        URL:{" "}
        <input
          id="url"
          type="text"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <br />
        <br />
        <button id="create_button" type="submit">Create</button>
      </form>
    </div>
  );
};

export  {BlogForm};
