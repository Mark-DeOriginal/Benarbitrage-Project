export default async function getTotalPayouts(referrer) {
  try {
    const payouts = await referrer.getPayouts();

    const totalPayouts = payouts.reduce(
      (total, payout) =>
        total + (payout.payout_status === "paid" ? payout.payout_amount : 0),
      0
    );

    return totalPayouts;
  } catch (error) {
    console.error("Error fetching total payouts:", error);
    return null;
  }
}
