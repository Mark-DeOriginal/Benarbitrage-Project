import React from "react";
import { ErrorIcon } from "../../../icons";

export default function SignUpFailed() {
  function handleBackToSignUp() {
    window.location.href = "/sign-up";
  }

  return (
    <div className="sign-up-success max-w-[500px] text-center mx-auto">
      <div className="header flex flex-col gap-4 items-center">
        <div className="p-6 bg-failedBgColor dark:bg-failedBgColorDark rounded-full">
          <ErrorIcon className="h-auto w-8 fill-failedColor dark:fill-failedColorDark" />
        </div>
        <h2 className="text-2xl mb-2 font-bold text-failedColor dark:text-failedColorDark">
          Internal <br />
          Server Error!
        </h2>
      </div>
      <div className="body mt-8 text-base mobile_lg:text-lg">
        <p>
          An error occurred while processing your request. This could be due to
          a network or server error. <br />
          Please try signing up again.
        </p>
        <button
          onClick={handleBackToSignUp}
          className="block bg-benBlue-lightE dark:bg-benOrange-300 text-benBlue-100 dark:text-benBlue-400 ring-offset-2 focus:ring-2 active:scale-[0.9] ring-offset-benWhite dark:ring-offset-benBlue-400 ring-benBlue-lightD dark:ring-benOrange-300 drop-shadow-sm rounded-xl w-fit py-2 px-8 mx-auto text-center mt-8 font-medium text-base tablet:text-lg duration-100"
        >
          Back to Sign Up
        </button>
      </div>
    </div>
  );
}
