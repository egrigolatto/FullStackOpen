import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    appendAnecdote: (state, action) => {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    vote: (state, action) => {
      const id = action.payload.id; // Obtiene el ID de la anécdota a actualizar
      const anecdoteToChange = state.find((a) => a.id === id);

      if (anecdoteToChange) {
        const changedAnecdote = {
          ...anecdoteToChange,
          votes: anecdoteToChange.votes + 1, // Incrementa los votos
        };

        return state.map(
          (anecdote) => (anecdote.id !== id ? anecdote : changedAnecdote) // Retorna la anécdota actualizada
        );
      }
      return state; // Devuelve el estado sin cambios si no se encuentra la anécdota
    },
  },
});

// Exportar las acciones
export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

// Función para inicializar anécdotas desde el servicio
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

// Función para crear una nueva anécdota
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

// Función para votar por una anécdota
export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    // Obtén el estado actual para encontrar la anécdota
    const state = getState();
    const anecdoteToVote = state.anecdotes.find((a) => a.id === id);

    if (anecdoteToVote) {
      // Crea un objeto actualizado con el nuevo conteo de votos
      const updatedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };

      // Llama a la función de actualización del servicio
      await anecdoteService.update(updatedAnecdote);

      // Despacha la acción de voto para actualizar el estado en Redux
      dispatch(vote({ id })); // Esto actualizará el estado en Redux
    }
  };
};

export default anecdoteSlice.reducer;
