import React from "react";
import AssetsList from "./AssetsList";

export default function AssetPurchase() {
  return (
    <div className="sign-up">
      <div className="header font-medium">
        <h2 className="text-2xl mb-2 font-bold text-benBlue-400 dark:text-benOrange-400 text-center">
          Place Trade
        </h2>
      </div>
      <div className="body mt-8">
        <div className="wrapper flex flex-col tablet:flex-row screen980:flex-col screen1240:flex-row justify-stretch items-stretch gap-4">
          <div className="row assets border border-navBarBorderLight dark:border-navBarBorderDark w-full tablet:w-[60%] screen980:w-full screen1240:w-[60%] order-2 tablet:order-1 screen980:order-2 screen1240:order-1 rounded-2xl">
            <div className="header py-2 px-6 border-b border-navBarBorderLight dark:border-navBarBorderDark">
              <h3 className="font-medium text-lg tablet:text-xl">Assets</h3>
            </div>
            <div className="assets-wrapper p-[10px] pt-6">
              <AssetsList />
            </div>
          </div>
          <div className="row selected-asset border border-navBarBorderLight dark:border-navBarBorderDark w-full tablet:w-[40%] screen980:w-full screen1240:w-[40%] order-1 tablet:order-2 screen980:order-1 screen1240:order-2 rounded-2xl">
            <div className="header py-2 px-6 border-b border-navBarBorderLight dark:border-navBarBorderDark">
              <h3 className="font-medium text-lg tablet:text-xl">
                Selected asset
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
