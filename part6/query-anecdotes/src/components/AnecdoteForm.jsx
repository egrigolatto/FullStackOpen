import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../services/requests";
import {useNotificationDispatch} from "../NotificationContextHooks";

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
    // onSuccess: (newAnecdote) => {
    //   const anecdotes = queryClient.getQueryData("anecdotes");
    //   queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
    // },
    onError: (error) => {
      notificationDispatch({
        type: "SET",
        payload: `Failed to create anecdote: ${error.message}`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);
    },
  });
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    if (content.length < 5) {
      notificationDispatch({
        type: "SET",
        payload: "Too short anecdote, must have length 5 or more",
      });
    } else {
       notificationDispatch({
      type: "SET",
      payload: `New anecdote added: ${content}`,
       });
      newAnecdoteMutation.mutate({ content, votes: 0 });
    }
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" });
    }, 5000);
    
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
