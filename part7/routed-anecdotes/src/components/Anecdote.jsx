const Anecdote = ({ anecdote }) => {
  if (!anecdote) {
    return <p>No anecdote with that id</p>;
  }

  return (
    <div>
      <h4>{anecdote.content}</h4>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see {anecdote.info}</p>
    </div>
  );
};

export default Anecdote;