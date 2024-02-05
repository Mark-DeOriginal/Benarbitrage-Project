import express from "express";
import { addReferrer } from "../controllers/addReferrer.js";
import { authenticateReferrer } from "../controllers/authenticateReferrer.js";
import getReferrerDetails from "../controllers/getReferrerDetails.js";

const router = express.Router();

router.post("/add", addReferrer);
router.post("/login", authenticateReferrer);
router.post("/get-details", getReferrerDetails);

export default router;
