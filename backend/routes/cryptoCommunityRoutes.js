import express from "express";
import { addCryptoCommunitySubscriber } from "../controllers/addCryptoCommunitySubscriber.js";

const router = express.Router();

router.post("/add-subscriber", addCryptoCommunitySubscriber);

export default router;
