import React, { useState } from "react";
import AssetsList from "./AssetsList";
import { useSelector } from "react-redux";
import insertDelimiters from "../../../utilities/insertDelimiters";
import getCookie from "../../../utilities/getCookie";

export default function AssetPurchase() {
  const selectedAsset = useSelector((state) => state.ui.selectedAsset);
  const [assetAmount, setAssetAmount] = useState(() => {
    let acctType = getCookie("accountType", "Basic");

    return acctType === "Basic"
      ? "100"
      : acctType === "Standard"
      ? "300"
      : acctType === "Business"
      ? "500"
      : "100";
  });

  function getTradingSpeed(tradingAmount) {
    let baseTradeAmount = 100;
    let baseTradeSpeed = 25;
    let tradeAmount = parseFloat((tradingAmount || "0").split(",").join(""));
    let speed = (baseTradeSpeed * tradeAmount) / baseTradeAmount;

    return speed;
  }

  function getTradingProfit(tradingAmount) {
    let tradeAmount = parseFloat((tradingAmount || "0").split(",").join(""));
    let percentage = 350;
    return (percentage * tradeAmount) / 100;
  }

  function getTradingFee(tradingAmount) {
    let tradeAmount = parseFloat((tradingAmount || "0").split(",").join(""));
    let percentageFee = 12.3;
    return ((percentageFee * tradeAmount) / 100).toFixed(2);
  }

  function getNetProfit(gross, fee) {
    return gross - fee;
  }

  const [tradeSpeed, setTradeSpeed] = useState(
    insertDelimiters(getTradingSpeed(assetAmount))
  );

  const [tradeProfit, setTradeProfit] = useState(
    insertDelimiters(getTradingProfit(assetAmount))
  );

  const [tradeFee, setTradeFee] = useState(
    insertDelimiters(getTradingFee(assetAmount))
  );

  const [tradeNetProfit, setTradeNetProfit] = useState(
    insertDelimiters(
      getNetProfit(getTradingProfit(assetAmount), getTradingFee(assetAmount))
    )
  );

  const handleChange = (e) => {
    let strippedValue = e.target.value.replace(/[^0-9]/g, "");
    // Return the strings except the last one
    let prevValues = strippedValue.slice(0, strippedValue.length - 1);

    let parsedValue =
      parseFloat(prevValues) < 1 // If prevValues are less than 1,
        ? strippedValue[strippedValue.length - 1] // Return the last string
        : strippedValue;

    setAssetAmount(insertDelimiters(parsedValue));
    setTradeSpeed(insertDelimiters(Math.round(getTradingSpeed(strippedValue))));
    setTradeProfit(() => {
      const profit = getTradingProfit(strippedValue);
      return profit == 0 ? "0.00" : insertDelimiters(profit);
    });
    setTradeFee(() => {
      const fee = getTradingFee(strippedValue);
      return fee == 0 ? "0.00" : insertDelimiters(fee);
    });
    setTradeNetProfit(() => {
      const netProfit = getNetProfit(
        getTradingProfit(strippedValue),
        getTradingFee(strippedValue)
      ).toFixed(2);

      return netProfit == 0 ? "0.00" : insertDelimiters(netProfit);
    });

    setIsAmountError(false);
  };

  const handleLoseFocus = () => {
    if (assetAmount === "" || assetAmount === "0") {
      setAssetAmount(() => "0.00");
    }
  };

  const [isAmountError, setIsAmountError] = useState(false);

  const handleBuyAndTrade = () => {
    if (parseFloat(assetAmount.split(",").join("")) < 100) {
      setIsAmountError(true);
    } else {
      const navigateToBuyAndTrade = () => {
        const userID = getCookie("accountId", "accId");
        const userName = getCookie("userName", "welcome")
          .toLowerCase()
          .split(" ")
          .join("-");
        const formattedAssetName = selectedAsset.name
          .toLowerCase()
          .split(" ")
          .join("-");
        const assetPurchaseAmount = assetAmount;
        window.location.href = `/buy-and-trade/${formattedAssetName}/${assetPurchaseAmount}/${userName}/${userID}`;
      };

      navigateToBuyAndTrade();
    }
  };

  return (
    <>
      <div className="place-trade">
        <div className="header font-medium text-center max-w-[600px] mx-auto">
          <h2
            name="placeTrade"
            className="text-2xl mb-2 font-bold text-benBlue-400 dark:text-benOrange-400"
          >
            Place Trade
          </h2>
          <p>
            Please note, trade durations are calculated based on current market
            data and therefore, may vary slightly later.
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
                        maxLength={11}
                        value={assetAmount}
                        onBlur={handleLoseFocus}
                        placeholder="Enter amount"
                        className={`text-xl focus:ring-2 ring-benBlue-lightD dark:ring-benBlue-200/40 bg-white dark:bg-transparent drop-shadow-sm rounded-lg pr-4 pl-7 py-2 w-full border ${
                          isAmountError
                            ? "border-errorColor dark:border-errorColor"
                            : "border-navBarBorderLight dark:border-benBlue-lightC2"
                        }`}
                      />
                      <span className="absolute top-[25%] bottom-[25%] left-4 text-xl flex items-center">
                        $
                      </span>
                    </div>
                    {
                      // If there's an error, render the <p> element with the error message
                      isAmountError && (
                        <p className="message text-left mt-[6px] text-sm text-errorColor">
                          Should not be less than $100
                        </p>
                      )
                    }
                    <div className="trade-calc space-y-2">
                      <div className="row mt-4 flex justify-between items-center">
                        <h4>Trade speed</h4>
                        <p className="text-base font-bold">
                          {tradeSpeed} mkt/s
                        </p>
                      </div>
                      <div className="row flex justify-between items-center">
                        <h4>Trade duration</h4>
                        <p className="text-base font-bold">8hrs, 42mins</p>
                      </div>
                      <div className="group border-y border-benBlue-200 dark:border-benBlue-lightB py-2">
                        <div className="row flex justify-between items-center">
                          <h4>Trade profit [350%]</h4>
                          <p className="text-base font-bold">${tradeProfit}</p>
                        </div>
                        <div className="row flex justify-between items-center">
                          <h4>Fee + Tax [12.3%]</h4>
                          <p className="text-base font-bold">${tradeFee}</p>
                        </div>
                      </div>
                      <div className="row text-center pt-4">
                        <h4>Net profit [profit - fee] </h4>
                        <p className="text-xl tablet:text-2xl font-bold mt-2">
                          ${tradeNetProfit}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleBuyAndTrade}
                    className="block bg-benBlue-lightE dark:bg-benOrange-300 text-benBlue-100 dark:text-benBlue-400 ring-offset-2 focus:ring-2 active:scale-[0.9] ring-offset-benWhite dark:ring-offset-benBlue-400 ring-benBlue-lightD dark:ring-benOrange-300 drop-shadow-sm rounded-xl w-fit py-2 px-8 mx-auto text-center mt-8 font-medium text-base tablet:text-lg"
                  >
                    Buy & Trade
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
