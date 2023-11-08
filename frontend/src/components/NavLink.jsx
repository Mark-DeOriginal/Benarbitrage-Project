import React from "react";

const NavLink = ({ link }) => {
  const pathname = window.location.pathname;

  if (link.hasOption) {
    return (
      <li className="relative group">
        <button className="py-2 px-3 font-medium flex items-center">
          <span className="text-benBlueLight group-hover:text-benBlue-400 dark:text-benBlue-200 dark:group-hover:text-benBlue-100 mobile_lg:duration-300">
            {link.title}
          </span>
          <svg
            height="25"
            viewBox="0 0 48 48"
            width="25"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 fill-benBlueLight group-hover:fill-benBlue-400 dark:fill-benBlue-200 dark:group-hover:fill-benBlue-100 group-hover:rotate-180"
          >
            <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z" />
            <path d="M0-.75h48v48h-48z" fill="none" />
          </svg>
        </button>
        <div
          className={`hidden group-hover:block min-w-[150px] absolute left-0 transition-all duration-300 ease-in-out
                animate-fade-in
              `}
        >
          <ul
            className={`mt-2 p-1 bg-[#f7f7f8] border dark:border-benBlue-lightB drop-shadow-lg rounded-md overflow-hidden dark:bg-benBlue-400`}
          >
            {link.options.map((option, index) => (
              <li key={index}>
                <a
                  href={option.url}
                  className={`block ${
                    pathname === option.url
                      ? "font-bold dark:text-benBlue-100"
                      : ""
                  }text-left py-3 px-3 rounded-md text-benBlue-400 dark:text-benBlue-100 hover:bg-[#e6e6ea] dark:hover:bg-benBlue-lightC mobile_lg:duration-300`}
                >
                  {option.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </li>
    );
  } else {
    return (
      <li>
        <a
          href={link.url}
          className={`py-2 px-3 ${
            pathname === link.url
              ? "font-bold text-benBlue-400 dark:text-benBlue-100"
              : "text-benBlueLight hover:text-benBlue-400 dark:text-benBlue-200 dark:hover:text-benBlue-100 font-medium mobile_lg:duration-300"
          }`}
        >
          {link.title}
        </a>
      </li>
    );
  }
};

export const MobileNavLink = ({ link }) => {
  const pathname = window.location.pathname;

  const toggleOptionsOpen = (element) => {
    const optionsScrollHeight = document.querySelector(".options").scrollHeight;
    const extraHeight = 20;
    const slideHeight = optionsScrollHeight + extraHeight + "px";

    const toggleBtn = element;

    if (toggleBtn) {
      if (toggleBtn.parentElement.classList.contains("opened")) {
        toggleBtn.style.maxHeight = "";
        toggleBtn.style.opacity = "";
        toggleBtn.parentElement.classList.remove("opened");
      } else {
        toggleBtn.style.maxHeight = slideHeight;
        toggleBtn.style.opacity = "1";

        toggleBtn.parentElement.classList.add("opened");
      }
    }
  };

  if (link.hasOption) {
    return (
      <li>
        <button
          onClick={(e) => {
            toggleOptionsOpen(e.target.nextElementSibling);
          }}
          className={`flex w-full justify-between text-left py-2 px-6 font-medium text-benBlueLight dark:text-benBlue-100 hover:bg-benBlue-100 dark:hover:bg-benBlue-lightC rounded-3xl mobile_lg:duration-300`}
        >
          {link.title}
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
            <path d="M0-.75h48v48h-48z" fill="none" />
          </svg>
        </button>
        <div className={`options pl-4 overflow-hidden max-h-0 duration-300`}>
          <ul className="flex flex-col">
            {link.options.map((option, index) => (
              <li key={index}>
                <a
                  href={option.url}
                  className={`${
                    pathname === option.url ? "font-bold" : ""
                  } block text-left py-1 px-6 text-benBlueLight hover:text-benBlue-400 hover:font-medium dark:text-benBlue-200 dark:hover:text-benBlue-100`}
                >
                  {option.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </li>
    );
  } else {
    return (
      <li>
        <a
          href={link.url}
          className={`${
            pathname === link.url ? "font-bold" : "font-medium"
          }  block text-left py-2 px-6 text-benBlueLight dark:text-benBlue-100 hover:bg-benBlue-100 dark:hover:bg-benBlue-lightC rounded-3xl mobile_lg:duration-300`}
        >
          {link.title}
        </a>
      </li>
    );
  }
};

export default NavLink;
