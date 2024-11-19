import { useEffect, useRef } from "react";
import { Blog } from "./components/Blog";
import { Notification } from "./components/Notification";
import { LoginForm } from "./components/LoginForm";
import { Togglable } from "./components/Togglable";
import { BlogForm } from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from "./reducers/blogReducer";
import { handleLogout, initializeUser } from "./reducers/userReducer";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(newBlog));
  };

  const addLike = (id) => {
    dispatch(likeBlog(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
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
        <Togglable buttonLabel="log in">
          <LoginForm />
        </Togglable>
      ) : (
        <div>
          <p>
            {user.name} logged-in{" "}
            <button onClick={handleLogoutForm}>Logout</button>
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}

      <div>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLike={() => addLike(blog.id)}
            handleDelete={() => handleDelete(blog.id)}
            currentUser={user}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
