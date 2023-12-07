export default function isLoggedIn() {
  return localStorage.getItem("isSignedIn")
    ? true
    : document.cookie.includes("isSignedIn")
    ? true
    : false;
}
