import { configureStore } from "@reduxjs/toolkit";
import wordsReducer from "./features/words/wordSlice";

export const store = configureStore({
  reducer: {
    words: wordsReducer,
  },
});
