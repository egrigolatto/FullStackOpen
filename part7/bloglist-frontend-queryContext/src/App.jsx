import { useState, useEffect, useRef } from "react";
import { Blog } from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { Notification } from "./components/Notification";
import { LoginForm } from "./components/LoginForm";
import { Togglable } from "./components/Togglable";
import { BlogForm } from "./components/BlogForm";
import { useShowNotification } from "./NotificationContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "./userContext";

const App = () => {
  const { user, login, logout } = useUser();

  const handleLogin = async (usuario) => {
    try {
      const user = await loginService.login(usuario);
      login(user);
      showNotification(`Logged in with ${user.name}`, "success");
    } catch (error) {
      console.log(error);
      showNotification("Wrong credentials", "error");
    }
  };

  const handleLogout = () => {
    logout();
  };

  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  const blogs = result.data || [];

  const showNotification = useShowNotification();

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (deletedBlog) => {
      queryClient.setQueryData(["blogs"], (oldBlogs) =>
        oldBlogs.filter((blog) => blog.id !== deletedBlog.id)
      );
      showNotification("Blog deleted successfully", "success");
    },
    onError: (error) => {
      console.error(error);
      showNotification("Failed to delete the blog", "error");
    },
  });

  const handleDelete = (blog) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the blog "${blog.title}"?`
    );
    if (confirmDelete) {
      deleteBlogMutation.mutate(blog);
    }
  };

  const blogFormRef = useRef();

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>blogs service not available due the problems in sever</div>;
  }


  const toggleReff = () => {
    blogFormRef.current.toggleVisibility();
  };

  const addLike = (blog) => {
    updateBlogMutation.mutate({
      ...blog,
      likes: blog.likes + 1,
    });
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
              <BlogForm toggleReff={toggleReff} />
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
