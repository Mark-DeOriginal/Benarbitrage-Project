import React, { useState, useEffect } from "react";
import insertDelimiters from "../utilities/insertDelimiters";

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

  return (
    <a
      href="/get-started"
      className="py-2 px-4 tablet:p-4 flex justify-between bg-benWhite dark:bg-benBlue-lightC rounded-2xl"
    >
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
            className={`performance text-green-600 dark:text-green-300 text-base tablet:text-lg`}
          >
            +{performance}%
          </span>
          <br />
          <span className="market-price text-lg tablet:text-xl font-medium">
            {type.currency}
            {marketPrice}
          </span>
        </div>
      </div>
    </a>
  );
};

export default function ExchangeTypeLists({ exchange }) {
  return (
    <div className="text-base tablet:text-lg text-benBlue-lightB dark:text-benBlue-100">
      {exchange.types.map((type, index) => (
        <div className="mb-1" key={index}>
          <ExchangeTypeList type={type} />
        </div>
      ))}
    </div>
  );
}
