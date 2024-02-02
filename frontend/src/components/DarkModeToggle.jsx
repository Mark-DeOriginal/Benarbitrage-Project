import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux-states/uiSlice";

const DarkModeToggle = () => {
  const darkMode = useSelector((state) => state.ui.isDarkMode);
  const dispatch = useDispatch();

  const toggleDark = () => {
    dispatch(toggleDarkMode());
    document.documentElement.classList.toggle("dark");

    const metaTagThemeColor = document.querySelector(
      'meta[name="theme-color"]'
    );

    const themeColor = darkMode == true ? "#eeeef1" : "#434172";

    if (metaTagThemeColor) {
      metaTagThemeColor.setAttribute("content", themeColor);
    }

    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("isDarkMode", "true");
    } else {
      localStorage.setItem("isDarkMode", "false");
    }
  };

  return (
    <button
      onClick={toggleDark}
      className="border border-benBlue-200 dark:border-benBlue-lightB p-2 rounded-full w-[37px] h-[37px] flex items-center justify-center text-lg active:scale-[0.95]"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
};

export default DarkModeToggle;
