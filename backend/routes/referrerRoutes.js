import express from "express";
import { addReferrer } from "../controllers/addReferrer.js";
import { authenticateReferrer } from "../controllers/authenticateReferrer.js";
import getReferrerDetails from "../controllers/getReferrerDetails.js";
import { updateReferrerInfo } from "../controllers/updateReferrerInfo.js";
import { confirmPayout } from "../controllers/confirmPayout.js";

const router = express.Router();

router.post("/add", addReferrer);
router.post("/login", authenticateReferrer);
router.post("/get-details", getReferrerDetails);
router.post("/update-info", updateReferrerInfo);
router.post("/confirm-payout", confirmPayout);

export default router;
