import React from "react";
import deleteAllCookies from "../utilities/deleteCookies";

export default function SignUpSection() {
  // If User visits the Sign Up page via the "/signup" url, log out the previous User if any
  deleteAllCookies();

  // Then redirect browser to the Get Started page
  window.location.replace("/get-started");

  return (
    <>
      <section className="signup-section"></section>
    </>
  );
}
