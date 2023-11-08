import React, { useState } from "react";
import { accountTypes } from "../../../constants";
import getCookie from "../../../utilities/getCookie";

export default function AccountValidation() {
  const [selectedAccType, setSelectedAccType] = useState("Standard");

  const handleSelection = (selected) => {
    setSelectedAccType(selected);
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleAccValidation = async () => {
    try {
      setIsLoading(true);

      const processFormData = await fetch(
        "https://p0xq2gpd-5174.uks1.devtunnels.ms/user/set_account_type",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: getCookie("userEmail"),
            account_type: selectedAccType,
          }),
        }
      );

      // If the form was processed successfully,
      if (processFormData.ok) {
        const response = await processFormData.json();
        console.log(response);

        // Set this cookie in the User's browser
        document.cookie = "onboardingStage=VALIDATION_SUCCESS; path=/;";

        // Then reload the page
        location.reload();
      } else {
        setIsLoading(false);
        const response = await processFormData.json();
        console.log(response.messageType + ": " + response.error);
        document.cookie = "onboardingStage=VALIDATION_FAILED; path=/;";

        location.reload();
        throw new Error(response.messageType);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="account-validation text-base">
      <div className="header text-center max-w-[400px] mx-auto">
        <h2 className="text-2xl mb-2 font-bold text-benBlue-400 dark:text-benOrange-400">
          Account Validation
        </h2>
        <p>
          To validate your account, please choose the account type that best
          fits your need.
        </p>
      </div>
      <div className="body mt-8">
        <div className="account-types-wrapper text-center flex flex-col tablet:flex-row screen980:flex-col screen1240:flex-row gap-3 text-sm">
          {accountTypes.map((type, index) => (
            <div
              key={index}
              onClick={() => handleSelection(type.name)}
              className={`account-type active:scale-95 select-none w-[280px] mx-auto screen980:w-[400px] tablet:w-[33.3%] screen1240:w-[33.3%] cursor-pointer dark:border-benBlue-lightB ${
                type.name === selectedAccType
                  ? "ring-2 ring-benBlue-lightD dark:ring-benOrange-300"
                  : "border border-benBlue-100 dark:border-benBlue-lightC2"
              } rounded-2xl p-4 pt-6 bg-benWhite dark:bg-transparent`}
            >
              <div className="header">
                <h3
                  className={`font-bold text-xl mb-4 ${
                    type.name === selectedAccType
                      ? "dark:text-benOrange-300"
                      : ""
                  }`}
                >
                  {type.name}
                  <br />
                  <span className="divider mt-4 max-w-[50px] mx-auto h-[4px] bg-benBlue-100 dark:bg-benBlue-lightC2 block rounded-2xl"></span>
                </h3>
              </div>
              <div className="body flex flex-col gap-2">
                <div className="row">
                  <h4>Least trade</h4>
                  <p
                    className={`text-xl font-bold ${
                      type.name === selectedAccType
                        ? "dark:text-benOrange-300"
                        : ""
                    }`}
                  >
                    {type.least_trade}
                  </p>
                </div>
                <div className="row">
                  <h4>Trading speed</h4>
                  <p
                    className={`trading-bonus text-2xl font-bold ${
                      type.name === selectedAccType
                        ? "dark:text-benOrange-300"
                        : ""
                    }`}
                  >
                    {type.trading_speed}
                  </p>
                </div>

                {type.isMostPopular && (
                  <div className="most-popular mt-4 text-xs w-fit mx-auto bg-benBlue-lightD dark:bg-benOrange-300 text-benWhite dark:text-benBlue-lightB py-[2px] px-[8px] rounded-md">
                    <p>Most Popular</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleAccValidation}
          className="block bg-benBlue-lightE text-benBlue-100 ring-offset-2 focus:ring-2 active:scale-[0.9] ring-benBlue-lightD drop-shadow-sm rounded-2xl w-fit py-3 px-12 mx-auto text-center mt-8 font-medium duration-200"
        >
          {isLoading ? "Validating" : "Validate"}
        </button>
      </div>
    </div>
  );
}
