import { useState } from "react";


const Blog = ({ blog, addLike, handleDelete, currentUser }) => {
  const [mostrar, setMostrar] = useState(false);
  const [like, setLike] = useState(false);

  const toggleMostrar = () => {
    setMostrar(!mostrar);
  };

  const Likes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    addLike(updatedBlog);
    setLike(blog.likes + 1);
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
        <button  onClick={toggleMostrar}>{mostrar ? "hide" : "view"}</button>
      </div>
      {mostrar && (
        <div>
          {blog.author} <br />
          {blog.url} <br />
          {like ? like : blog.likes} <button onClick={Likes}>like</button>{" "}
          <br />
          {blog.user.name} <br />
          {currentUser && currentUser.username === blog.user.username && (
            <button onClick={deleteBlog}>delete</button>
          )}
        </div>
      )}
    </div>
  );
};

export { Blog }