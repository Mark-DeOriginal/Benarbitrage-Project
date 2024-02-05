import deleteAllCookies from "./deleteCookies";

export default function logout(accountToLogout, redirectLocation) {
  accountToLogout === "referrer"
    ? (document.cookie = `referrerDetails=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`)
    : deleteAllCookies();

  return redirectLocation === ""
    ? ""
    : (window.location.href = redirectLocation);
}
