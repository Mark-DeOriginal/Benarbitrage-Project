export default function getAccountBalance(userID) {
  const accountID = { accountID: userID };
  return new Promise((resolve, reject) => {
    // Make a POST request with the purchaseDetails to our /store-asset api endpoint
    fetch(
      "https://benarbitrage-server.up.railway.app/user/get-account-balance",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accountID),
      }
    )
      .then((response) => {
        resolve(response.json());
      })
      .catch((error) => {
        reject();
        console.log("Couldn't retrieve balance.");
        console.log(error);
      });
  });
}
