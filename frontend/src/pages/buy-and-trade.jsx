import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BuyAndTrade from "../components/views/onboarding/BuyAndTrade";

export default function BuyAndTradeSection() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/buy-and-trade/:assetName/:assetAmount/:userName"
          element={<BuyAndTrade />}
        />
      </Routes>
    </BrowserRouter>
  );
}
