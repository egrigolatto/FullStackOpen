import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import styled from "styled-components";
import { handleLogout } from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const StyledNav = styled(Nav)`
  display: flex;
  justify-content: flex-end; /* Alinea los enlaces a la derecha */
  width: 100%;
`;

const StyledLink = styled(Link)`
  color: white;
  font-weight: bold;
  text-decoration: none;
  padding: 10px;
  font-size: 1.1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #f8c542;
  }
`;

const NavBar = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutBlog = () => {
    dispatch(handleLogout());
    navigate("/");
  };

  return (
    <Navbar
      className="px-4 py-2"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Navbar.Brand as={Link} to="/">
        BlogApp
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <StyledNav>
          <StyledLink to="/">Blogs</StyledLink>
          <StyledLink  to="/users">
            Users
          </StyledLink>
          {user === null ? (
            <>
              <StyledLink className="btn btn-outline-success mx-2" to="/login">
                Login
              </StyledLink>
              {""}
              <StyledLink
                className="btn btn-outline-success"
                to="/users/register"
              >
                Register
              </StyledLink>
            </>
          ) : (
            <>
              <div className="d-flex align-items-center  text-white mx-4 my-auto">
                <span
                  className="bg-success rounded-circle me-2"
                  style={{ width: "10px", height: "10px" }}
                ></span>
                <span>{user.name} logged-in</span>
              </div>
              <Button onClick={handleLogoutBlog} variant="outline-light">
                Logout
              </Button>
            </>
          )}
        </StyledNav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export { NavBar };
