import React from "react";

export default function Button({ onClick, className, children }) {
  const defaultStyle =
    "bg-benBlue-400 hover:bg-blue-700 text-white py-2 px-4 rounded-3xl font-medium";

  return (
    <button onClick={onClick} className={`${defaultStyle} ${className ?? ""}`}>
      {children}
    </button>
  );
}
