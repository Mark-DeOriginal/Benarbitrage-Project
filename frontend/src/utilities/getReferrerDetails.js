import getJsonCookie from "./getJsonCookie";

export default function getReferrerDetails(key, fallbackValue) {
  return getJsonCookie("referrerDetails", key, fallbackValue);
}
