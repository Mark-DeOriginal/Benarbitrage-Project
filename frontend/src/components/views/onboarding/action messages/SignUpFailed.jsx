import React from "react";
import { ErrorIcon, SuccessIcon } from "../../../icons";
import setCookie from "../../../../utilities/setCookie";

export default function SignUpFailed() {
  function handleBackToSignUp() {
    setCookie("onboardingStage", "SIGN_UP");
    location.reload();
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
          className="block bg-benBlue-lightE text-benBlue-100 ring-offset-2 focus:ring-2 active:scale-[0.9] ring-benBlue-lightD drop-shadow-sm rounded-2xl w-fit py-3 px-12 mx-auto text-center mt-8 font-medium duration-200"
        >
          Back to Sign Up
        </button>
      </div>
    </div>
  );
}
