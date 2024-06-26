import { createSlice } from "@reduxjs/toolkit";
import getCookie from "../utilities/getCookie";
import bitcoinLogo from "../assets/icons/cryptos/bitcoin.svg";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isDarkMode: true,
    isBuyAssetModalOpen: false,
    userBoardingStage: getCookie("onboardingStage", "SIGN_UP"),
    selectedAsset: {
      name: "Bitcoin",
      logo: bitcoinLogo,
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
    circleLoaderInstance: 1,
    isLoadingError: false,
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
    incrementCircleLoaderInstance(state) {
      state.circleLoaderInstance = state + 1;
    },
    setIsLoadingError(state, action) {
      state.isLoadingError = action.payload;
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
  incrementCircleLoaderInstance,
  setIsLoadingError,
} = uiSlice.actions;

export default uiSlice.reducer;
