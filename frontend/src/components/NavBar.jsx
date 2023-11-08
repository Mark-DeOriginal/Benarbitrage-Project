import React, { useState, useEffect } from "react";
import { navLinks } from "../constants";
import DarkModeToggle from "./DarkModeToggle";
import LanguageSelector from "./LanguageSelector";
import NavLink, { MobileNavLink } from "./NavLink";
import Logo from "./BenarbitrageLogo";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const pathname = window.location.pathname;

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mobileMenuBg = document.querySelector(".mobile-menu");
    const mobileMenuContent = document.querySelector(".mobile-menu-content");
    if (mobileMenuBg && mobileMenuContent) {
      if (isMobileMenuOpen) {
        mobileMenuBg.style.display = "flex";
        mobileMenuContent.style.display = "block";
      } else {
        mobileMenuContent.style.animation =
          "hide-mobile-menu-content 0.3s ease forwards";

        mobileMenuBg.style.animation = "hide-mobile-menu 0.3s ease forwards";
        setTimeout(() => {
          mobileMenuContent.style.display = "none";
          mobileMenuContent.style.animation = "";

          mobileMenuBg.style.display = "none";
          mobileMenuBg.style.animation = "";
        }, 300);
      }
    }
  }, [isMobileMenuOpen]);

  return (
    <nav className={`w-full fixed top-0 overflow-y-auto top-nav-bar z-10`}>
      <div className="bg-navBarLightBg tablet:px-10 px-6 py-4 fixed w-full z-10 dark:bg-navBarDarkBg text-sm border-b border-navBarBorderLight dark:border-navBarBorderDark backdrop-blur-sm">
        <div className="mx-auto flex justify-between items-center h-[50px]">
          <Logo />
          <div className="flex items-center space-x-2">
            <ul className="hidden laptop:flex items-center">
              {navLinks.map((link, index) => (
                <NavLink key={index} link={link} />
              ))}
            </ul>
            <a
              href="/get-started"
              className="hidden mobile_lg:block bg-benBlue-400 text-benOrange-300 dark:bg-benOrange-400 dark:text-benBlue-400 py-2 px-4 rounded-3xl font-medium hover:bg-benBlueLight dark:hover:bg-benOrange-300 mobile_lg:duration-300"
            >
              Get Started
            </a>
            <a
              href="/login"
              className="hidden mobile_lg:block bg-benBlue-100 dark:bg-benBlue-lightC  text-benBlueLight dark:text-benBlue-100 py-2 px-4 rounded-3xl font-medium  "
            >
              Login
            </a>

            <div className="hidden mobile:flex items-center space-x-2">
              <DarkModeToggle />
              <LanguageSelector extraStyle={`-right-[70%] tablet:right-0`} />
            </div>
            <div className="flex laptop:hidden pl-4" onClick={toggleMenu}>
              <div
                className={`hamburger-menu ${isMobileMenuOpen ? "active" : ""}`}
              >
                <span className="line bg-benBlueLight dark:bg-benBlue-100"></span>
                <span className="line bg-benBlueLight dark:bg-benBlue-100"></span>
                <span className="line bg-benBlueLight dark:bg-benBlue-100"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={(e) => {
          if (e.target == e.currentTarget) {
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }
        }}
        className={`mobile-menu h-screen w-full overflow-y-auto mt-[82px] px-6 tablet:px-10 py-6 tablet:py-10 justify-end items-start`}
      >
        <div
          className={`mobile-menu-content bg-benWhitishBlue drop-shadow-lg rounded-2xl dark:bg-[#3d3c62] w-full min-[560px]:w-[400px] text-base p-3`}
        >
          <ul className="flex flex-col mt-4">
            {navLinks.map((link, index) => (
              <MobileNavLink key={index} link={link} />
            ))}
          </ul>
          <div className="flex flex-col space-y-2 mt-4 text-center">
            <a
              href="/get-started"
              className="block bg-benBlue-400 text-benOrange-300 dark:bg-benOrange-400 dark:text-benBlue-400 py-2 px-4 rounded-3xl font-medium   hover:bg-benBlueLight dark:hover:bg-benOrange-300 mobile_lg:duration-300"
            >
              Get Started
            </a>
            <a
              href="/login"
              className="block bg-benBlue-100 dark:bg-benBlue-lightC text-benBlueLight dark:text-benBlue-100 py-2 px-4 rounded-3xl font-medium"
            >
              Login
            </a>
            <div className="mobile:hidden flex space-x-2 pt-4 justify-center">
              <DarkModeToggle />
              <LanguageSelector extraStyle={`-right-[70%] tablet:right-0`} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
