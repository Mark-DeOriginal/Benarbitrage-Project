import React, { useState } from "react";
import { HidePasswordIcon, ShowPasswordIcon } from "../../icons";
import setCookie, { setCookiesExpiration } from "../../../utilities/setCookie";
import { refAuthInputFields } from "../constants/inputFields";

export default function ReferrerSignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    usdtTronWallet: "",
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
    phone: {
      isError: false,
      errMsg: "",
    },
    usdtTronWallet: {
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

  const [isNetOrServerError, setIsNetOrServerError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // Send form data to server for processing
      const processFormData = await fetch(
        "http://localhost:5174/referrer/add",
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

        // Set these data in the Referrer's browser
        setCookie("referrerDetails", JSON.stringify(response.referrerDetails));
        setCookiesExpiration(7);

        if (formData.staySignedInOnDevice) {
          localStorage.setItem(
            "referrerDetails",
            JSON.stringify(response.referrerDetails)
          );
        }

        window.location.href = "/affiliate/dashboard";

        // Proceed with this block if there were some errors during form processing
      } else {
        setIsNetOrServerError(false);
        const response = await processFormData.json();

        // Destructure the response and return these values
        const { inputs, messageType } = response;

        if (messageType === "INPUT_ERROR") {
          // Destructure the inputs too and extract these values
          const { name, email, phone, password, confirmPassword } = inputs;

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
            [phone.type]: {
              ...phone,
              isError: phone.isError,
              errMsg: phone.errMsg,
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
          setIsNetOrServerError(true);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
      setIsNetOrServerError(true);
      setIsLoading(false);
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
      {refAuthInputFields.map((input, index) =>
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
        )
      )}
      {isNetOrServerError && (
        <p className="message my-4 text-xs mobile_lg:text-sm text-errorColor">
          An error occurred during the sign up process. <br />
          This could be due to a network or server error. <br />
          Please try again.
        </p>
      )}

      <p className="agreement text-xs mt-4 text-benBlue-300">
        By signing up for an account, I agree to any terms <br />
        and conditions that applies to me as an affiliate.
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
