import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setFilter: (state, action) => {
      return action.payload;
    },
  },
});

console.log(filterSlice);

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
