import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const wordSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    add: (state, action) => {
      state.data = [...action.payload];
    },
  },
});

export const { add } = wordSlice.actions;
export default wordSlice.reducer;
