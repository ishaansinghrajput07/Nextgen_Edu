import express from "express";
import { getWebsiteStats } from "../controller/website_controller.js";

const router = express.Router();

// ===============================
// Website Statistics
// GET /api/v1/website/stats
// ===============================
router.get("/stats", getWebsiteStats);

export default router;