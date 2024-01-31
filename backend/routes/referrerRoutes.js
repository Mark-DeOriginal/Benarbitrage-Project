import express from "express";
import { addReferrer } from "../controllers/addReferrer";
import { authenticateReferrer } from "../controllers/authenticateReferrer";

const router = express.Router();

router.post("/add", addReferrer);
router.post("/login", authenticateReferrer);

export default router;
