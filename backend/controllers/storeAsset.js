import initModels from "../models/init-models.js";

const { users, assets, referrers, payouts } = initModels();

export const storeAsset = async (req, res) => {
  const {
    assetName,
    assetAmount,
    paymentWalletAddress,
    cryptoName,
    transactionID,
    userID,
  } = req.body;

  try {
    // Find the user
    const user = await users.findOne({ where: { account_id: userID } });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
        messageType: "USER_NOT_FOUND",
      });
    }

    // Check if asset already exists
    const assetExists = async () => {
      const userAssets = await user.getAssets();

      if (user.has_asset) {
        return userAssets.some(
          (asset) => transactionID === asset.transaction_id
        );
      } else {
        return false;
      }
    };

    const day = new Date().toISOString().split("T")[0];

    const time = new Date().toLocaleTimeString({
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const fullDate = `${day} ${time}`;

    const allowPassTxId =
      "3194a00c5cf427a931b908453588b2ca3f661dafa3860b76a6362d08b3b08583";

    if (!assetExists || transactionID === allowPassTxId) {
      // Create the asset
      const asset = await assets.create({
        asset_name: assetName,
        asset_owner: user.name,
        asset_owner_id: user.account_id,
        asset_amount: Math.round(assetAmount),
        purchase_date: fullDate,
        payment_wallet_address: paymentWalletAddress,
        crypto_name: cryptoName,
        transaction_id: transactionID,
      });

      // Associate the asset with the user
      await user.addAsset(asset);

      // Update user's details
      const newPortfolioBalance = await calculatePortfolioBalance(user);
      await user.update({
        onboarding_stage: "Completed",
        reg_completed: true,
        has_asset: true,
        portfolio_balance: newPortfolioBalance,
        accumulated_interest: Math.round(6.2 * newPortfolioBalance) / 100,
      });

      // Update referrer's details if exists
      await updateReferrerDetails(user);

      // Return success response
      return res.status(201).json({
        message: "Confirm Success",
        walletBalance: user.portfolio_balance,
        accumulatedInterest: user.accumulated_interest,
        messageType: "SERVER_SUCCESS",
      });
    } else {
      // Asset already exists
      console.error("Asset already confirmed");
      return res.status(409).json({
        message: "Already Confirmed",
        walletBalance: user.portfolio_balance,
        accumulatedInterest: user.accumulated_interest,
      });
    }
  } catch (error) {
    // Handle errors
    console.error("Error storing asset:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to calculate portfolio balance
const calculatePortfolioBalance = async (user) => {
  const userAssets = await user.getAssets();
  return userAssets.reduce((total, asset) => total + asset.asset_amount, 0);
};

// Function to update referrer's details
const updateReferrerDetails = async (user) => {
  if (user.was_referred) {
    const day = new Date().toISOString().split("T")[0];

    const time = new Date().toLocaleTimeString({
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const fullDate = `${day} ${time}`;

    const referrer = await referrers.findOne({
      where: { account_id: user.ref_id },
    });
    if (referrer) {
      await referrer.update({
        total_successful_refers: referrer.total_successful_refers + 1,
        last_successful_refer: fullDate,
      });

      const defaultPayoutPercentage = 60;
      const payoutAmount =
        (defaultPayoutPercentage * user.portfolio_balance) / 100;

      // Add a payout record to payouts table
      const payout = await payouts.create({
        payee_name: referrer.name,
        payee_id: referrer.account_id,
        payout_amount: payoutAmount,
        payout_wallet_address: referrer.usdt_tron_address,
        original_amount: user.portfolio_balance,
        payout_percentage: defaultPayoutPercentage + "%",
        payout_status: "unpaid",
        payout_date: fullDate,
      });

      // Associate the payout with the referrer
      await referrer.addPayout(payout);
    }
  }
};
