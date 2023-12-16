import deleteAllCookies from "./deleteCookies";

export default function logout() {
  deleteAllCookies();

  window.location.href = "/login";
}
