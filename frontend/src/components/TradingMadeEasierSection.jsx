import React from "react";
import chartImg from "../assets/trading-chart-img-5.png";

export default function TradingMadeEasier() {
  return (
    <section className="p-6 pt-20 tablet:pt-28 tablet:pb-12 tablet:px-[50px] max-w-[900px] mx-auto">
      <img
        src={chartImg}
        className="w-full h-[200px] tablet:h-[300px] rounded-2xl object-cover brightness-150"
        alt="image"
      />

      <div className="p-2 pt-10 tablet:pt-20 tablet:pb-12 tablet:px-[30px]">
        <h2 className="text-3xl tablet:text-5xl font-extrabold text-benBlue-400 dark:text-benOrange-400 !leading-tight">
          Arbitrage Trading has <br className="hidden tablet:block" />
          never been easier...
        </h2>
        <div className="mt-10 text-lg tablet:text-xl text-benBlue-lightC2 dark:text-benBlue-200">
          <p>
            Thanks to Benarbitrage. You no longer have to worry about the
            technicalities and difficulties that comes with trading.
          </p>
          <p>
            Our powerful AI Trading System continuously scans multiple exchanges
            and markets, identifying price differences on your behalf, and
            executing trades with lightning speed.
          </p>

          <a
            href="/get-started"
            className="block mt-8 w-fit bg-benBlue-400 hover:bg-benBlueLight text-benOrange-300  py-3 px-5 rounded-xl font-medium  dark:bg-benBlue-lightC dark:hover:bg-benBlue-lightC2 dark:text-benBlue-100 duration-300"
          >
            Start Trading with AI
          </a>
        </div>
      </div>
    </section>
  );
}
