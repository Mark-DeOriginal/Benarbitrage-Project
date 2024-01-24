import React, { useEffect, useState } from "react";
import CopyRight from "./Copyright";
import logoWhite from "../assets/logo-white.svg";
import getCookie from "../utilities/getCookie";
import LoadingGridCube from "./LoadingGridCube";

export const Logo = () => {
  return (
    <img src={logoWhite} alt="Logo" width={180} height={180} loading="eager" />
  );
};

const randomPick = (arrayValues) => {
  return arrayValues[Math.floor(Math.random() * arrayValues.length)];
};

const CircularProgress = () => {
  const [progress, setProgress] = useState(1);

  const randomProgressStop = [80, 85, 90, 95];
  const stopPoint = randomPick(randomProgressStop);

  useEffect(() => {
    const randomDuration = [1000, 2000, 3000, 4000, 5000];
    const incrementValues = [
      3, 7, 5, 10, 9, 7, 12, 10, 8, 6, 4, 12, 2, 6, 4, 3,
    ];

    let incrementIndex = 0;

    const interval = setInterval(() => {
      if (progress < stopPoint) {
        setProgress(
          (prevProgress) => prevProgress + incrementValues[incrementIndex]
        );
        incrementIndex += 1;
      }
    }, randomPick(randomDuration));

    return () => clearInterval(interval);
  }, [progress, stopPoint]);

  // Calculate dasharray and dashoffset based on progress
  const dashArray = 250.2;
  const dashOffset = dashArray - (dashArray * progress) / 100;

  return (
    <svg viewBox="0 0 100 100" width={200} height={200}>
      <circle
        style={{
          fill: "none",
          stroke: "#51507c",
          strokeWidth: "1",
          strokeLinecap: "round",
        }}
        cx="50"
        cy="50"
        r="40"
      ></circle>
      <path
        fill="none"
        strokeLinecap="round"
        strokeWidth="3"
        stroke="#B4B3C7"
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
          transition: "stroke-dashoffset 1s ease",
        }}
        d="M50 10
           a 40 40 0 0 1 0 80
           a 40 40 0 0 1 0 -80"
      />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dy="7"
        fontSize="20"
        fill="#B4B3C7"
      >
        {`${progress}%`}
      </text>
    </svg>
  );
};

export default function TradeArea() {
  const [fadeOutFirstLoader, setFadeOutFirstLoader] = useState(false);
  const [hideFirstLoader, setHideFirstLoader] = useState(false);

  const [fadeInSecondLoader, setFadeInSecondLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeOutFirstLoader(true);

      setTimeout(() => {
        setHideFirstLoader(true);
      }, 510);

      setFadeInSecondLoader(true);
    }, 6000);
  }, []);

  return getCookie("onboardingStage", "") !== "COMPLETED" ? (
    redirectTo("/get-started")
  ) : (
    <div className="p-6 pt-8 tablet:p-[60px] tablet:pb-8 min-h-screen bg-[#373659] text-benBlue-200 text-base tablet:text-lg">
      <div className="loading-wrapper relative max-w-[600px] h-[400px] mx-auto text-center pt-10 flex justify-center">
        <div
          className={`loading-1 absolute duration-500 ${
            fadeOutFirstLoader ? "-translate-x-[100px] opacity-0" : ""
          } ${hideFirstLoader ? "hidden" : ""}`}
        >
          <LoadingGridCube />
          <h1 className="text-2xl my-4 initializing-text"></h1>
          <p>
            Please wait while we set up your <br />
            Trading Bot for first time use.
          </p>
          <p>This should take a few minutes.</p>
        </div>
        <div
          className={`loading-2 absolute duration-300 ease-out transition-transform ${
            fadeInSecondLoader ? "show-second-loader" : "hidden"
          }`}
        >
          <CircularProgress />
          <h1 className="text-2xl my-4 loading-text"></h1>
          <p>Please wait.</p>
        </div>
      </div>
      <div className="footer-wrapper  text-center flex flex-col gap-8 items-center text-sm mobile_lg:text-base">
        <Logo />
        <CopyRight />
      </div>
    </div>
  );
}
