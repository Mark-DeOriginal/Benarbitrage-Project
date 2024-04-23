import React, { useEffect, useState } from "react";
import { CopyIcon } from "./icons";
import copyToClipboard from "../utilities/copyToClipboard";
import { launchedTokens } from "../constants/launched-tokens";
import { scroller as scroll } from "react-scroll";

export const CopyCABtn = ({ CA }) => {
  const [isCACopied, setIsCACopied] = useState(false);

  const copyCA = (value) => {
    setIsCACopied(true);
    copyToClipboard(value);

    setTimeout(() => {
      setIsCACopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={() => copyCA(CA)}
      className="text-sm tablet:text-base ml-2"
    >
      {isCACopied ? (
        "Copied!"
      ) : (
        <CopyIcon
          className={`fill-benBlue-lightB dark:fill-benBlue-200 w-[18px] active:scale-[0.9]`}
        />
      )}
    </button>
  );
};

export default function TokenLaunch() {
  const hash = window.location.hash;
  const hashContainsTokenName = launchedTokens.hasOwnProperty(
    hash.slice(1, hash.length)
  );

  useEffect(() => {
    setTimeout(() => {
      if (hashContainsTokenName) {
        scroll.scrollTo(window.location.hash, {
          duration: 1000,
          smooth: "easeInOutQuart",
          offset: -120,
        });
      }
    }, 1000);
  }, []);

  const token = () => {
    if (window.location.hash === "") {
      return Object.values(launchedTokens).find((token) => token.isMainToken);
    } else {
      const hashContainsTokenName = launchedTokens.hasOwnProperty(
        hash.slice(1, hash.length)
      );

      if (hashContainsTokenName) {
        const hashContainsLatestToken = launchedTokens[
          hash.slice(1, hash.length)
        ].isLatestToken
          ? true
          : false;
        return hashContainsLatestToken
          ? launchedTokens[hash.slice(1, hash.length)]
          : Object.values(launchedTokens).find((token) => token.isMainToken);
      } else {
        return Object.values(launchedTokens).find((token) => token.isMainToken);
      }
    }
  };

  return (
    <section className="p-6 pt-20 tablet:px-[50px] max-w-[700px] mx-auto text-benBlue-400 dark:text-benBlue-100">
      <div
        name={hashContainsTokenName ? window.location.hash : ""}
        className="p-4 space-y-4 tablet:p-8 border-2 border-benBlue-200 dark:border-benBlue-lightC2 rounded-xl"
      >
        <div className="heading">
          <h2 className="text-sm tablet:text-base bg-benBlue-100 dark:bg-benBlue-lightC2 w-fit py-1 px-3 mb-2 rounded-lg">
            Token launch alert
          </h2>
          <h3 className="dark:text-benOrange-400 text-xl mobile:text-2xl font-bold">
            Our Token is live!
          </h3>
        </div>

        <div className="body space-y-4">
          <div className="row header flex gap-2 items-center mobile_lg:gap-4">
            <img
              src={token().tokenImage}
              className="w-[60px] h-[60px] mobile:w-[80px] mobile:h-[80px] object-cover rounded-full"
              alt="image"
            />
            <div className="name font-bold">
              <h4 className="text-lg mobile:text-xl">{token().tokenName}</h4>
              <span className="text-base mobile:text-lg">{token().ticker}</span>
            </div>
          </div>
          <div className="description text-sm mobile:text-base">
            <p>{token().description}</p>
          </div>
        </div>

        <div className="buy-token">
          <p>You can buy now on</p>
          <div className="links flex items-center gap-2">
            <a
              target="_blank"
              href={
                token().contractAddress === ""
                  ? `${window.location.href}`
                  : `https://www.pump.fun/${token().contractAddress}`
              }
              className="text-sm tablet:text-base bg-benBlue-100 dark:bg-benBlue-lightC2 w-fit py-1 px-3 rounded-lg"
            >
              Pump.fun
            </a>
            <a
              target="_blank"
              href={
                token().contractAddress === ""
                  ? `${window.location.href}`
                  : `https://www.raydium.io/swap/?outputCurrency=${
                      token().contractAddress
                    }`
              }
              className="text-sm tablet:text-base bg-benBlue-100 dark:bg-benBlue-lightC2 w-fit py-1 px-3 rounded-lg"
            >
              Raydium
            </a>
            <CopyCABtn
              CA={
                token().contractAddress === ""
                  ? "Will be updated soon. Please wait and try again."
                  : token().contractAddress
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
