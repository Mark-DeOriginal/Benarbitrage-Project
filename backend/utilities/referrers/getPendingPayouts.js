export default async function getPendingPayouts(referrer) {
  try {
    const payouts = await referrer.getPayouts();

    let pendingPayouts = 0;

    payouts.map((payout) => {
      pendingPayouts +=
        payout.payout_status !== "paid" ? payout.payout_amount : 0;
    });

    return pendingPayouts;
  } catch (error) {
    console.error("Error fetching pending payouts:", error);
    return null;
  }
}
