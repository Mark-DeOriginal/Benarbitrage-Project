import React from "react";
import logoLightMode from "../assets/logo-light-mode.svg";
import logoDarkMode from "../assets/logo-dark-mode.svg";
import { useSelector } from "react-redux";

export default function Logo() {
  const darkMode = useSelector((state) => state.ui.isDarkMode);
  return (
    <div className="flex items-center">
      <a href="/">
        <img
          src={logoDarkMode}
          alt="Logo"
          width={200}
          height={200}
          loading="eager"
          className={`block ${darkMode !== true ? "hidden" : ""}`}
        />
        <img
          src={logoLightMode}
          alt="Logo"
          width={200}
          height={200}
          loading="eager"
          className={`${darkMode == false ? "block" : "hidden"}`}
        />
      </a>
    </div>
  );
}
