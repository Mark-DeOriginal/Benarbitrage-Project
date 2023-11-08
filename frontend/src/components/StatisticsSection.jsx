import React from "react";
import { statistics } from "../constants";

export default function StatisticsSection() {
  return (
    <section className="p-8 tablet:py-12 tablet:px-[50px] mt-20 flex gap-10 justify-center items-center mobile_lg:items-start flex-col mobile_lg:flex-row flex-wrap">
      {statistics.map((stat, index) => (
        <div className="text-center" key={index}>
          <p className="text-4xl mobile_lg:text-5xl font-bold text-benBlue-400 dark:text-benBlue-200">
            {stat.figure}
          </p>

          <h3 className="text-lg mobile_lg:text-2xl text-benBlue-lightD font-medium">
            {stat.title}
          </h3>
        </div>
      ))}
    </section>
  );
}
