import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotificationMessage: (state, action) => {
      return { message: action.payload.message, type: action.payload.type };
    },
    clearNotification: () => null,
  },
});

export const { setNotificationMessage, clearNotification } =
  notificationSlice.actions;

export const setNotification = (message, type, displayTime) => {
  return (dispatch) => {
    dispatch(setNotificationMessage({ message, type }));

    setTimeout(() => {
      dispatch(clearNotification());
    }, displayTime * 1000);
  };
};

export default notificationSlice.reducer;
