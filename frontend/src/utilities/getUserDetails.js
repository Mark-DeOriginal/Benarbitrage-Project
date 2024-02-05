import getJsonCookie from "./getJsonCookie";

export default function getUserDetails(key, fallbackValue) {
  return getJsonCookie("userDetails", key, fallbackValue);
}
