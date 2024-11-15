import React from "react";
import { useState } from "react";
import { useShowNotification } from "../NotificationContext";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  // const [likes, setLikes] = useState("");

  const showNotification = useShowNotification();

  const handleNewBlog = async (event) => {
    event.preventDefault();

    if (!title || !author || !url) {
      showNotification("complete all fields", "error");
      return;
    }

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
          id="blog-title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder="write title here"
        />
      </div>
      <div>
        Author:
        <input
          id="blog-author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="write author here"
        />
      </div>
      <div>
        URL:
        <input
          id="blog-url"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          placeholder="write url here"
        />
      </div>
      <div></div>
      <button type="submit">Create</button>
    </form>
  );
};

export { BlogForm };
