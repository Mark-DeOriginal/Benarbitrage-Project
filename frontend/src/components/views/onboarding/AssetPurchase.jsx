import React, { useState } from "react";
import AssetsList from "./AssetsList";
import { useSelector } from "react-redux";
import insertDelimiters from "../../../utilities/insertDelimiters";

export default function AssetPurchase() {
  const selectedAsset = useSelector((state) => state.ui.selectedAsset);
  const [assetAmount, setAssetAmount] = useState("300");

  const handleChange = (e) => {
    let strippedValue = e.target.value.replace(/[^0-9]/g, "");
    setAssetAmount(() => insertDelimiters(strippedValue));
  };

  const handleLoseFocus = () => {
    if (assetAmount === "") {
      setAssetAmount(() => "00.00");
    }
  };

  return (
    <div className="sign-up">
      <div className="header font-medium text-center max-w-[600px] mx-auto">
        <h2 className="text-2xl mb-2 font-bold text-benBlue-400 dark:text-benOrange-400">
          Place Trade
        </h2>
        <p>
          Creating of multiple accounts to claim bonuses is highly prohibited.
          <br />
          Bonus only applies on your first trade with Benarbitrage.
        </p>
      </div>
      <div className="body mt-8">
        <div className="wrapper flex flex-col tablet:flex-row screen980:flex-col screen1240:flex-row items-start gap-4">
          <div className="row assets border border-navBarBorderLight dark:border-navBarBorderDark w-full grow screen980:w-full order-2 tablet:order-1 screen980:order-2 screen1240:order-1 rounded-xl">
            <div className="header pt-4 px-6 dark:border-navBarBorderDark">
              <h3 className="font-medium text-lg tablet:text-xl dark:text-benOrange-300">
                Assets
              </h3>
              <div className="info text-sm mt-2">
                <p>
                  Note: Asset prices and metrics are updated based on their
                  differential values in several other exchanges.
                </p>
                <p>Click an asset below to select it.</p>
              </div>
            </div>
            <div className="assets-wrapper p-[10px] pt-6">
              <AssetsList />
            </div>
          </div>
          <div className="row selected-asset ring-2 ring-benBlue-lightD dark:ring-benOrange-300 bg-benWhite dark:bg-transparent shadow-cardShadow flex-none w-full tablet:w-[310px] screen980:w-full screen1240:w-[310px] order-1 tablet:order-2 screen980:order-1 screen1240:order-2 rounded-xl">
            <div className="header pt-4 px-6 dark:border-navBarBorderDark">
              <div className="asset-purchase-info my-4">
                <div className="logo-and-name text-center space-y-2">
                  {selectedAsset.logo && (
                    <img
                      src={selectedAsset.logo}
                      height={60}
                      width={60}
                      loading="eager"
                      alt="image"
                      className="mx-auto"
                    />
                  )}
                  <p className="name font-medium text-xl">
                    {`${selectedAsset.name} ${
                      selectedAsset.abbr.trim() !== ""
                        ? " - " + selectedAsset.abbr
                        : ""
                    }`}
                  </p>
                  {selectedAsset.name === "Bitcoin" && (
                    <p className="text-xs w-fit mx-auto py-[4px] px-4 bg-navBarBorderLight dark:bg-benBlue-lightC rounded-lg">
                      Most Popular
                    </p>
                  )}
                </div>
                <div className="figures mt-4">
                  <div className="input-wrapper relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      onChange={handleChange}
                      value={assetAmount}
                      onBlur={handleLoseFocus}
                      placeholder="Enter amount"
                      className="text-xl focus:ring-2 ring-benBlue-lightD dark:ring-benBlue-200/40 bg-white dark:bg-transparent drop-shadow-sm rounded-lg pr-4 pl-7 py-2 w-full border border-navBarBorderLight dark:border-benBlue-lightC2"
                    />
                    <span className="absolute top-[25%] bottom-[25%] left-4 text-xl flex items-center">
                      $
                    </span>
                  </div>
                  <div className="trade-calc space-y-2">
                    <div className="row mt-4 flex justify-between items-center">
                      <h4>Trade profit</h4>
                      <p className="text-lg font-bold">$1,050</p>
                    </div>
                    <div className="row flex justify-between items-center">
                      <h4>Trade speed</h4>
                      <p className="text-lg font-bold">147mkt/s</p>
                    </div>
                    <div className="row flex justify-between items-center">
                      <h4>Trade duration</h4>
                      <p className="text-lg font-bold">8hrs, 42mins</p>
                    </div>
                  </div>
                </div>
                <button className="block bg-benBlue-lightE dark:bg-benOrange-300 text-benBlue-100 dark:text-benBlue-400 ring-offset-2 ring-2 active:scale-[0.9] ring-offset-benWhite dark:ring-offset-benBlue-400 ring-benBlue-lightD dark:ring-benOrange-300 drop-shadow-sm rounded-xl w-fit py-2 px-8 mx-auto text-center mt-8 font-medium text-base text-lg">
                  Buy & Trade
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
