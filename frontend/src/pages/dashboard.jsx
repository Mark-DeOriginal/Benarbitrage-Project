import React from "react";
import PersuadeSection from "../components/views/onboarding/PersuadeSection";

export default function UserDashboard() {
  return (
    <>
      <section className="get-started-section">
        <div className="row relative flex flex-col min-[980px]:flex-row min-h-screen text-benBlue-400 dark:text-benBlue-200 text-base mobile_lg:text-lg">
          <PersuadeSection />
          <h2>Dashboard</h2>
        </div>
      </section>
    </>
  );
}
