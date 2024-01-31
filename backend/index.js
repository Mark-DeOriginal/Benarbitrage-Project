import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import cryptoCommunityRoutes from "./routes/cryptoCommunityRoutes.js";

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
app.use("/referrer", userRoutes);

// Middleware to handle requests to the /crypto-community route
app.use("/crypto-community", cryptoCommunityRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Benarbitrage!" });
});

const PORT = process.env.PORT || 5174;

app.listen(PORT, () => {
  console.log(`The Server is running at ${process.env.HOST}:${PORT}`);
});
