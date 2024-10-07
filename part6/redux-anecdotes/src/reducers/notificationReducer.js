import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    Notification: (state, action) => {
      return action.payload;
    },
    clearNotification: () => {
      return null;
    },
  },
});

export const { Notification, clearNotification } = notificationSlice.actions;

export const setNotification = (notification, displayTime) => {
  return async (dispatch) => {
    dispatch(Notification(notification));

    setTimeout(() => {
      dispatch(clearNotification());
    }, displayTime * 1000);
  };
};
export default notificationSlice.reducer;
