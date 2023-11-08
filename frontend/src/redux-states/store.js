import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "../redux-states/uiSlice.js";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});
