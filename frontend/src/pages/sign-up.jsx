import React from "react";
import deleteAllCookies from "../utilities/deleteCookies";

export default function SignUpSection() {
  // If User visits the Sign Up page via the "/sign-up" url, log out the previous User if any
  deleteAllCookies();
  localStorage.clear();

  // Then redirect browser to the Get Started page
  window.location.replace("/get-started");

  return (
    <>
      <section className="sign-up-section"></section>
    </>
  );
}
