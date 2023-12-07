import deleteAllCookies from "./deleteCookies";

export default function logout() {
  deleteAllCookies();
  localStorage.clear();

  window.location.href = "/login";
}
