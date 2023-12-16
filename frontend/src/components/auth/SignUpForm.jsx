import React, { useState } from "react";
import { HidePasswordIcon, ShowPasswordIcon } from "../icons";
import { inputFields } from "./constants/inputFields";
import setCookie, { setCookiesExpiration } from "../../utilities/setCookie";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    staySignedInOnDevice: false,
  });

  const [inputFieldsInfo, setInputFieldsInfo] = useState({
    name: {
      isError: false,
      errMsg: "",
    },
    email: {
      isError: false,
      errMsg: "",
    },
    password: {
      isError: false,
      errMsg: "",
    },
    confirmPassword: {
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

    try {
      setIsLoading(true);

      // Send form data to server for processing
      const processFormData = await fetch(
        "https://p0xq2gpd-5174.uks1.devtunnels.ms/user/create-user",
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
        console.log(response);

        // Set these cookies in the User's browser
        setCookie("userName", formData.name.trim());
        setCookie("userEmail", formData.email.trim());
        setCookie("accountId", response.accountId);
        setCookie("isSignedIn", "true");
        setCookie("onboardingStage", "SIGN_UP_SUCCESS");
        setCookiesExpiration(7);

        if (formData.staySignedInOnDevice) {
          localStorage.setItem("userName", formData.name.trim());
          localStorage.setItem("userEmail", formData.email.trim());
          localStorage.setItem("accountId", response.accountId);
          localStorage.setItem("isSignedIn", true);
          localStorage.setItem("onboardingStage", "SIGN_UP_SUCCESS");
        }

        // Then reload the page
        location.reload();

        // Proceed with this block if there were some errors during form processing
      } else {
        const response = await processFormData.json();

        // Destructure the response and return these values
        const { inputs, messageType } = response;

        if (messageType === "INPUT_ERROR") {
          // Destructure the inputs too and extract these values
          const { name, email, password, confirmPassword } = inputs;

          // Set the inputFieldsInfo by appending the values returned from the inputs "destructuring"
          setInputFieldsInfo({
            ...inputFieldsInfo,
            [name.type]: {
              ...name,
              isError: name.isError,
              errMsg: name.errMsg,
            },
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
            [confirmPassword.type]: {
              ...confirmPassword,
              isError: confirmPassword.isError,
              errMsg: confirmPassword.errMsg,
            },
          });

          setIsLoading(false);
        } else if (messageType === "SERVER_ERROR") {
          console.log(response.messageType + ": " + response.error);

          setCookie("onboardingStage", "SIGN_UP_FAILED");
          localStorage.setItem("onboardingStage", "SIGN_UP_FAILED");

          location.reload();
        }
      }
    } catch (error) {
      console.error(error);

      setCookie("onboardingStage", "SIGN_UP_FAILED");
      localStorage.setItem("onboardingStage", "SIGN_UP_FAILED");

      location.reload();
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const passwordVisibility = showPassword ? "text" : "password";
  const confirmPasswordVisibility = showConfirmPassword ? "text" : "password";

  return (
    <form onSubmit={handleSubmit} className="get-started flex flex-col gap-2">
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
        ) : (
          <div key={index} className="input-wrapper flex flex-col gap-1">
            <div className="input relative">
              <input
                type={
                  input.name === "password"
                    ? passwordVisibility
                    : input.name === "confirmPassword"
                    ? confirmPasswordVisibility
                    : input.type
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
                    <HidePasswordIcon className="h-auto w-[22px] fill-benBlue-lightD" />
                  ) : (
                    <ShowPasswordIcon className="h-auto w-[22px] fill-benBlue-lightD" />
                  )}
                </div>
              )}

              {input.name === "confirmPassword" && (
                <div
                  onClick={toggleShowConfirmPassword}
                  className="eye-toggle absolute right-0 top-[25%] bottom-[25%] flex items-center mr-4 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <HidePasswordIcon className="h-auto w-[22px] fill-benBlue-lightD" />
                  ) : (
                    <ShowPasswordIcon className="h-auto w-[22px] fill-benBlue-lightD" />
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
        )
      )}
      <p className="agreement text-xs mt-4 text-benBlue-300">
        By signing up for an account, I agree to the <br />
        <a href="/terms-of-use" className="font-medium">
          Terms of Use
        </a>
        ,{" "}
        <a href="/terms-of-use" className="font-medium">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="/terms-of-use" className="font-medium">
          Refund Policy
        </a>
        .
      </p>
      <button
        type="submit"
        disabled={isLoading ? true : ""}
        className="bg-benBlue-lightE text-benBlue-100 ring-offset-2 focus:ring-2 active:scale-[0.9] ring-benBlue-lightD drop-shadow-sm rounded-2xl w-full py-3 mx-auto text-center mt-2 font-medium disabled:cursor-not-allowed"
      >
        {isLoading ? "Signing Up" : "Sign Up"}
      </button>
    </form>
  );
}
