import React from "react";
import LoginForm from "../../auth/LoginForm";

export default function Login() {
  return (
    <div className="login text-center pt-[72px]">
      <div className="header font-medium">
        <h2 className="text-2xl mb-2 font-bold text-benBlue-400 dark:text-benOrange-400">
          Login
        </h2>
        <p>
          Don't have an account?{" "}
          <a
            href="/sign-up"
            className="border-b border-dotted border-benBlue-200"
          >
            Sign up
          </a>
        </p>
      </div>
      <div className="body mt-8">
        <div className="form-wrapper max-w-[400px] mx-auto">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
