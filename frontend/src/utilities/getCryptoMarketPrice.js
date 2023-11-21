export default async function getCryptoMarketPrice(crypto) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${crypto.toLowerCase()}&vs_currencies=usd`,
      {
        method: "GET",
        mode: "cors",
      }
    );

    const result = await response.json();

    // Assuming the response structure is { crypto: { usd: price } }
    const marketPrice = result[crypto].usd;

    console.log(
      `Current ${crypto.toUpperCase()} Price in USD: $${marketPrice}`
    );

    return parseFloat(marketPrice);
  } catch (error) {
    console.error("Error fetching cryptocurrency price:", error);
    throw error; // Re-throw the error for the calling code to handle
  }
}
