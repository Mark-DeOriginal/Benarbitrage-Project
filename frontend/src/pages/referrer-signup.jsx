import React from "react";
import SimpleLayout from "../components/SimpleLayout";
import ReferrerSignUpForm from "../components/auth/referrer/ReferrerSignUpForm";

export default function ReferrerSignUpPage() {
  return (
    <SimpleLayout>
      <div className="signup text-center pt-[100px]">
        <div className="header font-medium">
          <h2 className="text-2xl mb-2 font-bold text-benBlue-400 dark:text-benOrange-400">
            Become an Affiliate
          </h2>
          <p>
            Already have an account?{" "}
            <a
              href="/affiliate/login"
              className="border-b border-dotted border-benBlue-200"
            >
              Login
            </a>
          </p>
        </div>
        <div className="body mt-8">
          <div className="form-wrapper max-w-[400px] mx-auto">
            <ReferrerSignUpForm />
          </div>
        </div>
      </div>
    </SimpleLayout>
  );
}
