import React from "react";
import { Link } from "react-router-dom";
import { Table, Container } from "react-bootstrap";

const Users = ({ users }) => {
  return (
    <Container className="mt-5">
      <h2 className="mb-4">Users</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`} className="text-decoration-none">
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export { Users };
