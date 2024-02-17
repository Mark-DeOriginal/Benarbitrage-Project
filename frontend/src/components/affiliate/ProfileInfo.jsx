import React, { useState } from "react";
import { refAuthInputFields } from "../auth/constants/inputFields";
import {
  EditIcon,
  HidePasswordIcon,
  ShowPasswordIcon,
  SuccessIcon,
} from "../icons";
import getReferrerDetails from "../../utilities/getReferrerDetails";
import updateReferrerInfo from "../../utilities/updateReferrerInfo";

export const EditableField = ({
  fieldName,
  fieldLabel,
  fieldType,
  fieldValue,
}) => {
  const [profileData, setProfileData] = useState(fieldValue);
  const [info, setInfo] = useState({
    isError: false,
    errMsg: "",
  });

  const handleChange = (e) => {
    const fieldValue = e.target.value;

    setProfileData(fieldValue);

    setInfo({
      ...info,
      isError: false,
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordVisibility = showPassword ? "text" : "password";

  const [isEditMode, setIsEditMode] = useState(false);

  const elementToEdit = document.querySelector(`input[name="${fieldName}"]`);
  const setEditMode = () => {
    setIsEditMode(true);
    if (elementToEdit) {
      setTimeout(() => {
        elementToEdit.focus();
      }, 500);
    }
  };

  const handleLoseFocus = () => {
    setTimeout(() => {
      setIsEditMode(false);
    }, 200);
  };

  const saveProfileInfo = () => {
    if (fieldName === "email" && profileData.trim() === "") {
      setInfo({
        ...info,
        isError: true,
        errMsg: "Email address is required.",
      });
    } else if (
      fieldName === "email" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData) == false
    ) {
      setInfo({
        ...info,
        isError: true,
        errMsg: "Invalid email address.",
      });
    } else if (profileData.trim() === "") {
      setInfo({
        ...info,
        isError: true,
        errMsg: "This field is required.",
      });
    } else {
      setIsEditMode(false);
      updateReferrerInfo(fieldName, profileData).catch(() => {
        setEditMode();
      });
    }
  };

  return (
    fieldType !== "checkbox" &&
    fieldName !== "confirmPassword" && (
      <div className="input-wrapper flex flex-col gap-1">
        <label className="px-4 text-benBlue-lightD">{fieldLabel}</label>
        <div className="input relative">
          <input
            type={fieldName === "password" ? passwordVisibility : fieldType}
            name={fieldName}
            value={profileData}
            onChange={handleChange}
            onBlur={() => handleLoseFocus()}
            placeholder={fieldLabel}
            disabled={isEditMode ? false : true}
            className={`focus:ring-2 ring-benBlue-lightD dark:ring-benBlue-200/40 ${
              isEditMode ? "bg-white dark:bg-transparent" : "bg-transparent"
            } drop-shadow-sm rounded-2xl px-4 py-3 w-full text-base mobile_lg:text-lg border ${
              info.isError
                ? "border-errorColor dark:border-errorColor"
                : "border-navBarBorderLight dark:border-benBlue-lightC"
            }`}
          />

          <div className="absolute right-0 top-[25%] bottom-[25%] flex gap-3 items-center mr-4 pl-12 bg-gradient-to-l from-[#ededf2] dark:from-[#3d3c62] to-transparent">
            {isEditMode ? (
              <button
                className="save-profile-btn"
                onClick={() => saveProfileInfo()}
              >
                <SuccessIcon className="h-auto w-[18px] fill-benBlue-lightD cursor-pointer active:scale-[0.95] select-none" />
              </button>
            ) : (
              <button
                className="edit-profile-btn"
                onClick={(e) => {
                  setEditMode();
                }}
              >
                <EditIcon className="h-auto w-[18px] fill-benBlue-lightD cursor-pointer active:scale-[0.95] select-none" />
              </button>
            )}

            {fieldName === "password" && (
              <div
                onClick={toggleShowPassword}
                className="eye-toggle select-none"
              >
                {showPassword ? (
                  <HidePasswordIcon className="h-auto w-[22px] fill-benBlue-lightD cursor-pointer active:scale-[0.95] select-none" />
                ) : (
                  <ShowPasswordIcon className="h-auto w-[22px] fill-benBlue-lightD cursor-pointer active:scale-[0.95] select-none" />
                )}
              </div>
            )}
          </div>
        </div>
        {
          // If there's an error, render the <p> element with the error message
          info.isError && (
            <p className="message text-left px-4 text-sm mobile_lg:text-base text-errorColor">
              {info.errMsg}
            </p>
          )
        }
      </div>
    )
  );
};

export default function ProfileInformation() {
  const [profileData, setProfileData] = useState({
    name: getReferrerDetails("name", "John Doe"),
    email: getReferrerDetails("email", "johndoe@gmail.com"),
    phone: getReferrerDetails("phone", "0803222246"),
    usdtTronWallet: getReferrerDetails("usdtTronAddress", "Not yet provided"),
    password: getReferrerDetails("password", "johndoe99"),
  });

  return (
    <>
      {refAuthInputFields.map((input, index) => (
        <EditableField
          key={index}
          fieldLabel={input.placeholder}
          fieldName={input.name}
          fieldType={input.type}
          fieldValue={profileData[input.name]}
        />
      ))}
    </>
  );
}
