import { useState, useEffect } from "react";
const Blog = ({ blog, addLike, handleDelete, currentUser }) => {
  const [show, setShow] = useState(false);
  const [like, setLike] = useState(false);

  useEffect(() => {
    setLike(blog.likes);
  }, [blog.likes]);

  const toggleShow = () => {
    setShow(!show);
  };
  const Likes = async () => {
    if (currentUser) {
      const updatedBlog = { ...blog, likes: like + 1 };
      await addLike(updatedBlog);
      setLike(like + 1);
    }
  };
  const deleteBlog = () => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de que deseas eliminar el blog "${blog.title}"?`
    );
    if (confirmDelete) {
      handleDelete(blog);
    }
  };

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
        {blog.title}{" "}
        {blog.author}{" "}
        <button onClick={toggleShow}>{show ? "hide" : "view"}</button>
      </div>
      {show && (
        <div>
         Author: {blog.author} <br />
         URL: {blog.url} <br />
         Likes:  {like ? like : blog.likes} <button onClick={Likes}>like</button>{" "}
          <br />
         User:  {blog.user.name} <br />
          {currentUser && currentUser.username === blog.user.username && (
            <button onClick={deleteBlog}>delete</button>
          )}
        </div>
      )}
    </div>
  );
};

export { Blog };
