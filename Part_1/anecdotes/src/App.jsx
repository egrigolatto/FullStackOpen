import { useState } from "react";
import PropTypes from "prop-types";


const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    new Array(anecdotes.length).fill(0)
  );

  const selectRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <p>Has {votes[selected]} votes</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={selectRandomAnecdote}>Next Anecdote</button>
    </div>
  );
};

App.propTypes = {
  anecdotes: PropTypes.array,
};

export default App
