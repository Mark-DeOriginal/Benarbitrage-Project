import React from "react";
import { SuccessIcon } from "../../../icons";
import getCookie from "../../../../utilities/getCookie";
import setCookie from "../../../../utilities/setCookie";

export default function SignUpSuccess() {
  function handleProceed() {
    setCookie("onboardingStage", "VALIDATION");
    location.reload();
  }

  return (
    <div className="sign-up-success max-w-[500px] text-center mx-auto">
      <div className="header flex flex-col gap-4 items-center">
        <div className="p-6 bg-successBgColor dark:bg-successBgColorDark rounded-full">
          <SuccessIcon className="h-auto w-8 fill-successColor dark:fill-successColorDark" />
        </div>
        <h2 className="text-2xl mb-2 font-bold text-successColor dark:text-successColorDark">
          Account Created <br />
          Successfully!
        </h2>
      </div>
      <div className="body mt-8 text-base mobile_lg:text-lg">
        <p>
          Hi, {getCookie("userName", "John Doe")}. <br />
          Your Benarbitrage account was created successfully. Proceed to account
          validation.
        </p>
        <button
          onClick={handleProceed}
          className="block bg-benBlue-lightE text-benBlue-100 ring-offset-2 focus:ring-2 active:scale-[0.9] ring-benBlue-lightD drop-shadow-sm rounded-2xl w-fit py-3 px-12 mx-auto text-center mt-8 font-medium duration-200"
        >
          Proceed
        </button>
      </div>
    </div>
  );
}
