import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #343a40;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
`;

const StyledTable = styled(Table)`
  margin-top: 15px;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #e9ecef;
  }
`;

const StyledLink = styled(Link)`
  color: #007bff;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease, transform 0.2s ease;

  &:hover {
    color: #0056b3;
    text-decoration: underline;
    transform: scale(1.05);
  }
`;

const AnecdoteList = ({ anecdotes }) => (
  <Container>
    <Title>Anecdotes</Title>
    <StyledTable striped bordered hover>
      <tbody>
        {anecdotes.map((anecdote) => (
          <TableRow key={anecdote.id}>
            <td>
              <StyledLink to={`/${anecdote.id}`}>{anecdote.content}</StyledLink>
            </td>
          </TableRow>
        ))}
      </tbody>
    </StyledTable>
  </Container>
);

export default AnecdoteList;
