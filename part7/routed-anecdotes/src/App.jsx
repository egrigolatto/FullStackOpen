import { useState } from "react";
import {
  Routes,
  Route,
  useMatch
} from "react-router-dom";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Anecdote from "./components/Anecdote";
import About from "./components/About";
import Notification from "./components/Notification";
import Header from "./components/Header";
import Main from "./components/Main";
import "./App.css";
import Footer from "./components/Footer";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const match = useMatch("/:id");
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null;

  const [notification, setNotification] = useState(null);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`A new anecdote "${anecdote.content}"`);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div className="container">
      <Header />
      <Main
        notification={notification}
        anecdotes={anecdotes}
        addNew={addNew}
        anecdote={anecdote}
      />
      <Footer />
    </div>
  );
};

export default App;
