import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAsset } from "../../../redux-states/uiSlice";
import insertDelimiters from "../../../utilities/insertDelimiters";
import { scroller as scroll } from "react-scroll";
import { initializeExchanges } from "../../../constants";

export const ExchangeTypeList = ({ type }) => {
  const [performance, setPerformance] = useState(type.performance);
  const [marketPrice, setMarketPrice] = useState(type.marketPrice);

  var performances = [];
  var perfAmounts = [0.01, 0.02, 0.03, 0.1, 0.2, 0.3];

  while (performances.length < 6) {
    const randomPick = Math.floor(
      // Generate a random number between 0 and 5 (the length of the perfAmounts array - 1)
      Math.random() * (perfAmounts.length - 1)
    );

    // Generate a performance value by adding the base performance to any of the values
    // in the perfAmounts variable
    const generatedPerformance = (
      type.performance + perfAmounts[randomPick]
    ).toFixed(2);
    // Push the generated performance into the performances array
    performances.push(parseFloat(generatedPerformance));
  }

  const newPerformance = () => {
    const randomPick = Math.floor(Math.random() * (performances.length - 1));
    // Randomly pick one element from the "performances" array
    return performances[randomPick];
  };

  const newMarketPrice = () => {
    const price = (
      (newPerformance() * type.marketPrice) / 100 +
      type.marketPrice
    ).toFixed(2);
    return insertDelimiters(price);
  };

  useEffect(() => {
    const update = setInterval(() => {
      setPerformance(newPerformance());

      setMarketPrice(newMarketPrice());
    }, 2000); // Update the rates every 2s

    return () => clearInterval(update);
  }, []);

  const selectedAsset = useSelector((state) => state.ui.selectedAsset);

  return (
    <>
      <div className="logo-and-name flex gap-3 items-center">
        {type.logo && (
          <img
            src={type.logo}
            height={40}
            width={40}
            loading="eager"
            alt="image"
          />
        )}
        <div>
          <p className="name leading-tight">
            <span className="name font-medium">{type.name}</span>
            <br />
            <span className="abbreviation">{type.abbr ? type.abbr : ""}</span>
          </p>
        </div>
      </div>
      <div>
        <div className="figures text-right">
          <span
            className={`performance text-green-600 dark:text-green-300 text-base`}
          >
            +{performance}%
          </span>
          <br />
          <span
            className={`market-price text-base tablet:text-lg font-medium ${
              selectedAsset.name === type.name ? "dark:text-benOrange-300" : ""
            }`}
          >
            {type.currency}
            {marketPrice}
          </span>
        </div>
      </div>
    </>
  );
};

export function ExchangeTypeLists({ exchange }) {
  const selectedAsset = useSelector((state) => state.ui.selectedAsset);
  const dispatch = useDispatch();

  const handleAssetClick = (type) => {
    dispatch(
      setSelectedAsset({
        name: type.name,
        logo: type.logo,
        abbr: type.abbr || "",
      })
    );
    scroll.scrollTo("placeTrade", {
      duration: 800,
      smooth: "easeInOutQuart",
      offset: 40,
    });
  };

  return (
    <div className="text-base text-benBlue-lightB dark:text-benBlue-100">
      {exchange.types.map((type, index) => (
        <div
          className={`${
            selectedAsset.name === type.name
              ? "ring-2 ring-benBlue-lightD dark:ring-benOrange-300"
              : "border border-benBlue-100 dark:border-benBlue-lightC2"
          } active:scale-[0.95] select-none py-2 px-4 flex justify-between bg-benWhite dark:bg-transparent rounded-md cursor-pointer mb-1`}
          key={index}
          onClick={() => handleAssetClick(type)}
        >
          <ExchangeTypeList type={type} />
        </div>
      ))}
    </div>
  );
}

const getExchanges = initializeExchanges();
export default function AssetsList() {
  return (
    <>
      {getExchanges.map((exchange, index) => (
        <div className="exchange mb-4" key={index}>
          <div className="flex justify-between mx-4 items-center mb-4">
            <h3 className="font-medium text-base">{exchange.name}</h3>
            {exchange.CPT && <p className="text-sm">CPT: {exchange.CPT}</p>}
          </div>

          <ExchangeTypeLists exchange={exchange} />
        </div>
      ))}
    </>
  );
}
