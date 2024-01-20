import React from "react";
import CopyRight from "./Copyright";
import logoWhite from "../assets/logo-white.svg";
import { footerLinks } from "../constants";
import { EmailIcon, HomeIcon } from "./icons";

export const Logo = () => {
  return (
    <img src={logoWhite} alt="Logo" width={180} height={180} loading="eager" />
  );
};

export default function Footer() {
  return (
    <footer className="p-6 pt-8 tablet:p-[60px] tablet:pb-8 bg-[#373659] text-benBlue-200 text-base tablet:text-lg">
      <div className="row mb-12 flex flex-col mobile_lg:flex-row gap-8 mobile_lg:gap-12">
        <div className="column disclaimer space-y-6 max-w-[460px]">
          <Logo />
          <p className="text-xs tablet:text-sm">
            We are very optimistic of the capabilities of our AI Trading System
            and it's ability to trade the financial market and return profits
            for our users. However, market forces and other circumstances which
            are beyond the control of our AI Systems may influence trade
            profits, price of assets and duration of trades.
          </p>
        </div>
        <div className="column text-base flex-1">
          <div className="row flex flex-col mobile_lg:flex-row gap-8 justify-between ">
            {footerLinks.map((categories, index) => (
              <div
                key={index}
                className={`column space-y-2 mobile_lg:space-y-6 ${
                  categories.category === "Contact"
                    ? "mobile_lg:max-w-[250px]"
                    : ""
                }`}
              >
                <h2 className="header font-bold">{categories.category}</h2>
                <div className="content flex flex-col gap-2 ">
                  {categories.links?.map((link, index) => (
                    <a href={link.url} key={index} className="hover:underline">
                      {link.content}
                    </a>
                  ))}
                  {categories.info?.map((info, index) =>
                    info.type === "address" ? (
                      <div key={index} className="flex gap-3 items-start">
                        <HomeIcon
                          className={`fill-benBlue-200 w-[20px] flex-none mt-1`}
                        />
                        <p>{info.content}</p>
                      </div>
                    ) : info.type === "email" ? (
                      <div key={index} className="flex gap-3 items-center">
                        <EmailIcon
                          className={`fill-benBlue-200 w-[18px] flex-none`}
                        />
                        <p>{info.content}</p>
                      </div>
                    ) : (
                      ""
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CopyRight />
    </footer>
  );
}
