export default function setCookie(cookieName, cookieValue) {
  document.cookie = cookieName + "=" + cookieValue + "; path=/";
}
