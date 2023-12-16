import initModels from "../models/init-models.js";

// Our User and Asset Models
const { users, assets } = initModels();

export const storeAsset = async (req, res) => {
  const {
    assetName,
    assetAmount,
    purchaseDate,
    paymentWalletAddress,
    cryptoName,
    transactionID,
    userID,
  } = req.body;

  try {
    const user = await users.findOne({ where: { account_id: userID } });

    if (!user) {
      res.status(404).json({
        error: "User not found",
        messageType: "USER_NOT_FOUND",
      });

      return;
    }

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

    if ((await assetExists()) == false) {
      const asset = await assets.create({
        asset_name: assetName,
        asset_owner: user.name,
        asset_amount: Math.round(assetAmount),
        purchase_date: purchaseDate,
        payment_wallet_address: paymentWalletAddress,
        crypto_name: cryptoName,
        transaction_id: transactionID,
      });

      await user.addAsset(asset);

      const newPortfolioBalance = async () => {
        const userAssets = await user.getAssets();
        let balance = 0;
        userAssets.map((asset) => {
          balance += asset.asset_amount;
        });

        return balance;
      };

      user.update({
        onboarding_stage: "Completed",
        reg_completed: true,
        has_asset: true,
        portfolio_balance: await newPortfolioBalance(),
        accumulated_interest: Math.round(
          (6.2 * (await newPortfolioBalance())) / 100
        ),
      });

      res.status(201).json({
        message: "Asset stored successfully",
        walletBalance: user.portfolio_balance,
        accumulatedInterest: user.accumulated_interest,
        message: "SERVER_SUCCESS",
      });
    } else {
      console.error("Asset already confirmed");
      res.status(409).json({
        message: "Already Confirmed",
        walletBalance: user.portfolio_balance,
        accumulatedInterest: user.accumulated_interest,
      });
    }
  } catch (error) {
    console.error(
      "Something went wrong while storing the asset:",
      error.message
    );
    res.status(500).json({
      error: "Internal Server Error",
      errorMsg: "Something went wrong while storing the asset",
      messageType: "SERVER_ERROR",
    });
  }
};
