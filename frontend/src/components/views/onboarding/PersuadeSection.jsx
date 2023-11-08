import React from "react";
import Logo from "../../BenarbitrageLogo.jsx";
import DarkModeToggle from "../../DarkModeToggle";
import { Review } from "../../ReviewsSection";

export default function PersuadeSection() {
  return (
    <div className="column relative min-[980px]:w-[450px] shrink-0 border-b min-[980px]:border-b-0 min-[980px]:border-r border-navBarBorderLight dark:border-navBarBorderDark bg-[#e9e9ed] dark:bg-benDarkBlue">
      <div className="blur-background absolute top-[180px] left-[32px] h-[200px] w-[91px] bg-[#646297] z-0 blur-[90px]"></div>
      <div className="blur-background absolute top-[180px] right-[32px] h-[200px] w-[91px] bg-benOrange-400 z-0 blur-[90px]"></div>

      <div className="header bg-navBarLightBg dark:bg-navBarDarkBg border-b border-navBarBorderLight dark:border-navBarBorderDark tablet:px-10 px-6 py-4 fixed z-10 min-[980px]:relative w-full backdrop-blur-sm">
        <div className="wrapper flex space-x-2 justify-between items-center h-[50px]">
          <Logo />
          <DarkModeToggle />
        </div>
      </div>
      <div className="body relative z-[1] mt-32 min-[980px]:mt-16 pb-8 tablet:px-10 px-6 text-center min-[980px]:text-left">
        <p className="text-lg mobile:text-2xl font-medium text-benBlue-lightC dark:text-benBlue-200">
          Why trade manually?
        </p>
        <h2 className="mt-4 text-[25px] mobile:text-[30px] tablet:text-[40px] leading-[1.9rem] tablet:leading-[3.2rem] font-bold tracking-[-0.02em] text-benBlue-400 dark:text-benOrange-400">
          AI has made Arbitrage Trading easier and{" "}
          <br className="mobile:hidden" />
          more profitable.
        </h2>
        <div className="mt-12">
          <Review
            twitterUsername={`@fredemmanuel23`}
            alignment={`min-[980px]:items-start`}
          >
            "Manual arbitrage trading is like hell. <br />
            Thanks to AI for the relief."
          </Review>
        </div>
      </div>
    </div>
  );
}
