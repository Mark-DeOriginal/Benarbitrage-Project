import React from "react";

const Caret = ({ className }) => {
  return (
    <svg
      height="25"
      viewBox="0 0 48 48"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z" />
      <path d="M0-.75h48v48h-48z" fill="none" />
    </svg>
  );
};

export default Caret;
