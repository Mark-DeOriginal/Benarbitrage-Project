import { createSlice } from "@reduxjs/toolkit";
import getCookie from "../utilities/getCookie";
import getAccountBalance from "../utilities/getAccountBalance";

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
    accountBalance: {
      balance: "...",
      interest: "...",
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
    setAccountBalance(state, action) {
      state.accountBalance = action.payload;
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
  setAccountBalance,
} = uiSlice.actions;

export default uiSlice.reducer;
