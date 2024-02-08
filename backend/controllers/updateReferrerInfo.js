import { Op } from "sequelize";
import initModels from "../models/init-models.js";
import getPendingPayouts from "../utilities/referrers/getPendingPayouts.js";
import getTotalPayouts from "../utilities/referrers/getTotalPayouts.js";

// Get this Model
const { referrers, payouts: referrerPayouts } = initModels();

export const updateReferrerInfo = async (req, res) => {
  const { fieldName, newValue, accountId } = req.body;

  const fieldToUpdate =
    fieldName == "usdtTronWallet" ? "usdt_tron_address" : fieldName;

  const updated_date = new Date().toISOString().split("T")[0];

  const updated_time = new Date().toLocaleTimeString({
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const dateUpdated = `${updated_date} ${updated_time}`;

  const referrer = await referrers
    .findOne({
      where: { account_id: accountId },
    })
    .catch(() => {
      return res.status(500).json({
        error: "Internal Server Error",
        messageType: "SERVER_ERROR",
      });
    });

  await referrer.update({
    [fieldToUpdate]: newValue,
    last_updated: dateUpdated,
  });

  const totalPayouts = await getTotalPayouts(referrer);
  const pendingPayouts = await getPendingPayouts(referrer);
  const payouts = await referrer.getPayouts();

  // This updates the payout_wallet_address field for all
  // the payout records of the referrer that does not have a payout status of paid
  if (fieldToUpdate === "usdt_tron_address") {
    // Update the usdt_tron_address field of the payouts record
    await referrerPayouts.update(
      { payout_wallet_address: newValue },
      { where: { payout_status: { [Op.ne]: "paid" } }, payee_id: accountId }
    );
  }

  if (fieldToUpdate === "name") {
    await referrerPayouts.update(
      { payee_name: newValue },
      { where: { payee_id: accountId } }
    );
  }

  const referrerDetails = {
    name: referrer.name,
    email: referrer.email,
    phone: referrer.phone,
    usdtTronAddress: referrer.usdt_tron_address,
    password: referrer.password,
    accountId: referrer.account_id,
    totalPayouts: totalPayouts,
    pendingPayouts: pendingPayouts,
    totalRefers: referrer.total_refers,
    successfulRefers: referrer.total_successful_refers,
    payouts: payouts,
    isAdmin: referrer.is_admin,
    isSignedInAsReferrer: true,
  };

  return res.status(200).json({
    message: "Info updated successfully",
    referrerDetails: referrerDetails,
    messageType: "SERVER_SUCCESS",
  });
};
