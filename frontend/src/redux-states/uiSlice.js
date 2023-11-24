import { createSlice } from "@reduxjs/toolkit";
import getCookie from "../utilities/getCookie";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isDarkMode: false,
    isBuyAssetModalOpen: false,
    userBoardingStage: getCookie("onboardingStage", "SIGN_UP"),
    selectedAsset: {
      name: "Bitcoin",
      logo: "/src/assets/icons/cryptos/bitcoin.svg",
      abbr: "BTC",
    },
    assetPurchaseDetails: {
      assetName: "",
      purchaseAmount: "",
      transactionFee: "",
      totalAmount: "",
    },
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
    setSelectedAsset(state, action) {
      state.selectedAsset = action.payload;
    },
    setIsBuyAssetModalOpen(state, action) {
      state.isBuyAssetModalOpen = action.payload;
    },
    setAssetPurchaseDetails(state, action) {
      state.assetPurchaseDetails = action.payload;
    },
  },
});

export const {
  toggleDarkMode,
  setDarkMode,
  setUserBoardingStage,
  setSelectedAsset,
  setIsBuyAssetModalOpen,
  setAssetPurchaseDetails,
} = uiSlice.actions;

export default uiSlice.reducer;
