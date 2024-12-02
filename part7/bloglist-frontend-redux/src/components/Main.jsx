import React from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import { Blogs } from "./Blogs";
import { Users } from "./Users";
import { User } from "./User";
import { Notification } from "./Notification";
import { LoginForm } from "./LoginForm";
import { Register } from "./Register";
import { BlogForm } from "./BlogForm";
import { Blog } from "./Blog"

const Main = ({ blogs, users, user }) => {

  const userMatch = useMatch("/users/:id");
  const userID =
    userMatch && users.length > 0
      ? users.find((user) => user.id === userMatch.params.id)
      : null;

  const blogMatch = useMatch("/blogs/:id");
  const blogID =
    blogMatch && blogs.length > 0
      ? blogs.find((blog) => blog.id === blogMatch.params.id)
      : null;

  return (
    <main className="flex-grow-1 overflow-auto">
      <Notification />
      <Routes>
        <Route path="/" element={<Blogs blogs={blogs} user={user} />} />
        <Route
          path="/blogs/:id"
          element={<Blog user={user} blog={blogID} />}
        />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User user={userID} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/blogs/new" element={<BlogForm />} />
      </Routes>
    </main>
  );
};

export { Main };
