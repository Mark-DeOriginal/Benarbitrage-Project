import getReferrerDetails from "./getReferrerDetails";
import setCookie from "./setCookie";

export default async function syncReferrerDetails() {
  const authInfo = {
    email: getReferrerDetails("email", "Not logged in"),
    password: getReferrerDetails("password", ""),
  };

  // To keep data in UI in sync with database, let's make a request to the referrer get-details endpoint
  return fetch(
    "https://benarbitrage-server.up.railway.app/referrer/get-details",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authInfo),
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      // Set these data in the Referrer's browser
      setCookie("referrerDetails", JSON.stringify(result.referrerDetails));
    })
    .catch((error) => {
      throw error;
    });
}
