import initModels from "../models/init-models.js";

const { users } = initModels();

export const getAccountBalance = async (req, res) => {
  const { accountID } = req.body;

  try {
    const user = await users.findOne({ where: { account_id: accountID } });

    if (!user) {
      res.status(404).json({
        error: "User not found",
        messageType: "USER_NOT_FOUND",
      });

      return;
    }

    const portfolioBalance = async () => {
      const userAssets = await user.getAssets();
      if (userAssets) {
        let balance = 0;
        userAssets.map((asset) => {
          balance += asset.asset_amount;
        });

        return balance;
      } else {
        return user.portfolio_balance;
      }
    };

    res.status(201).json({
      message: "Balance retrieved successfully",
      walletBalance: await portfolioBalance(),
      accumulatedInterest: Math.round((6.2 * (await portfolioBalance())) / 100),
    });
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
