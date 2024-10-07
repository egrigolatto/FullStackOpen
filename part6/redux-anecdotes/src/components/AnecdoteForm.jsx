import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer";
const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnectdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));

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