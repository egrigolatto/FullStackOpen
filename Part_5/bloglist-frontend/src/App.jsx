import { useState, useEffect, useRef } from "react";
import { Blog } from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login";
import { Notificacion } from './components/Notificacion';
import { LoginForm } from './components/LoginForm';
import { BlogForm } from './components/BlogForm';
import {Togglable} from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMesage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  // para cerrar sesion desde la consola
  // window.localStorage.removeItem('loggedBlogappUser')
  // window.localStorage.clear()

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({ username, password });

      blogService.setToken(user.token);

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });
  };

  const addLike = (updatedBlog) => {
    blogService.update(updatedBlog).then((bloglike) => {
      console.log("like");
    });
  };

  const handleDelete = async (deleteBlog) => {
    try {
      await blogService.remove(deleteBlog)
      const updatedBlogs = blogs.filter((blog) => blog.id !== deleteBlog.id);
      setBlogs(updatedBlogs);
    } catch (error) {
      console.log(error);
    }

    
   
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    return;
  };

  const handleError = (errorMessage) => {
    setErrorMessage(errorMessage);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handleNotification = (notificationMessage) => {
    setNotificationMessage(notificationMessage);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  // Ordenar blogs por likes de mayor a menor
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);


  return (
    <div>
      <Notificacion message={notificationMessage} errorMensaje={errorMesage} />

      <h1 style={{ color: "green" }}>Blogs</h1>

      {user === null ? (
        <>
          <Togglable buttonLabel="log in">
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </Togglable>
          <br />
        </>
      ) : (
        <>
          <p style={{ display: "inline-block" }}>{user.name} logged in</p>
          <input
            style={{ display: "inline-block" }}
            type="button"
            value="logout"
            onClick={handleLogout}
          />

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
              handleError={handleError}
              handleNotification={handleNotification}
            />
          </Togglable>
          <br />
        </>
      )}

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
  );
}


export default App