import React from "react";
import logout from "../utilities/logout";
import { MetaData } from "../metadata";
import GetStartedSection from "./get-started";

export default function SignUpSection() {
  // If User visits the Sign Up page via the "/signup" url, log out the User
  logout("user", "/get-started");

  return (
    <>
      <MetaData
        title="Get Started"
        description="Sign up and start trading with AI."
      />
      <GetStartedSection />
    </>
  );
}
