import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    appendBlog: (state, action) => {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    like: (state, action) => {
      const id = action.payload.id; // Obtiene el ID de la anécdota a actualizar
      const blogToChange = state.find((b) => b.id === id);

      if (blogToChange) {
        const changedBlog = {
          ...blogToChange,
          likes: blogToChange.likes + 1, // Incrementa los likes
        };

        return state.map(
          (blog) => (blog.id !== id ? blog : changedBlog) // Retorna la anécdota actualizada
        );
      }
      return state; // Devuelve el estado sin cambios si no se encuentra la anécdota
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((b) => b.id !== id);
    },
  },
});

// Exportar las acciones
export const { like, appendBlog, setBlogs, removeBlog } = blogSlice.actions;

// Función para inicializar blogs desde el servicio
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

// Función para crear una nueva anécdota
export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

// Función para votar por una anécdota
export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    // Obtén el estado actual para encontrar la anécdota
    const state = getState();
    const blogToLike = state.blogs.find((b) => b.id === id);

    if (blogToLike) {
      // Crea un objeto actualizado con el nuevo conteo de likes
      const updatedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1,
      };

      // Llama a la función de actualización del servicio
      await blogService.update(updatedBlog);

      // Despacha la acción de like para actualizar el estado en Redux
      dispatch(like({ id })); // Esto actualizará el estado en Redux
    }
  };
};
export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(removeBlog(id));
  };
};

export default blogSlice.reducer;
