import { useState, useEffect, useRef } from "react";
import { Blog } from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { Notification } from "./components/Notification";
import { LoginForm } from "./components/LoginForm";
import { Togglable } from "./components/Togglable";
import { BlogForm } from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMesage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const handleLogin = async (usuario) => {
    try {
      const user = await loginService.login(usuario);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      console.log(exception);
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(returnedBlog));
    } catch (error) {
      console.log(error);
    }
  };

  const addLike = async (updatedBlog) => {
    try {
      const bloglike = await blogService.update(updatedBlog);
    } catch (error) {
      console.error("Error updating the blog:", error);
    }
  };

  const handleDelete = async (deleteBlog) => {
    try {
      await blogService.remove(deleteBlog);
      const updatedBlogs = blogs.filter((blog) => blog.id !== deleteBlog.id);
      setBlogs(updatedBlogs);
    } catch (error) {
      console.log(error);
    }
  };


  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <Notification message={notificationMessage} errorMensaje={errorMesage} />

      <h1 style={{ color: "green" }}>Blogs</h1>

      {user === null ? (
        <>
          <Togglable buttonLabel="log in">
            <LoginForm login={handleLogin} />
          </Togglable>
          <br />
        </>
      ) : (
        <>
          <div>
            {user.name} logged-in <button onClick={handleLogout}>Logout</button>
            <br />
            <br />
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <BlogForm createBlog={addBlog} />
            </Togglable>
            <br />
          </div>
        </>
      )}

      <div>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            handleDelete={handleDelete}
            currentUser={user}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
