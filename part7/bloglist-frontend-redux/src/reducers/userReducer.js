import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
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

// Thunks
export const initializeUser = () => (dispatch) => {
  try {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  } catch (error) {
    console.error("Error initializing user:", error);
    dispatch(setNotification("Failed to initialize user", "error", 5));
  }
};

export const handleLogin = (credentials) => async (dispatch) => {
  try {
    const user = await loginService.login(credentials);
    window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(setUser(user));
    dispatch(setNotification(`Logged in as ${user.name}`, "success", 5));
    return user;
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Wrong credentials";
    console.error("Login error:", error);
    dispatch(setNotification(errorMessage, "error", 5));
    return null;
  }
};

export const handleLogout = () => (dispatch) => {
  try {
    window.localStorage.removeItem("loggedNoteappUser");
    blogService.setToken(null);
    dispatch(logout());
    dispatch(setNotification("Logged out successfully", "success", 5));
  } catch (error) {
    console.error("Logout error:", error);
    dispatch(setNotification("Error logging out", "error", 5));
  }
};

export default userSlice.reducer;
