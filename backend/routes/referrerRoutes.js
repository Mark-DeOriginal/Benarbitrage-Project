import express from "express";
import { addReferrer } from "../controllers/addReferrer.js";
import { authenticateReferrer } from "../controllers/authenticateReferrer.js";

const router = express.Router();

router.post("/add", addReferrer);
router.post("/login", authenticateReferrer);

export default router;
