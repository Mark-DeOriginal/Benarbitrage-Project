export default function getCookie(value, fallbackValue) {
  return localStorage.getItem(value) // Check if the browser local storage contains the value
    ? localStorage.getItem(value) // If local storage contains it, return the value
    : document.cookie.includes(`${value}=`) // Else, check if the value exists in the browser cookie
    ? document.cookie // If the cookie exists,
        .split(`${value}=`) // Split the cookie strings between cookie name and an equal sign
        .pop() // Get the last part of the array which holds the value and possibly, a semicolon
        .split(";") // Split the string in-between the semi-colon
        .shift() // Get the first part, which is the actual value
    : fallbackValue; // If cookie doesn't exist, return this
}
