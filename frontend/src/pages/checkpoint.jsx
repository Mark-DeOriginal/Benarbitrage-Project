import React from "react";
import checkPointImage from "../assets/checkpoint-image.png";

export default function CheckPointPage() {
  return (
    <section className="p-6 pt-[130px] tablet:pt-[150px] pb-12 tablet:px-[50px] flex flex-col mobile_lg:flex-row max-w-[900px] mx-auto">
      <div className="img flex-none">
        <img
          src={checkPointImage}
          className="w-auto h-[120px] mobile_lg:h-[150px]"
          alt="image"
        />
      </div>
      <div className="p-2 pt-5 tablet:pb-12 tablet:px-[30px]">
        <h2 className="text-2xl mobile:text-4xl font-bold text-benBlue-400 dark:text-benOrange-400">
          Checkpoint
        </h2>
        <div className="mt-6 text-lg tablet:text-xl text-benBlue-lightC dark:text-benBlue-200 mb-2">
          <p>
            It appears that you are trying to access Benarbitrage from a region
            we don't currently serve.
          </p>
          <p>
            We appreciate your interest in our platform and wish to let you know
            that we're actively expanding and hope to be able to serve your
            region soon.
          </p>
        </div>
      </div>
    </section>
  );
}
