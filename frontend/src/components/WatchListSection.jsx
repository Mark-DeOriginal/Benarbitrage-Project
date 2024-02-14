import React, { useEffect, useState } from "react";
import { initializeExchanges } from "../constants";

import ExchangeTypeLists from "./TradingExchangeTypeList";

export default function WatchListSection() {
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    const fetchExchanges = async () => {
      const initializedExchanges = await initializeExchanges();
      setExchanges(initializedExchanges);
    };

    fetchExchanges();
  }, []);

  return (
    <section className="p-6 pt-20 tablet:pt-28 tablet:pb-12 tablet:px-[50px] max-w-[900px] mx-auto">
      <h2 className="text-2xl tablet:text-3xl font-bold text-benBlue-400 dark:text-benOrange-400 text-center">
        Ben Exchange
        <br />{" "}
        <span className="text-xl tablet:text-2xl text-benBlue-lightB dark:text-benBlue-200 font-medium">
          Watch List
        </span>
      </h2>
      <div className="mt-10 text-benBlue-lightC2 dark:text-benBlue-200 max-w-[600px] mx-auto flex flex-col gap-10">
        {exchanges.map((exchange, index) => (
          <div className="exchange mb-4" key={index}>
            <div className="flex justify-between mx-4 items-center mb-4">
              <h3 className="font-medium text-lg tablet:text-xl">
                {exchange.name}
              </h3>
              {exchange.CPT && (
                <p className="text-sm tablet:text-base">CPT: {exchange.CPT}</p>
              )}
            </div>

            <ExchangeTypeLists exchange={exchange} />

            <div className="CTA pt-2 flex justify-center mt-4">
              <a
                href="/get-started"
                className="trades-cta relative bg-benBlue-100 hover:bg-benBlue-100B dark:bg-benBlue-lightC dark:hover:bg-benBlue-lightC2 dark:text-benBlue-100 py-4 px-6 rounded-xl font-medium duration-300"
              >
                Trade with AI
                {/* <span className="absolute -top-[14px] right-2 bg-benOrange-400 py-[2px] px-[6px] rounded-xl text-[10px] tablet:text-xs text-benBlue-lightC">
                  50% bonus
                </span> */}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
