import React from "react";
import { useSelector } from "react-redux";
import { SignUpIcon, MoneyBagIcon, ValidateIcon } from "../../icons";

export default function ProgressIndicator() {
  // Get the current onboardingStage from our redux states store
  const onboardingStage = useSelector((state) => state.ui.userBoardingStage);

  // This returns whether the stage is current, has been completed or not
  const isCurrOrCompltdStage = (stage) => {
    // This holds the stages
    const stages = {
      SIGN_UP: 1,
      VALIDATION: 2,
      VALIDATION_SUCCESS: 2,
      VALIDATION_FAILED: 2,
      ASSET_PURCHASE: 3,
    };

    // If the current stage is less than or equal to the onboarding stage,
    // (ie. the stage is current or has been completed) it returns true, else, false.
    return stages[stage] <= stages[onboardingStage] ? true : false;
  };

  return (
    <div className="progress-indicator w-[250px] mobile_lg:w-[300px] mx-auto">
      <div className="progress-icon">
        <SignUpIcon
          height="40"
          className={`fill-indicatorCheckedLight dark:fill-indicatorCheckedDark h-[35px] mobile:h-[40px]`}
        />
      </div>
      <div
        className={`progress-line ${
          isCurrOrCompltdStage("VALIDATION")
            ? "bg-indicatorCheckedLight dark:bg-indicatorCheckedDark"
            : "bg-indicatorUncheckedLight dark:bg-indicatorUncheckedDark"
        }`}
      ></div>
      <div className="progress-icon">
        <ValidateIcon
          height={`40`}
          className={`${
            isCurrOrCompltdStage("VALIDATION") ||
            isCurrOrCompltdStage("VALIDATION_SUCCESS") ||
            isCurrOrCompltdStage("VALIDATION_FAILED")
              ? "fill-indicatorCheckedLight dark:fill-indicatorCheckedDark"
              : "fill-indicatorUncheckedLight dark:fill-indicatorUncheckedDark"
          } h-[35px] mobile:h-[40px]`}
        />
      </div>
      <div
        className={`progress-line ${
          isCurrOrCompltdStage("ASSET_PURCHASE")
            ? "bg-indicatorCheckedLight dark:bg-indicatorCheckedDark"
            : "bg-indicatorUncheckedLight dark:bg-indicatorUncheckedDark"
        }`}
      ></div>
      <div className="progress-icon">
        <MoneyBagIcon
          height={`40`}
          className={`${
            isCurrOrCompltdStage("ASSET_PURCHASE")
              ? "fill-indicatorCheckedLight dark:fill-indicatorCheckedDark"
              : "fill-indicatorUncheckedLight dark:fill-indicatorUncheckedDark"
          } h-[35px] mobile:h-[40px]`}
        />
      </div>
    </div>
  );
}
