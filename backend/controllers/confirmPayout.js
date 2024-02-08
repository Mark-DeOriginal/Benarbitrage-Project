import initModels from "../models/init-models.js";

// Get this Model
const { payouts } = initModels();

export const confirmPayout = async (req, res) => {
  const { payoutAmount, payoutMethod, payoutPercentage, payoutId, txId } =
    req.body;

  const payout_date = new Date().toISOString().split("T")[0];

  const payout_time = new Date().toLocaleTimeString({
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const dateOfPayment = `${payout_date} ${payout_time}`;

  const payout = await payouts
    .findOne({
      where: { id: payoutId },
    })
    .catch(() => {
      return res.status(500).json({
        error: "Internal Server Error",
        messageType: "SERVER_ERROR",
      });
    });

  await payout.update({
    payout_amount: payoutAmount,
    payout_method: payoutMethod,
    payout_status: "paid",
    payout_percentage: payoutPercentage + "%",
    tx_id: txId,
    payout_date: dateOfPayment,
  });

  return res.status(200).json({
    message: "Payout confirmed successfully",
    messageType: "SERVER_SUCCESS",
  });
};
