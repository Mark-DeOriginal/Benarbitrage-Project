import React, { useState, useEffect } from "react";
import { CaretIcon } from "./icons";
import frenchFlag from "../assets/france-flag.svg";
import usFlag from "../assets/us-flag.svg";
import ukFlag from "../assets/uk-flag.svg";

export const Flag = ({ flagName }) => {
  return (
    <img
      src={
        flagName === "us"
          ? usFlag
          : flagName === "uk"
          ? ukFlag
          : flagName === "france"
          ? frenchFlag
          : usFlag
      }
      alt={flagName}
      width={25}
      height={25}
    />
  );
};

const LanguageSelector = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".language-selector")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const languages = ["en-UK", "en-US", "fr-France"];

  return (
    <div className="relative language-selector">
      <button
        className="py-1 px-1 border border-benBlue-200 dark:border-benBlue-lightB rounded-full flex items-center active:scale-[0.95]"
        onClick={toggleDropdown}
      >
        <Flag flagName={selectedLanguage.split("-")[1].toLowerCase()} />
        <CaretIcon className={`fill-benBlue-300`} />
      </button>
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } p-1 w-[150px] absolute mt-2 bg-[#f7f7f8] border rounded-md drop-shadow-lg flex-col gap-[2px] ${className}`}
      >
        {languages.map((language, index) => (
          <button
            key={index}
            className={`text-left py-3 rounded-md px-3 w-full flex gap-2 items-center text-benBlue-400 ${
              selectedLanguage === language
                ? "bg-[#e6e6ea]"
                : "hover:bg-benWhitishBlue"
            } duration-300`}
            onClick={() => handleLanguageChange(language)}
          >
            <Flag flagName={language.split("-")[1].toLowerCase()} />
            {language}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
