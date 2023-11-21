import React from "react";
import "../styles/loading-spinner.css";

export default function LoadingSpinner({ color }) {
  return (
    <svg
      className={`spinner`}
      width="50px"
      height="50px"
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="path"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        stroke={color || "#63618b"}
        cx="33"
        cy="33"
        r="30"
      ></circle>
    </svg>
  );
}
