import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
   display: inline-block;
   margin: 10px 0 20px 0;
   color: #343a40;
   text-decoration: none;
   padding: 5px 15px;
   background-color: #b2babb;
   border-radius: 4px;
   transition: background-color 0.3s ease;

   &:hover {
     background-color: #e9ecef;
   }
 `;

const Blogs = ({ blogs, user }) => {
  const dispatch = useDispatch();
  // const blogs = useSelector((state) => state.blogs);
  // const user = useSelector((state) => state.user);

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div className="container">
      <h1>Blog List</h1>
      {user && <StyledLink to="/blogs/new">New Blog</StyledLink>}
      {sortedBlogs.map((blog) => (
        <div className="card mb-3" key={blog.id}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="card-title mb-0">{blog.title}</h4>
              <Link to={`/blogs/${blog.id}`} className="btn btn-primary btn-sm">
                View
              </Link>
            </div>
            <h6 className="card-subtitle text-muted mb-2">By {blog.author}</h6>
            <p className="card-text">Likes: {blog.likes}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export { Blogs };
