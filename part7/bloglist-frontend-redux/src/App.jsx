import { useEffect, useRef } from "react";
import { Blog } from "./components/Blog";
import blogService from "./services/blogs";
import { Notification } from "./components/Notification";
import { LoginForm } from "./components/LoginForm";
import { Togglable } from "./components/Togglable";
import { BlogForm } from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from "./reducers/blogReducer";
import { handleLogout, initializeUser } from "./reducers/userReducer";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  const blogFormRef = useRef();

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

  const handleLogoutForm = () => {
    dispatch(handleLogout());
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <Notification />

      <h1 style={{ color: "green" }}>Blogs</h1>

      {user === null ? (
        <>
          <Togglable buttonLabel="log in">
            <LoginForm />
          </Togglable>
          <br />
        </>
      ) : (
        <>
          <div>
            {user.name} logged-in <button onClick={handleLogoutForm}>Logout</button>
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
