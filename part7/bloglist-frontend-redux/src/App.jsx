import { useState, useEffect, useRef } from "react";
import { Blog } from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { Notification } from "./components/Notification";
import { LoginForm } from "./components/LoginForm";
import { Togglable } from "./components/Togglable";
import { BlogForm } from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from "./reducers/blogReducer";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

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
      dispatch(setNotification(`logged in with ${user.name} `, "success", 5));
    } catch (error) {
      console.log(error);
      dispatch(setNotification("Wrong credentials", "error", 5));
    }
  };

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.create(newBlog);
      dispatch(createBlog(returnedBlog));
      dispatch(
        setNotification(
          `A new blog ${newBlog.title} by ${newBlog.author}`,
          "success",
          5
        )
      );
    } catch (error) {
      console.log(error);
      dispatch(setNotification(error, "error", 5));
    }
  };

  const addLike = async (updatedBlog) => {
    try {
      dispatch(likeBlog(updatedBlog.id));
    } catch (error) {
      console.error("Error updating the blog:", error);
      dispatch(setNotification("Error updating the blog:" + error, "error", 5));
    }
  };

  const handleDelete = async (blog) => {
    try {
      dispatch(deleteBlog(blog.id));
      dispatch(setNotification("Blog Delete", "success", 5));
    } catch (error) {
      console.log(error);
      dispatch(setNotification("Error deleting the blog:" + error, "error", 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <Notification />

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
