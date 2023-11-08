import React from "react";
import {
  AccessibilityIcon,
  CustomerSupportIcon,
  SmoothTransactionsIcon,
  EaseOfUseIcon,
  SecurityIcon,
  LowFeesIcon,
} from "./icons";

export default function WhyChooseUsSection() {
  return (
    <section className="p-6 pt-20 tablet:pt-28 tablet:pb-12 tablet:px-[50px] max-w-[900px] mx-auto">
      <img
        src="/src/assets/trading-chart-img-4.jpg"
        className="w-full h-[200px] tablet:h-[300px] rounded-2xl object-cover brightness-150"
        alt="image"
      />

      <div className="p-2 pt-10 tablet:pt-20 tablet:pb-12 tablet:px-[30px]">
        <h2 className="text-3xl tablet:text-5xl font-extrabold text-benBlue-400 dark:text-benOrange-400 !leading-tight">
          Why Traders Choose Benarbitrage!
        </h2>
        <div className="mt-10 text-lg tablet:text-xl text-benBlue-lightC2 dark:text-benBlue-200 flex flex-col gap-6">
          <div className="flex flex-col tablet:flex-row gap-8">
            <div className="flex-1">
              <div className="bg-benBlue-100 dark:bg-benBlue-lightC p-4 rounded-2xl w-[120px] mb-4">
                <EaseOfUseIcon fillColor="fill-benBlue-400 dark:fill-benBlue-lightD" />
              </div>
              <h4 className="text-benBlue-400 dark:text-benOrange-400 font-bold mb-2">
                Ease of Use
              </h4>
              <p>
                We prioritize a seamless user experience. Our clean and
                intuitive UI makes trading operations easy and efficient.
              </p>
            </div>
            <div className="flex-1">
              <div className="bg-benBlue-100 dark:bg-benBlue-lightC p-4 rounded-2xl w-[120px] mb-4">
                <AccessibilityIcon fillColor="fill-benBlue-400 dark:fill-benBlue-lightD" />
              </div>
              <h4 className="text-benBlue-400 dark:text-benOrange-400 font-bold mb-2">
                Accessibility
              </h4>
              <p>
                Our platform provides seamless access from any device, ensuring
                you have access to your account wherever you are.
              </p>
            </div>
          </div>
          <div className="flex flex-col tablet:flex-row gap-6">
            <div className="flex-1">
              <div className="bg-benBlue-100 dark:bg-benBlue-lightC p-4 rounded-2xl w-[120px] mb-4">
                <SecurityIcon fillColor="fill-benBlue-400 dark:fill-benBlue-lightD" />
              </div>
              <h4 className="text-benBlue-400 dark:text-benOrange-400 font-bold mb-2">
                Security
              </h4>
              <p>
                Benarbitrage uses dSET, an advanced AI encryption system, to
                protect and safeguard your account and transactions.
              </p>
            </div>
            <div className="flex-1">
              <div className="bg-benBlue-100 dark:bg-benBlue-lightC p-4 rounded-2xl w-[120px] mb-4">
                <SmoothTransactionsIcon fillColor="fill-benBlue-400 dark:fill-benBlue-lightD" />
              </div>
              <h4 className="text-benBlue-400 dark:text-benOrange-400 font-bold mb-2">
                Smooth Transactions
              </h4>
              <p>
                Our secure and streamlined transaction process ensures that your
                transactions are executed swiftly and without any hitches.
              </p>
            </div>
          </div>
          <div className="flex flex-col tablet:flex-row gap-6">
            <div className="flex-1">
              <div className="bg-benBlue-100 dark:bg-benBlue-lightC p-4 rounded-2xl w-[120px] mb-4">
                <LowFeesIcon fillColor="fill-benBlue-400 dark:fill-benBlue-lightD" />
              </div>
              <h4 className="text-benBlue-400 dark:text-benOrange-400 font-bold mb-2">
                Low Fees
              </h4>
              <p>
                We've optimized our fee structure and reduced our transaction
                costs, ensuring you get maximum value from your trades.
              </p>
            </div>
            <div className="flex-1">
              <div className="bg-benBlue-100 dark:bg-benBlue-lightC p-4 rounded-2xl w-[120px] mb-4">
                <CustomerSupportIcon fillColor="fill-benBlue-400 dark:fill-benBlue-lightD" />
              </div>
              <h4 className="text-benBlue-400 dark:text-benOrange-400 font-bold mb-2">
                Customer Support
              </h4>
              <p>
                Our dedicated Customer Support team is available around the
                clock to provide you with the necessary assistance and support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
