import { createSlice } from "@reduxjs/toolkit";
import getCookie from "../utilities/getCookie";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isDarkMode: false,
    userBoardingStage: getCookie("onboardingStage", "SIGN_UP"),
  },
  reducers: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode(state, action) {
      state.isDarkMode = action.payload;
    },
    setUserBoardingStage(state, action) {
      state.userBoardingStage = action.payload;
    },
  },
});

export const { toggleDarkMode, setDarkMode, setUserBoardingStage } =
  uiSlice.actions;

export default uiSlice.reducer;
