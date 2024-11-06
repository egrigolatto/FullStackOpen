import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";
import { Form, Button } from "react-bootstrap";

const AnecdoteForm = (props) => {
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetInfo, ...info } = useField("text");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    resetContent();
    resetAuthor();
    resetInfo();
    navigate("/");
  };

  const handleReset = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>content:</Form.Label>
          <Form.Control {...content} />
        </Form.Group>
        <Form.Group>
          <Form.Label> author:</Form.Label>
          <Form.Control {...author} />
        </Form.Group>
        <Form.Group>
          <Form.Label> url for more info:</Form.Label>
          <Form.Control {...info} />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          create
        </Button>{" "}
        <Button variant="secondary" type="button" onClick={handleReset}>
          reset
        </Button>{" "}
      </Form>
    </div>
  );
};

export default AnecdoteForm;
