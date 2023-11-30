import db from "../config/database.js";
import initModels from "../models/init-models.js";

const sequelize = db;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to database was successful!");
  })
  .catch((error) => {
    console.error("Unable to connect to the database.", error);
  });

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

    const userAssets = await user.getAssets();

    const assetExists = userAssets.map((prevAssetTxID) => {
      if (transactionID === prevAssetTxID) {
        return true;
      } else {
        return false;
      }
    });

    if (!assetExists) {
      const asset = await assets.create({
        asset_name: assetName,
        asset_owner: user.name,
        asset_amount: assetAmount,
        purchase_date: purchaseDate,
        payment_wallet_address: paymentWalletAddress,
        crypto_name: cryptoName,
        transaction_id: transactionID,
      });

      await user.addAsset(asset);

      const newPortfolioBalance =
        user.portfolio_balance + parseFloat(assetAmount.split(",").join(""));

      user.update({
        onboarding_stage: "Completed",
        reg_completed: true,
        has_asset: true,
        portfolio_balance: newPortfolioBalance,
      });

      res.status(201).json({
        message: "Asset stored successfully",
        assetDetails: userAssets,
        message: "SERVER_SUCCESS",
      });
    } else {
      console.error("Asset already confirmed");
      res.status(409).json({
        message: "Already Confirmed",
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
