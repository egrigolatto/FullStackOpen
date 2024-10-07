import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnectdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));

    dispatch(setNotification(`New anecdote added: ${content}`, 100));
  };
    return (
      <>
        <h2>create new</h2>
        <form onSubmit={addAnectdote}>
          <input name="anecdote" />
          <button type="submit">add</button>
        </form>
      </>
    );
}

export { AnecdoteForm }