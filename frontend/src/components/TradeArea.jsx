import React, { useEffect, useState } from "react";
import CopyRight from "./Copyright";
import logoWhite from "../assets/logo-white.svg";
import getCookie from "../utilities/getCookie";
import LoadingGridCube from "./LoadingGridCube";
import { redirectTo } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoadingError } from "../redux-states/uiSlice";

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

  const randomProgressStop = [80, 82, 84, 86, 88];
  const stopPoint = randomPick(randomProgressStop);

  const dispatch = useDispatch();

  useEffect(() => {
    const randomDuration = [2000, 4000, 6000, 8000];
    const incrementValues = [8, 4, 5, 6, 4, 6, 8, 4, 8, 6, 4, 8, 2, 6, 4, 8];

    const interval = setInterval(() => {
      if (progress < stopPoint) {
        setProgress(
          (prevProgress) => prevProgress + randomPick(incrementValues)
        );
      } else {
        setTimeout(() => {
          dispatch(setIsLoadingError(true));
        }, 20000);
      }
    }, randomPick(randomDuration));

    return () => clearInterval(interval);
  }, [progress, stopPoint]);

  // Calculate dasharray and dashoffset based on progress
  const dashArray = 250.2;
  const dashOffset = dashArray - (dashArray * progress) / 100;

  return (
    <svg viewBox="0 0 100 100" width={200} height={200} className="mx-auto">
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

export const LoadingMessage = () => {
  const [fadeOutLoadingInfo, setFadeOutLoadingInfo] = useState(null);
  const [hideLoadingInfo, setHideLoadingInfo] = useState(false);

  const [fadeOutLoadingError, setFadeOutLoadingError] = useState(false);
  const [showLoadingError, setShowLoadingError] = useState(false);

  const isLoadingError = useSelector((state) => state.ui.isLoadingError);

  useEffect(() => {
    if (isLoadingError) {
      setFadeOutLoadingInfo(true);

      setTimeout(() => {
        setHideLoadingInfo(true);
      }, 500);

      setFadeOutLoadingError(false);
      setShowLoadingError(true);
    }
  }, [isLoadingError]);

  const goToDashBoard = () => {
    redirectTo("/dashboard");
  };

  const reloadBot = () => {
    location.reload();
  };

  return (
    <div className="loading-message relative flex justify-center w-[400px]">
      <div
        className={`loading-info absolute ${
          fadeOutLoadingInfo == true
            ? "fade-out-loading-info"
            : fadeOutLoadingInfo == false
            ? "fade-in-loading-info"
            : ""
        } ${hideLoadingInfo ? "hidden" : ""}`}
      >
        <h1 className="text-2xl my-4 loading-text"></h1>
        <p>Please wait.</p>
      </div>

      {showLoadingError && (
        <div
          className={`loading-error absolute ${
            fadeOutLoadingError
              ? "fade-out-loading-error"
              : "fade-in-loading-error"
          }`}
        >
          <h1 className="text-2xl my-4">Something's not right!</h1>
          <p>This is taking longer than usual.</p>

          <div className="action-btns my-4 flex gap-2 justify-center">
            <button
              onClick={reloadBot}
              className={`bg-benBlue-lightC
                text-benBlue-100 w-[150px]
            active:scale-[0.9] drop-shadow-sm rounded-xl py-2 px-4 text-center font-medium text-base tablet:text-lg`}
            >
              Reload
            </button>
            <button
              onClick={goToDashBoard}
              className="dark:bg-benBlueLight/70 dark:text-benBlue-200 active:scale-[0.9] drop-shadow-sm rounded-xl w-fit py-2 px-4 text-center font-medium text-base tablet:text-lg"
            >
              Abort
            </button>
          </div>
          <p className="text-xs tablet:text-sm">Abort to end the operation</p>
        </div>
      )}
    </div>
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
      }, 500);

      setFadeInSecondLoader(true);
    }, 6000);
  }, []);

  return getCookie("onboardingStage", "") !== "COMPLETED" ? (
    redirectTo("/get-started")
  ) : (
    <div className="p-6 pt-8 tablet:p-[60px] tablet:pb-8 min-h-screen bg-[#373659] text-benBlue-200 text-base tablet:text-lg">
      <div className="loading-wrapper relative max-w-[600px] h-[500px] mx-auto text-center pt-10 flex justify-center">
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
          <p>This should take a few seconds.</p>
        </div>

        {fadeInSecondLoader && (
          <div className={`loading-2 absolute`}>
            <CircularProgress />
            <LoadingMessage />
          </div>
        )}
      </div>
      <div className="footer-wrapper text-center flex flex-col gap-8 items-center text-sm mobile_lg:text-base">
        <Logo />
        <CopyRight />
      </div>
    </div>
  );
}
