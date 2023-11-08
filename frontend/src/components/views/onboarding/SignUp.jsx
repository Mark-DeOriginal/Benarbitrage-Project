import React from "react";
import SignUpForm from "../../auth/SignUpForm";

export default function SignUp() {
  return (
    <div className="sign-up text-center">
      <div className="header font-medium">
        <h2 className="text-2xl mb-2 font-bold text-benBlue-400 dark:text-benOrange-400">
          Sign Up
        </h2>
        <p>
          Already have an account?{" "}
          <a
            href="/login"
            className="border-b border-dotted border-benBlue-200"
          >
            Login
          </a>
        </p>
      </div>
      <div className="body mt-8">
        <div className="form-wrapper max-w-[400px] mx-auto">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
