import React from "react";
import Logo from "./BenarbitrageLogo";
import LanguageSelector from "./LanguageSelector";
import DarkModeToggle from "./DarkModeToggle";
import CopyRight from "./Copyright.jsx";

export default function SimpleLayout({ children }) {
  return (
    <>
      <nav className="bg-navBarLightBg dark:bg-navBarDarkBg border-b border-navBarBorderLight dark:border-navBarBorderDark tablet:px-10 px-6 py-4 fixed top-0 left-0 z-10 w-full backdrop-blur-sm">
        <div className="wrapper relative flex space-x-2 justify-between mobile_lg:justify-center items-center h-[50px]">
          <Logo />
          <div className="left hidden mobile_lg:block absolute left-0">
            <LanguageSelector className={`left-0`} />
          </div>
          <div className="right mobile_lg:absolute right-0">
            <DarkModeToggle />
          </div>
        </div>
      </nav>
      <div className="boarding-section flex flex-col justify-between basis-2/3 p-6 tablet:px-[50px] text-benBlue-lightB dark:text-benBlue-200">
        <div className="body-wrapper text-sm mobile:text-base">{children}</div>
        <div className="footer-wrapper mt-16 text-center">
          <footer>
            <CopyRight />
          </footer>
        </div>
      </div>
    </>
  );
}
