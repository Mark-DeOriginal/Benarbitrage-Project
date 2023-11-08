import React from "react";
import CopyRight from "./Copyright";

export default function Footer() {
  return (
    <footer className="p-10 tablet:px-10 bg-[#e4e4e7] dark:bg-[#373659] text-benBlue-400 dark:text-benBlue-200 text-base tablet:text-lg text-center relative">
      <div className="max-w-[800px] mx-auto">
        <p className="text-xs tablet:text-sm">
          We are very optimistic of the capabilities of our AI Trading System
          and it's ability to trade the financial market and return profits for
          our users. However, market forces and other circumstances which are
          beyond the control of our AI Systems may influence trade profits,
          price of assets and duration of trades.
          <br />
        </p>
        <p className="text-xs tablet:text-sm">
          <br /> For more information, check out our <br />
          <a href="/terms" className="font-bold">
            Terms and Conditions
          </a>
          ,{" "}
          <a href="/privacy-policy" className="font-bold">
            Privacy Policy
          </a>
          , and{" "}
          <a href="/refund-policy" className="font-bold">
            <br className="block tablet:hidden" />
            Refund Policy
          </a>
          .
        </p>
        <CopyRight />
      </div>
    </footer>
  );
}
