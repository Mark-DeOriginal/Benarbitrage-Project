export default function getCryptoMarketPrices() {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1`,
      {
        method: "GET",
        mode: "cors",
      }
    )
      .then((response) => {
        resolve(response.json());
      })
      .catch((error) => {
        reject(error);
        console.error("Error fetching cryptocurrency price:", error);
        throw error;
      });
  });
}
