import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import referrerRoutes from "./routes/referrerRoutes.js";
import cryptoCommunityRoutes from "./routes/cryptoCommunityRoutes.js";
import db from "./config/database.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to handle requests to the /user route
app.use("/user", userRoutes);

// Middleware to handle requests to the /referrer route
app.use("/referrer", referrerRoutes);

// Middleware to handle requests to the /crypto-community route
app.use("/crypto-community", cryptoCommunityRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Benarbitrage!" });
});

const PORT = process.env.PORT || 5174;

const sequelize = db;

// Authenticate the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to database was successful!");
    // Sync models with the database
    return sequelize.sync();
  })
  .then(() => {
    console.log("Database synchronization complete!");
    // Start the Express server
    app.listen(PORT, () => {
      console.log(`The Server is running at ${process.env.HOST}:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database.", error);
  });
