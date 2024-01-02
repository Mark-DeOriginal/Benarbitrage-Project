import db from "../config/database.js";
import initModels from "../models/init-models.js";
import confirmCryptoPmt from "../utilities/confirmCryptoPmt.js";

const sequelize = db;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to database was successful!");
  })
  .catch((error) => {
    console.error("Unable to connect to the database.", error);
  });

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
    await subscriber.create(
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
                  paymentAmount: transactionDetails.contractData.amount,
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
  } catch (error) {
    console.error(error);
  }
};

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully!");
  })
  .catch((error) => {
    console.error("An error occurred during synchronization.", error);
  });
