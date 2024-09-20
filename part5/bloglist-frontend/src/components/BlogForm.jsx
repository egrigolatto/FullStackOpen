import React from "react";
import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  // const [likes, setLikes] = useState("");

  const handleNewBlog = async (event) => {
    event.preventDefault();

    createBlog({
      title: title,
      author: author,
      url: url,
      // ...(likes && { likes: Number(likes) }),
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleNewBlog}>
      <div>
        Title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div></div>
      <button type="submit">Create</button>
    </form>
  );
};

export { BlogForm };
