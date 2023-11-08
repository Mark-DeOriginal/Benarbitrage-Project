import React from "react";
import CopyRight from "../../Copyright";
import SignUp from "./SignUp";
import { useSelector } from "react-redux";
import SignUpSuccess from "./action messages/SignUpSuccess";
import ProgressIndicator from "./ProgressIndicator";
import deleteAllCookies from "../../../utilities/deleteCookies";
import AccountValidation from "./AccountValidation";
import SignUpFailed from "./action messages/SignUpFailed";
import ValidationFailed from "./action messages/ValidationFailed";
import ValidationSuccess from "./action messages/ValidationSuccess";
import AssetPurchase from "./AssetPurchase";
import Login from "./Login";

export default function BoardingSection({ view }) {
  const onboardingStage = useSelector((state) => state.ui.userBoardingStage);

  // We'll call this function whenever we want to delete our cookies from the User's browser
  // deleteAllCookies();

  return (
    <div className="boarding-section column flex flex-col justify-between basis-2/3 p-6 tablet:px-[50px] dark:bg-benDarkBlueLight text-benBlue-lightB dark:text-benBlue-200">
      <div className="body-wrapper text-sm mobile:text-base">
        {view === "LOGIN" ? (
          <Login />
        ) : (
          <>
            <div className="progress-indicator-wrapper">
              <ProgressIndicator />
            </div>
            <div className="boarding my-8">
              {onboardingStage === "SIGN_UP_SUCCESS" ? (
                <SignUpSuccess />
              ) : onboardingStage === "SIGN_UP_FAILED" ? (
                <SignUpFailed />
              ) : onboardingStage === "VALIDATION" ? (
                <AccountValidation />
              ) : onboardingStage === "VALIDATION_SUCCESS" ? (
                <ValidationSuccess />
              ) : onboardingStage === "VALIDATION_FAILED" ? (
                <ValidationFailed />
              ) : onboardingStage === "ASSET_PURCHASE" ? (
                <AssetPurchase />
              ) : (
                <SignUp />
              )}
            </div>
          </>
        )}
      </div>
      <div className="footer-wrapper mt-16 text-center">
        <footer>
          <CopyRight />
        </footer>
      </div>
    </div>
  );
}
