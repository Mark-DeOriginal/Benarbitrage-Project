import { authenticateReferrer } from "./authenticateReferrer.js";

export default async function getReferrerDetails(req, res) {
  return await authenticateReferrer(req, res);
}
