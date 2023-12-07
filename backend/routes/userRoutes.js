import express from "express";
import {
  authenticateUser,
  createUser,
  setUserAccType,
} from "../controllers/actions.js";
import { storeAsset } from "../controllers/storeAsset.js";
import { getAccountBalance } from "../controllers/getAccountBalance.js";

const router = express.Router();

router.post("/create-user", createUser);
router.post("/set_account_type", setUserAccType);
router.post("/authenticate", authenticateUser);
router.post("/store-asset", storeAsset);
router.post("/get-account-balance", getAccountBalance);

export default router;
