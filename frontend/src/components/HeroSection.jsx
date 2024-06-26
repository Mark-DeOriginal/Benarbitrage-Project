import React from "react";
import Caret from "./Caret";
import chartImg from "../assets/trading-chart-img-1.jpg";

export default function HeroSection() {
  return (
    <section className="p-6 tablet:px-[50px] pt-[130px] tablet:pt-[150px] flex gap-16 items-start relative overflow-hidden">
      <div className="blur-bg-effect absolute top-[180px] left-[32px] h-[200px] w-[91px] bg-[#646297] z-0 blur-[100px]"></div>

      <div className="hero-texts relative z-5">
        <div>
          <h1 className="mt-4 text-3xl min-[520px]:text-4xl tablet:text-5xl font-extrabold tracking-[-0.02em] text-benBlue-400 dark:text-benOrange-400 leading-[2.5rem] tablet:leading-[3.5rem]">
            We've made Arbitrage Trading easier, less risky and even more
            profitable with AI.
          </h1>
        </div>

        <div className="mt-6 text-benBlue-lightC dark:text-benBlue-200 text-base mobile:text-xl mb">
          <p>Join thousands of active traders.</p>
          <ul className="pl-2">
            <li className="flex items-center">
              <Caret
                className={`fill-benBlueLight dark:fill-benBlue-300 -rotate-90`}
              />
              Enjoy low transaction fees
            </li>
            <li className="flex items-center">
              <Caret
                className={`fill-benBlueLight dark:fill-benBlue-300 -rotate-90`}
              />
              Smooth transaction process
            </li>
            <li className="flex items-center">
              <Caret
                className={`fill-benBlueLight dark:fill-benBlue-300 -rotate-90`}
              />
              Crisp and Smooth User Interface
            </li>
          </ul>
          <div className="flex space-x-2 mt-6">
            <a
              href="/get-started"
              className="bg-benBlue-400 text-benOrange-300 dark:bg-benOrange-400 dark:text-benBlue-400 py-3 px-5 rounded-3xl font-medium hover:bg-benBlueLight dark:hover:bg-benOrange-300 mobile_lg:duration-300"
            >
              Trade with AI
            </a>
            <a
              href="/learn"
              className="bg-benBlue-100 dark:bg-benBlue-lightC dark:text-benBlue-100 py-3 px-5 rounded-3xl font-medium"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      <img
        className="hero-img h-auto w-[440px] rounded-3xl hidden screen940:block relative z-5"
        src={chartImg}
        alt="Effortless trading"
      />
    </section>
  );
}
