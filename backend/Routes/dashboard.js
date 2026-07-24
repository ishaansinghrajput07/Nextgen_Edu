import express from "express";

import {
  getDashboardStats,
} from "../controller/dashboard_controller.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();


router.get(
  "/stats",
  protect,
  authorize("Admin"),
  getDashboardStats
);


export default router;