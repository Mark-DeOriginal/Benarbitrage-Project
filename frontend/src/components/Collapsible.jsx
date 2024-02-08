import React from "react";

export default function Collapsible({ title, children }) {
  const toggleOptionsOpen = (collapsible) => {
    const collapsibleScrollHeight = collapsible.scrollHeight;
    const extraHeight = 20;
    const slideHeight = collapsibleScrollHeight + extraHeight + "px";

    const collapsibleContent = collapsible;

    if (collapsibleContent) {
      if (collapsibleContent.parentElement.classList.contains("opened")) {
        collapsibleContent.style.maxHeight = "";
        collapsibleContent.style.opacity = "0";
        collapsibleContent.parentElement.classList.remove("opened");
      } else {
        collapsibleContent.style.maxHeight = slideHeight;
        collapsibleContent.style.opacity = "1";

        collapsibleContent.parentElement.classList.add("opened");
      }
    }
  };

  return (
    <div className="collapsible">
      <button
        onClick={(e) => {
          toggleOptionsOpen(e.target.nextElementSibling);
        }}
        className={`flex w-full justify-between px-4 py-4 mobile_lg:px-6 text-base mobile_lg:text-lg laptop:text-xl font-bold bg-benBlue-light dark:bg-benBlue-lightC rounded-xl`}
      >
        {title}
        <svg
          onClick={(e) => {
            toggleOptionsOpen(e.target.parentElement.nextElementSibling);
          }}
          height="25"
          viewBox="0 0 48 48"
          width="25"
          xmlns="http://www.w3.org/2000/svg"
          className={`caret fill-benBlueLight dark:fill-benBlue-200 transition-transform duration-300`}
        >
          <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z" />
        </svg>
      </button>
      <div
        className={`content-wrapper px-2 mobile_lg:px-6 overflow-hidden max-h-0 duration-500`}
      >
        {children}
      </div>
    </div>
  );
}
