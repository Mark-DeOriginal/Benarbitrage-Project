import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

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

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Benarbitrage!" });
});

const PORT = process.env.PORT || 5174;

app.listen(PORT, () => {
  console.log(`The Server is running at ${process.env.HOST}:${PORT}`);
});
