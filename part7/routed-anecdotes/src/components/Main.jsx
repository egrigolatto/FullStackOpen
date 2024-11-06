import {
  Routes,
  Route,
} from "react-router-dom";
import AnecdoteForm from "./AnecdoteForm";
import AnecdoteList from "./AnecdoteList";
import Anecdote from "./Anecdote";
import About from "./About";
import Notification from "./Notification";

function Main({notification, anecdotes, addNew, anecdote}) {
  return (
    <main>
      <Notification message={notification} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<AnecdoteForm addNew={addNew} />} />
      </Routes>
    </main>
  );
}

export default Main;
