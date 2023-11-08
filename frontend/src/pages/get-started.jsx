import React from "react";
import PersuadeSection from "../components/views/onboarding/PersuadeSection";
import BoardingSection from "../components/views/onboarding/BoardingSection";

export default function GetStartedSection() {
  return (
    <>
      <section className="get-started-section">
        <div className="row relative flex flex-col min-[980px]:flex-row min-h-screen text-benBlue-400 dark:text-benBlue-200 text-base mobile_lg:text-lg">
          <PersuadeSection />
          <BoardingSection />
        </div>
      </section>
    </>
  );
}
