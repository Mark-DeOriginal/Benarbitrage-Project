import React from "react";
import CopyRight from "./Copyright";
import logoWhite from "../assets/logo-white.svg";
import getCookie from "../utilities/getCookie";
import LoadingGridCube from "./LoadingGridCube";

export const Logo = () => {
  return (
    <img src={logoWhite} alt="Logo" width={180} height={180} loading="eager" />
  );
};

export default function TradeArea() {
  return getCookie("onboardingStage", "") !== "COMPLETED" ? (
    redirectTo("/get-started")
  ) : (
    <div className="p-6 pt-8 tablet:p-[60px] tablet:pb-8 min-h-screen bg-[#373659] text-benBlue-200 text-base tablet:text-lg">
      <div className="loading-wrapper max-w-[600px] mx-auto text-center pt-20">
        <LoadingGridCube />
        <h1 className="text-2xl my-4 initializing-text"></h1>
        <p>
          Please wait while we set up your <br />
          Trading Bot for first time use.
        </p>
        <p>This should take a few minutes.</p>
      </div>
      <div className="footer-wrapper mt-40 mobile_lg:mt-28 text-center flex flex-col gap-8 items-center text-sm mobile_lg:text-base">
        <Logo />
        <CopyRight />
      </div>
    </div>
  );
}
