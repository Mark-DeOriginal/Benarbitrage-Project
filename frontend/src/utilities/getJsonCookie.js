// This utility function checks the Cookie or localStorage for the
// requested JSON string, parses it, and returns the key value
export default function getJsonCookie(jsonStringName, key, fallbackValue) {
  const result = localStorage.getItem(jsonStringName)
    ? localStorage.getItem(jsonStringName)
    : document.cookie.includes(`${jsonStringName}=`)
    ? document.cookie.split(`${jsonStringName}=`).pop().split(";").shift()
    : null;

  // If no such value exists in the parsed JSON string,
  // return the fallback value, otherwise, return the result.
  return result == null || result == "undefined"
    ? fallbackValue
    : JSON.parse(result)[key];
}
