export default async function getCryptoMarketPrices() {
  try {
    const getCryptoPrices = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1`,
      {
        method: "GET",
        mode: "cors",
      }
    );

    if (getCryptoPrices.ok) {
      return getCryptoPrices.json();
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching cryptocurrency price:", error);
    return false;
  }
}
