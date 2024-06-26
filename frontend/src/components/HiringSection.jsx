import React from "react";
import happyCoderImg from "../assets/happy-coder.jpg";

export default function HiringSection() {
  return (
    <section className="px-6 py-[60px] tablet:p-[60px] bg-[#dfd0bb] flex flex-col laptop:flex-row laptop:items-center gap-10">
      <img
        src={happyCoderImg}
        className="w-full mobile_lg:w-[400px] h-[200px] tablet:h-[300px] rounded-2xl object-cover"
        alt="image"
      />

      <div className="pt-4 max-lg:pt-0">
        <h2 className="text-xl font-medium text-benBlue-lightB mb-2">
          We are hiring!
        </h2>
        <h3 className="text-2xl tablet:text-3xl font-extrabold text-benBlue-400 !leading-tight">
          Are you a Professional and Talented AI/ML Engineer? We'd like to have
          you in our team.
        </h3>
        <div className="mt-8 text-base tablet:text-xl text-benBlue-lightC2">
          <p>
            We love diversity and consider applications from every part of the
            world, regardless of race, gender, religion and ethnicity.
          </p>

          <p>
            Send an application to{" "}
            <a
              href="mailto:hr@benaritrage.com"
              className="border-b border-dotted border-benBlue-lightE"
            >
              hr@benarbitrage.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
