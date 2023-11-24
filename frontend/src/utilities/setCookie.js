export default function setCookie(cookieName, cookieValue) {
  let daysToExpire = 3;
  let currentDate = new Date();
  currentDate.setTime(
    currentDate.getTime() + daysToExpire * 24 * 60 * 60 * 1000
  );

  let expires = "expires=" + currentDate.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + "; path=/";
  document.cookie = expires + "; path=/";
}

export const setCookiesExpiration = (daysToExpire) => {
  let currentDate = new Date();

  daysToExpire = daysToExpire;

  currentDate.setTime(
    currentDate.getTime() + daysToExpire * 24 * 60 * 60 * 1000
  );

  let expires = "expires=" + currentDate.toUTCString();
  document.cookie = expires + "; path=/";
};
