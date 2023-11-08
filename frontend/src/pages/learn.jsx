import React from "react";

export default function LearnPage() {
  return (
    <section className="p-6 pt-[130px] tablet:pt-[150px] tablet:pb-12 tablet:px-[50px] max-w-[900px] mx-auto">
      <img
        src="/src/assets/trading-chart-img-2.png"
        className="w-full h-[200px] rounded-2xl object-cover saturate-[70%]"
        alt="image"
      />

      <div className="p-2 pt-10 tablet:pt-20 tablet:pb-12 tablet:px-[30px]">
        <h2 className="text-3xl tablet:text-5xl font-bold text-benBlue-400 dark:text-benOrange-400">
          What is Arbitrage Trading?
        </h2>
        <div className="mt-10 text-lg tablet:text-xl text-benBlue-lightC dark:text-benBlue-200 mb-2">
          <p>It's simply buying and selling, with the aim of making profit.</p>
          <p>
            For instance, if an asset is priced lower on one exchange and higher
            on another, smart traders can swoop in, buy it where it's cheaper,
            and then sell it where it's more expensive, making some profit.
          </p>
          <p>
            <b className="dark:text-benOrange-400">
              The Challenges of Manual Arbitrage Trading
            </b>
          </p>
          <p>
            Embarking on manual arbitrage trading is like navigating a bustling
            market blindfolded. The fast-paced nature of financial exchanges
            means that prices fluctuate in the blink of an eye. This can lead to
            missed opportunities and, worse, potential losses for traders
            attempting to execute trades manually.
          </p>
          <p>
            Moreover, it demands an extraordinary level of vigilance and swift
            decision-making skills. Traders need to constantly watch multiple
            exchanges, calculate price differences, and execute trades promptly.
            It's a tiring, time-consuming process that can often lead to
            exhaustion and lower returns.
          </p>
          <p>
            <b className="dark:text-benOrange-400">
              How Does Our AI Trading System Help?
            </b>
          </p>
          <p>
            Our AI Trading System is like having a tireless, lightning-fast
            assistant that never misses a beat. It not only spots arbitrage
            opportunities but also carries out the trades on your behalf,
            ensuring you're always ready to take advantage of market
            disparities.
          </p>
          <p>
            Using advanced computational algorithms, our system scans exchanges
            with exceptional speed and precision. It keeps track of price
            movements in real-time and analyzes market data to secure
            substantial profits for traders.
          </p>
          <p>
            Ready to experience a new level of profitability in arbitrage
            trading? Say goodbye to the stress of manual trading.
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
