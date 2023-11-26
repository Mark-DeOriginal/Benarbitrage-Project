import React from "react";
import logoLightMode from "../assets/logo-light-mode.svg";
import logoDarkMode from "../assets/logo-dark-mode.svg";
import { useSelector } from "react-redux";

export default function Logo({ mode }) {
  const darkMode = useSelector((state) => state.ui.isDarkMode);
  return (
    <div className="flex items-center">
      <a href="/">
        {mode === "light" ? (
          <img
            src={logoLightMode}
            alt="Logo"
            width={200}
            height={200}
            loading="eager"
          />
        ) : mode === "dark" ? (
          <img
            src={logoDarkMode}
            alt="Logo"
            width={200}
            height={200}
            loading="eager"
          />
        ) : (
          <>
            <img
              src={logoDarkMode}
              alt="Logo"
              width={200}
              height={200}
              loading="eager"
              className={`block ${darkMode == false ? "hidden" : ""}`}
            />
            <img
              src={logoLightMode}
              alt="Logo"
              width={200}
              height={200}
              loading="eager"
              className={`${darkMode == false ? "block" : "hidden"}`}
            />
          </>
        )}
      </a>
    </div>
  );
}
