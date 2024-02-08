import getReferrerDetails from "./getReferrerDetails";
import setCookie from "./setCookie";

export default async function updateReferrerInfo(name, value) {
  const info = {
    fieldName: name,
    newValue: value,
    accountId: getReferrerDetails("accountId", ""),
  };

  // To keep data in UI in sync with database, let's make a request to the referrer get-details endpoint
  return fetch(
    "https://benarbitrage-server.up.railway.app/referrer/update-info",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      // Set these data in the Referrer's browser
      setCookie("referrerDetails", JSON.stringify(result.referrerDetails));
      console.log(result);
    })
    .catch((error) => {
      throw error;
    });
}
