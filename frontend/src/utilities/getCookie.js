export default function getCookie(value, fallbackValue) {
  // Check if the browser cookie contains the cookie
  return document.cookie.includes(`${value}=`)
    ? document.cookie // If the cookie exists,
        .split(`${value}=`) // Split the cookie strings between cookie name and an equal sign
        .pop() // Get the last part of the array which holds the value and possibly, a semicolon
        .split(";") // Split the string in-between the semi-colon
        .shift() // Get the first part, which is the actual value
    : fallbackValue; // If cookie doesn't exist, return this
}
