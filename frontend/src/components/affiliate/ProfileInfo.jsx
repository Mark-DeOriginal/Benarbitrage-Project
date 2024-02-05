import React, { useState } from "react";
import { refAuthInputFields } from "../auth/constants/inputFields";
import { EditIcon, HidePasswordIcon, ShowPasswordIcon } from "../icons";
import getReferrerDetails from "../../utilities/getReferrerDetails";

export default function ProfileInformation() {
  const [profileData, setProfileData] = useState({
    name: getReferrerDetails("name", "John Doe"),
    email: getReferrerDetails("email", "johndoe@gmail.com"),
    phone: getReferrerDetails("phone", "0803222246"),
    usdtTronWallet: getReferrerDetails("usdtTronAddress", "Sswe233dsdgsdfs"),
    password: getReferrerDetails("password", "johndoe99"),
  });

  const [profileInfo, setProfileInfo] = useState({
    name: {
      isError: false,
      errMsg: "",
      justUpdated: false,
    },
    email: {
      isError: false,
      errMsg: "",
      justUpdated: false,
    },
    phone: {
      isError: false,
      errMsg: "",
      justUpdated: false,
    },
    usdtTronWallet: {
      isError: false,
      errMsg: "",
      justUpdated: false,
    },
    password: {
      isError: false,
      errMsg: "",
      justUpdated: false,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfileData({
      ...profileData,
      [name]: value,
    });

    setProfileInfo({
      ...profileInfo,
      [name]: {
        ...name,
        isError: false,
      },
    });
  };

  const [isUpdating, setIsUpdating] = useState(false);

  const [isNetOrServerError, setIsNetOrServerError] = useState(false);

  const updateInfo = async (name, infoToUpdate) => {
    try {
      setIsUpdating(true);

      // Send form data to server for processing
      const processFormData = await fetch(
        "https://p0xq2gpd-5174.uks1.devtunnels.ms/referrer/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(infoToUpdate),
        }
      );

      // If the form was processed successfully,
      if (processFormData.ok) {
        const response = await processFormData.json();
        console.log(response);

        setProfileInfo({
          ...profileInfo,
          [name]: {
            ...name,
            justUpdated: true,
          },
        });

        // Proceed with this block if there were some errors during form processing
      } else {
        setIsNetOrServerError(false);
        const response = await processFormData.json();

        console.log(response.messageType + ": " + response.error);
        setIsNetOrServerError(true);
        setIsUpdating(false);
      }
    } catch (error) {
      console.error(error);
      setIsNetOrServerError(true);
      setIsUpdating(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordVisibility = showPassword ? "text" : "password";

  return (
    <div className="get-started flex flex-col gap-4">
      {refAuthInputFields.map(
        (input, index) =>
          input.type !== "checkbox" &&
          input.name !== "confirmPassword" && (
            <div key={index} className="input-wrapper flex flex-col gap-1">
              <label className="px-4 text-benBlue-lightD">
                {input.placeholder}
              </label>
              <div className="input relative">
                <input
                  type={
                    input.name === "password" ? passwordVisibility : input.type
                  }
                  name={input.name}
                  value={profileData[input.name]}
                  onChange={handleChange}
                  placeholder={input.placeholder}
                  className={`focus:ring-2 ring-benBlue-lightD dark:ring-benBlue-200/40 bg-transparent drop-shadow-sm rounded-2xl px-4 py-3 w-full text-base mobile_lg:text-lg border ${
                    profileInfo[input.name].isError
                      ? "border-errorColor dark:border-errorColor"
                      : "border-navBarBorderLight dark:border-benBlue-lightC"
                  }`}
                />

                <div className="absolute right-0 top-[25%] bottom-[25%] flex gap-3 items-center mr-4">
                  <EditIcon className="h-auto w-[18px] fill-benBlue-lightD cursor-pointer active:scale-[0.95] select-none" />
                  {input.name === "password" && (
                    <div
                      onClick={toggleShowPassword}
                      className="eye-togg select-nonele"
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
                profileInfo[input.name].isError && (
                  <p className="message text-left px-4 text-sm mobile_lg:text-base text-errorColor">
                    {profileInfo[input.name].errMsg}
                  </p>
                )
              }
            </div>
          )
      )}
    </div>
  );
}
