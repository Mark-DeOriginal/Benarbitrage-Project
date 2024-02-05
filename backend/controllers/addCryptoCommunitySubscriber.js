import initModels from "../models/init-models.js";
import confirmCryptoPmt from "../utilities/confirmCryptoPmt.js";

// Our Subscriber Model
const { cryptoCommunitySubscribers: subscriber } = initModels();

// Add new subscriber
export const addCryptoCommunitySubscriber = async (req, res) => {
  const { fullName, email, paymentAddr, paymentTxId } = req.body;

  const registration_date = new Date().toISOString().split("T")[0];

  const registration_time = new Date().toLocaleTimeString({
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const dateAdded = `${registration_date} ${registration_time}`;

  try {
    const subscriber = await subscriber.create(
      {
        fullName,
        email,
        paymentAddr,
        paymentTxId,
        dateAdded,
      },
      {
        fields: [
          "fullName",
          "email",
          "paymentAddr",
          "paymentTxId",
          "dateAdded",
        ],
      }
    );

    confirmCryptoPmt(paymentTxId, "TRON (TRC20)", paymentAddr)
      .then((transactionDetails) => {
        subscriber
          .findOne({
            where: {
              email: email,
            },
          })
          .then((subscriber) => {
            if (subscriber) {
              subscriber
                .update({
                  paymentAmount: transactionDetails.contractData.amount || 0,
                  paymentCurrency: "USDT",
                })
                .then(() => {
                  console.log("Subscriber payment amount added successfully.");
                })
                .catch((error) => {
                  console.error(
                    "Couldn't update subscriber payment amount.",
                    error
                  );
                });
            } else {
              console.error("Subscriber not found.");
            }
          })
          .catch((error) => {
            console.error("Error finding subscriber.", error);
          });
      })
      .catch(() => {
        console.log("Could not get payment amount.");
      });

    // Return this response if the Subscriber was added successfully
    res.status(200).json({
      message: "Subscriber added successfully",
      messageType: "SERVER_SUCCESS",
    });
  } catch (error) {
    console.error(error);
  }
};
