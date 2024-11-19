import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotificationMessage: (state, action) => {
      try {
        const { message, type } = action.payload;
        // Garantiza que message sea siempre una cadena
        const validMessage =
          typeof message === "string" ? message : JSON.stringify(message);
        return { message: validMessage, type };
      } catch (error) {
        console.error("Error setting notification message:", error);
        return state; // Devuelve el estado actual si ocurre un error
      }
    },
    clearNotification: () => null,
  },
});

export const { setNotificationMessage, clearNotification } =
  notificationSlice.actions;

export const setNotification = (message, type, displayTime) => {
  return (dispatch) => {
    try {
      dispatch(setNotificationMessage({ message, type }));

      setTimeout(() => {
        try {
          dispatch(clearNotification());
        } catch (error) {
          console.error("Error clearing notification:", error);
        }
      }, displayTime * 1000);
    } catch (error) {
      console.error("Error setting notification:", error);
    }
  };
};

export default notificationSlice.reducer;
