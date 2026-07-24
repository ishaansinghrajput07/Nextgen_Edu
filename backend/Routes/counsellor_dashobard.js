import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getCounsellorDashboard } from "../controller/counsellorDashboard_controller.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getCounsellorDashboard
);

export default router;