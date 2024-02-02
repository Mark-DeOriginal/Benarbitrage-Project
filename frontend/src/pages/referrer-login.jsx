import React from "react";
import SimpleLayout from "../components/SimpleLayout";
import ReferrerLoginForm from "../components/auth/referrer/ReferrerLoginForm";

export default function ReferrerLoginPage() {
  return (
    <SimpleLayout>
      <div className="login text-center pt-[100px]">
        <div className="header font-medium">
          <h2 className="text-2xl mb-2 font-bold text-benBlue-400 dark:text-benOrange-400">
            Affiliate Login
          </h2>
          <p>
            Don't have an account?{" "}
            <a
              href="/affiliate/signup"
              className="border-b border-dotted border-benBlue-200"
            >
              Sign up
            </a>
          </p>
        </div>
        <div className="body mt-8">
          <div className="form-wrapper max-w-[400px] mx-auto">
            <ReferrerLoginForm />
          </div>
        </div>
      </div>
    </SimpleLayout>
  );
}
