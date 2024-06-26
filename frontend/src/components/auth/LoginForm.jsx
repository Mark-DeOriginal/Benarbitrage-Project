import React, { useState } from "react";
import { HidePasswordIcon, ShowPasswordIcon } from "../icons";
import { inputFields } from "./constants/inputFields";
import setCookie, { setCookiesExpiration } from "../../utilities/setCookie";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    staySignedInOnDevice: false,
  });

  const [inputFieldsInfo, setInputFieldsInfo] = useState({
    email: {
      isError: false,
      errMsg: "",
    },
    password: {
      isError: false,
      errMsg: "",
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });

    setInputFieldsInfo({
      ...inputFieldsInfo,
      [name]: {
        ...name,
        isError: false,
      },
    });
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    return (window.location.href = "/checkpoint");

    try {
      setIsLoading(true);

      // Send form data to server for processing
      const processFormData = await fetch(
        "https://benarbitrage-server.up.railway.app/user/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // If the form was processed successfully,
      if (processFormData.ok) {
        const response = await processFormData.json();
        const { name, email, accountId, accountType, onboardingStage } =
          response.userDetails;

        if (onboardingStage === "Completed") {
          // Set these cookies in the User's browser
          setCookie("userName", name.trim());
          setCookie("userEmail", email.trim());
          setCookie("accountId", accountId);
          setCookie("accountType", accountType);
          setCookie("onboardingStage", "COMPLETED");
          setCookie("isSignedIn", "true");
          setCookiesExpiration(7);

          if (formData.staySignedInOnDevice) {
            localStorage.setItem("userName", name.trim());
            localStorage.setItem("userEmail", email.trim());
            localStorage.setItem("accountId", accountId);
            localStorage.setItem("accountType", accountType);
            localStorage.setItem("onboardingStage", "COMPLETED");
            localStorage.setItem("isSignedIn", true);
          }

          // Redirect to dashboard
          window.location.href = "/dashboard";
        } else {
          const interpretedOnboardingStage =
            onboardingStage === "2" ? "VALIDATION" : "ASSET_PURCHASE";
          // Set these cookies in the User's browser
          setCookie("userName", name.trim());
          setCookie("userEmail", email.trim());
          setCookie("accountId", accountId);
          setCookie("accountType", accountType);
          setCookie("onboardingStage", interpretedOnboardingStage);
          setCookie("isSignedIn", "true");
          setCookiesExpiration(7);

          if (formData.staySignedInOnDevice) {
            localStorage.setItem("userName", name.trim());
            localStorage.setItem("userEmail", email.trim());
            localStorage.setItem("accountId", accountId);
            localStorage.setItem("accountType", accountType);
            localStorage.setItem("onboardingStage", interpretedOnboardingStage);
            localStorage.setItem("isSignedIn", true);
          }

          // Redirect to dashboard
          window.location.href = "/get-started";
        }

        // Proceed with this block if there were some errors during form processing
      } else {
        const response = await processFormData.json();

        // Destructure the response and return these values
        const { inputs, messageType } = response;

        if (messageType === "INPUT_ERROR") {
          // Destructure the inputs too and extract these values
          const { email, password } = inputs;

          // Set the inputFieldsInfo by appending the values returned from the inputs "destructuring"
          setInputFieldsInfo({
            ...inputFieldsInfo,
            [email.type]: {
              ...email,
              isError: email.isError,
              errMsg: email.errMsg,
            },
            [password.type]: {
              ...password,
              isError: password.isError,
              errMsg: password.errMsg,
            },
          });

          setIsLoading(false);
        } else if (messageType === "SERVER_ERROR") {
          console.log(response.messageType + ": " + response.error);

          setCookie("onboardingStage", "LOGIN_FAILED");
          localStorage.setItem("onboardingStage", "LOGIN_FAILED");

          location.reload();
        }
      }
    } catch (error) {
      console.error(error);

      setCookie("onboardingStage", "LOGIN_FAILED");
      localStorage.setItem("onboardingStage", "LOGIN_FAILED");

      location.reload();
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordVisibility = showPassword ? "text" : "password";

  return (
    <form onSubmit={handleSubmit} className="log-in flex flex-col gap-2">
      {inputFields.map((input, index) =>
        input.type === "checkbox" ? (
          <label
            key={index}
            className="text-left flex gap-2 text-sm mobile_lg:text-base mt-2 w-fit mx-auto"
          >
            <input
              type="checkbox"
              name={input.name}
              checked={formData.staySignedInOnDevice}
              onChange={handleChange}
            />
            Keep me signed-in on this device
          </label>
        ) : ["email", "password"].includes(input.name) ? (
          <div key={index} className="input-wrapper flex flex-col gap-1">
            <div className="input relative">
              <input
                type={
                  input.name === "password" ? passwordVisibility : input.type
                }
                name={input.name}
                value={formData[input.name]}
                onChange={handleChange}
                placeholder={input.placeholder}
                className={`focus:ring-2 ring-benBlue-lightD dark:ring-benBlue-200/40 bg-white dark:bg-transparent drop-shadow-sm rounded-2xl px-4 py-3 w-full border ${
                  inputFieldsInfo[input.name].isError
                    ? "border-errorColor dark:border-errorColor"
                    : "border-navBarBorderLight dark:border-benBlue-lightC2"
                }`}
              />
              {input.name === "password" && (
                <div
                  onClick={toggleShowPassword}
                  className="eye-toggle absolute right-0 top-[25%] bottom-[25%] flex items-center mr-4 cursor-pointer"
                >
                  {showPassword ? (
                    <HidePasswordIcon className="h-auto w-[22px] fill-benBlue-lightD active:scale-[0.95] select-none" />
                  ) : (
                    <ShowPasswordIcon className="h-auto w-[22px] fill-benBlue-lightD active:scale-[0.95] select-none" />
                  )}
                </div>
              )}
            </div>
            {
              // If there's an error, render the <p> element with the error message
              inputFieldsInfo[input.name].isError && (
                <p className="message text-left px-4 text-sm mobile_lg:text-base text-errorColor">
                  {inputFieldsInfo[input.name].errMsg}
                </p>
              )
            }
          </div>
        ) : (
          ""
        )
      )}
      <button
        type="submit"
        disabled={isLoading ? true : ""}
        className="bg-benBlue-lightE text-benBlue-100 ring-offset-2 focus:ring-2 active:scale-[0.9] ring-benBlue-lightD drop-shadow-sm rounded-2xl w-full py-3 mx-auto text-center mt-2 font-medium disabled:cursor-not-allowed"
      >
        {isLoading ? "Signing In" : "Sign In"}
      </button>
    </form>
  );
}
