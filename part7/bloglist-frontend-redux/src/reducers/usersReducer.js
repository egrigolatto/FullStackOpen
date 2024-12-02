import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";
import { setNotification } from "../reducers/notificationReducer";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    addUser(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setUsers, addUser } = usersSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const users = await usersService.getAll();
      dispatch(setUsers(users));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
};

export const createUser = (newUser) => {
  return async (dispatch) => {
    try {
      const createdUser = await usersService.create(newUser);
      dispatch(addUser(createdUser));
      dispatch(
        setNotification(
          `User ${createdUser.name} created successfully`,
          "success",
          5
        )
      );
    } catch (error) {
      console.error("Error creating user:", error);
      const errorMessage =
        error.response?.data?.error ||
        "An error occurred while creating the user.";
      dispatch(setNotification(errorMessage, "error", 5));
    }
  };
};

export default usersSlice.reducer;
