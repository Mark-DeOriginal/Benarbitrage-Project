import React from "react";
import { TwitterIcon } from "./icons";
import avatar from "../assets/testimonial-img.jpg";

export const Review = ({ alignment, twitterUsername, children }) => {
  return (
    <div className={`flex flex-col items-center ${alignment}`}>
      <div className="testimonial-header flex gap-2 items-center">
        <TwitterIcon width={`30px`} height={`auto`} />
        <p>{twitterUsername}</p>
      </div>
      <div className="testimonial-body mt-4 text-base tablet:text-lg">
        <p>{children}</p>
      </div>
    </div>
  );
};

export default function ReviewsSection() {
  return (
    <section className="p-6 pt-20 tablet:pt-28 tablet:pb-12 tablet:px-[50px] max-w-[900px] mx-auto">
      <div className="text-benBlue-lightC2 dark:text-benBlue-200 bg-benWhite dark:bg-benBlue-lightC rounded-2xl p-6">
        <div className="testimonial-header flex flex-col gap-2">
          <img
            src={avatar}
            height={70}
            width={70}
            className="rounded-full inline-block"
            alt="image"
          />
          <div>
            <h4 className="name text-xl font-bold dark:text-benOrange-400">
              George Harrison
            </h4>
            <p>MD, CEO, Avid Exchange</p>
          </div>
        </div>
        <div className="testimonial-body mt-8 text-base tablet:text-lg">
          <p>
            "It's really amazing how AI is simplifying and making everything we
            do much easier. From preparing work-out plans to helping us trade
            the financial market. AI has come a long way since it's inception.
            The real heroes are the Mathematicians and AI Engineers who are
            building these Models. Kudos to the Engineers at Benarbitrage for
            such an amazing AI Trading System!"
          </p>
        </div>
        <div className="footer flex gap-2 text-base tablet:text-lg mt-8">
          <TwitterIcon width={`35px`} height={`auto`} />
          <p>@geo_harrison</p>
        </div>
      </div>
    </section>
  );
}
