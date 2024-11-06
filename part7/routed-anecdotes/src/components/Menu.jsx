import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import styled from "styled-components";
const Menu = () => {

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

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <StyledLink to="/">
            anecdotes
          </StyledLink>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <StyledLink to="/create">
            create new
          </StyledLink>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <StyledLink to="/about" >
            about
          </StyledLink>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
