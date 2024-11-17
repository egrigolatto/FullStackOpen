import { useState } from "react";
import { useShowNotification } from "../NotificationContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

const BlogForm = ({ toggleReff }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  // const [likes, setLikes] = useState("");

  const showNotification = useShowNotification();
  const queryClient = useQueryClient();

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    // onSuccess: (newBlog) => {
    //   const blogs = queryClient.getQueryData("blogs");
    //   queryClient.setQueryData("blogs", blogs.concat(newBlog));
    // },
    onError: (error) => {
      showNotification(`Failed to create anecdote: ${error.message}`, "error");
    },
  });

  const handleNewBlog = async (event) => {
    event.preventDefault();

    if (!title || !author || !url) {
      showNotification("complete all fields", "error");
      return;
    }

    newBlogMutation.mutate({ title, author, url });

    showNotification(`A new blog ${title} by ${author}`, "success");

    setTitle("");
    setAuthor("");
    setUrl("");

    toggleReff();
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
