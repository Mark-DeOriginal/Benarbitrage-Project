import React from "react";

export const ModalBg = ({ children, bgClickHandler, className }) => {
  return (
    <div
      onClick={bgClickHandler}
      className={`modal-bg fixed z-[11] top-0 left-0 w-full h-screen overflow-y-scroll bg-[#6a688399] px-2 ${className}`}
    >
      {children}
    </div>
  );
};

export const ModalContent = ({ children }) => {
  return (
    <div className="modal-content drop-shadow-lg rounded-md w-full max-w-[700px] mx-auto overflow-hidden">
      {children}
    </div>
  );
};

export default function Modal({ children, className, bgClickHandler }) {
  return (
    <ModalBg className={className} bgClickHandler={bgClickHandler}>
      <ModalContent>{children}</ModalContent>
    </ModalBg>
  );
}
