import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/users";
import blogService from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    logout: () => null,
  },
});

// Acciones
export const { setUser, logout } = userSlice.actions;

export const initializeUser = () => (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    dispatch(setUser(user));
  }
};

export const handleLogin = (usuario) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(usuario);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(setNotification(`Logged in as ${user.name}`, "success", 5));
    } catch (error) {
      console.log(error);
      dispatch(setNotification("Wrong credentials", "error", 5));
    }
  };
};

export const handleLogout = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedNoteappUser");
    blogService.setToken(null);
    dispatch(logout());
  };
};

export default userSlice.reducer;
